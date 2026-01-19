import Builder from "~/http/builder"
import ErrorMap from "~/http/errorMap"
import InvalidInputError from "~/errors/invalidInputError"
import GenericError from "~/errors/genericError"
import ExternalApiError from "~/errors/externalApiError"
import CustomError from "~/errors/customError"
import BadRequestError from "~/errors/badRequestError"
import {vi} from "vitest"

test.each([
  {endpoint: "https://mock-server/expect/status/200", type: "get" as const, expected: 200, cacheable: true},
  {endpoint: "https://mock-server/expect/status/200", type: "post", expected: 200, cacheable: false},
  {endpoint: "https://mock-server/expect/status/200", type: "delete", expected: 200, cacheable: false},
  {endpoint: "https://mock-server/expect/status/203", type: "get", expected: 203, cacheable: true},
  {endpoint: "https://mock-server/expect/status/203", type: "post", expected: 203, cacheable: false},
])
('FUNC build WITH cache enabled and successful response from $endpoint $type EXPECT $expected and cached-$retryable', async ({endpoint, type, expected, cacheable}) => {
  const instance = new Builder().withCache(10).build()

  let response = await (instance as any)[type](endpoint)
  expect(response.status).toBe(expected)
  expect(response.cached).toBe(false)
  expect(response.data.count).toBe(1)

  response = await instance.get(endpoint)
  expect(response.status).toBe(expected)
  expect(response.cached).toBe(cacheable)

  if (cacheable) {
    // If it was cached, we don't expect the counter to increase.
    expect(response.data.count).toBe(1)
  } else {
    // If it was not cached, the call was made, and counter increased.
    expect(response.data.count).toBe(2)
  }
})

test("FUNC build WITH default config EXPECT no caching", async () => {
  const instance = new Builder().build()

  const response1 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.status).toBe(200)
  expect(response1.cached).toBe(false)
  expect(response1.data.count).toBe(1)

  const response2 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.status).toBe(200)
  expect(response2.cached).toBe(false)
  expect(response2.data.count).toBe(2)
})

test.each([
  {endpoint: "https://mock-server/expect/status/404", type: "get", expected: 404, retryable: false},
  {endpoint: "https://mock-server/expect/status/408", type: "get", expected: 408, retryable: true},
  {endpoint: "https://mock-server/expect/status/429", type: "get", expected: 429, retryable: true},
  {endpoint: "https://mock-server/expect/status/500", type: "get", expected: 500, retryable: true},
  {endpoint: "https://mock-server/expect/status/502", type: "get", expected: 502, retryable: true},
  {endpoint: "https://mock-server/expect/status/999", type: "get", expected: 999, retryable: false},
  {endpoint: "https://mock-server/expect/status/404", type: "post", expected: 404, retryable: false},
  {endpoint: "https://mock-server/expect/status/408", type: "post", expected: 408, retryable: true},
  {endpoint: "https://mock-server/expect/status/429", type: "post", expected: 429, retryable: true},
  {endpoint: "https://mock-server/expect/status/500", type: "post", expected: 500, retryable: true},
  {endpoint: "https://mock-server/expect/status/502", type: "post", expected: 502, retryable: true},
  {endpoint: "https://mock-server/expect/status/999", type: "post", expected: 999, retryable: false},
])
('FUNC build WITH unsuccessful response from $endpoint $type EXPECT $expected and retried-$retryable', async ({endpoint, type, expected, retryable}) => {
  const instance = new Builder().withRetry(3, 1).build()

  const error = await (instance as any)[type](endpoint).catch((e: any) => e)
  expect(error.response.status).toBe(expected)
  if (retryable) {
    expect(error.response.data.count).toBe(4)
  } else {
    expect(error.response.data.count).toBe(1)
  }

  const error2 = await (instance as any)[type](endpoint).catch((e: any) => e)
  expect(error2.response.status).toBe(expected)
  if (retryable) {
    expect(error2.response.data.count).toBe(8)
  } else {
    expect(error2.response.data.count).toBe(2)
  }
})
test("FUNC build WITH error mapping EXPECT error correctly mapped", async () => {
  const instance = new Builder()
    .withErrorMapping(
      new ErrorMap()
        .withError(InvalidInputError, [400])
        .withError(ExternalApiError, [500])
        .withError(GenericError, [429])
        .withCustomErrorPath("count")
    )
    .withRetry(3, 1)
    .build()

  const error = await instance.get("https://mock-server/expect/status/500").catch((e: any) => e)
  const customError = error as CustomError
  expect(customError).toBeInstanceOf(ExternalApiError)
  expect(customError.getHttpCode()).toBe(424)
  // Our mock server returns json {count: count} i.e. how many times this endpoint was called.
  // Since our error mapper has a custom path "count" it extracts the value from that path, which
  // in our case is the number of times the endpoint was called, which is 4, because of all
  // the retry logic.
  expect(customError.getMessage()).toBe("4")
})

test("FUNC put WITH valid data EXPECT successful request", async () => {
  const instance = new Builder().build()
  const response = await instance.put("https://mock-server/expect/status/200", {data: "test"})
  expect(response.status).toBe(200)
  expect(response.data.count).toBe(1)
})

test("FUNC patch WITH valid data EXPECT successful request", async () => {
  const instance = new Builder().build()
  const response = await instance.patch("https://mock-server/expect/status/200", {data: "test"})
  expect(response.status).toBe(200)
  expect(response.data.count).toBe(1)
})

test("FUNC withCache WITH 1 second ttl EXPECT cache expires after time", async () => {
  vi.useFakeTimers()
  const instance = new Builder().withCache(1).build()

  const response1 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.data.count).toBe(1)
  expect(response1.cached).toBe(false)

  vi.advanceTimersByTime(1500)

  const response2 = await instance.get("https://mock-server/expect/status/200")
  expect(response2.data.count).toBe(2)
  expect(response2.cached).toBe(false)

  vi.restoreAllMocks()
})

test("FUNC withCache WITH 5 second ttl EXPECT cache valid within time", async () => {
  vi.useFakeTimers()
  const instance = new Builder().withCache(5).build()

  const response1 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.data.count).toBe(1)

  vi.advanceTimersByTime(3000)

  const response2 = await instance.get("https://mock-server/expect/status/200")
  expect(response2.data.count).toBe(1)
  expect(response2.cached).toBe(true)

  vi.restoreAllMocks()
})

test("FUNC withCache WITH 0 second ttl EXPECT no caching", async () => {
  const instance = new Builder().withCache(0).build()

  const response1 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.data.count).toBe(1)

  const response2 = await instance.get("https://mock-server/expect/status/200")
  expect(response2.data.count).toBe(2)
  expect(response2.cached).toBe(false)
})

test("FUNC get WITH network timeout EXPECT request timeout error", async () => {
  const instance = new Builder().withDefaults({timeout: 100}).build()
  await expect(instance.get("https://mock-server/expect/timeout")).rejects.toThrow()
})

test("FUNC get WITH connection refused EXPECT error thrown", async () => {
  const instance = new Builder().build()
  await expect(instance.get("https://localhost:99999/invalid")).rejects.toThrow()
})

test("FUNC get WITH malformed JSON response EXPECT successful response with plain text", async () => {
  const instance = new Builder().build()
  const response = await instance.get("https://mock-server/non-json")
  expect(response.status).toBe(200)
  expect(response.data).toBe("Plain text response")
})

test("FUNC get WITH empty response body EXPECT successful response with empty data", async () => {
  const instance = new Builder().build()
  const response = await instance.get("https://mock-server/empty-body")
  expect(response.status).toBe(200)
  expect(response.data).toBe("")
})

test("FUNC get WITH deeply nested error response EXPECT error extracted", async () => {
  const instance = new Builder()
    .withErrorMapping(
      new ErrorMap()
        .withError(BadRequestError, [400])
        .withCustomErrorPath("errors[0].detail")
    ).build()

  await expect(instance.get("https://mock-server/nested-error/400")).rejects.toBeInstanceOf(BadRequestError)
})

test("FUNC get WITH 301 redirect EXPECT follows redirect", async () => {
  const instance = new Builder().build()
  const response = await instance.get("https://mock-server/redirect/301")
  expect(response.status).toBe(200)
})

test("FUNC withDefaults WITH custom headers EXPECT headers sent", async () => {
  const instance = new Builder()
    .withDefaults({headers: {"X-Custom-Header": "test-value"}})
    .build()

  const response = await instance.get("https://mock-server/echo-headers")
  expect(response.data.headers["x-custom-header"]).toBe("test-value")
})

test("FUNC withDefaults WITH custom timeout EXPECT timeout applied", async () => {
  const instance = new Builder().withDefaults({timeout: 50}).build()
  await expect(instance.get("https://mock-server/delay/100")).rejects.toThrow()
})

test("FUNC withDefaults WITH baseURL EXPECT baseURL prepended", async () => {
  const instance = new Builder()
    .withDefaults({baseURL: "https://mock-server"})
    .build()

  const response = await instance.get("/expect/status/200")
  expect(response.status).toBe(200)
})

test("FUNC withDefaults WITH auth config EXPECT auth header sent", async () => {
  const instance = new Builder()
    .withDefaults({auth: {username: "user", password: "pass"}})
    .build()

  const response = await instance.get("https://mock-server/echo-auth")
  expect(response.data.auth).toBeDefined()
})

test("FUNC withRetry WITH network error EXPECT retries network failures", async () => {
  const instance = new Builder().withRetry(3, 1).build()
  await expect(instance.get("https://localhost:99999/invalid")).rejects.toThrow()
})

test("FUNC withRetry WITH 0 retries EXPECT no retry attempts", async () => {
  const instance = new Builder().withRetry(0, 1).build()

  const error = await instance.get("https://mock-server/expect/status/500").catch((e: any) => e)
  expect(error.response.data.count).toBe(1)
})

test("FUNC build WITH cache and error mapping EXPECT both features work together", async () => {
  const instance = new Builder()
    .withCache(10)
    .withErrorMapping(new ErrorMap().withError(ExternalApiError, [500]))
    .build()

  const response1 = await instance.get("https://mock-server/expect/status/200")
  expect(response1.data.count).toBe(1)

  const response2 = await instance.get("https://mock-server/expect/status/200")
  expect(response2.cached).toBe(true)

  await expect(instance.get("https://mock-server/expect/status/500")).rejects.toBeInstanceOf(ExternalApiError)
})

test("FUNC build WITH error mapping and custom path EXPECT nested error message extracted", async () => {
  const instance = new Builder()
    .withErrorMapping(
      new ErrorMap()
        .withError(BadRequestError, [400])
        .withCustomErrorPath("errors[0].detail")
    )
    .build()

  const error = await instance.get("https://mock-server/nested-error/400").catch((e: any) => e)
  expect(error).toBeInstanceOf(BadRequestError)
  expect(error.getMessage()).toContain("nested detail message")
})

test("FUNC build WITH multiple instances EXPECT shared cache", async () => {
  const instance1 = new Builder().withCache(10).build()
  const instance2 = new Builder().withCache(5).build()

  const response1 = await instance1.get("https://mock-server/expect/status/200")
  const response2 = await instance2.get("https://mock-server/expect/status/200")

  expect(response2.cached).toBe(true)
  expect(response1.data.count).toBe(response2.data.count)
})

test("FUNC build WITH caching EXPECT failed requests not cached", async () => {
  const instance = new Builder()
    .withCache(10)
    .build()

  const error = await instance.get("https://mock-server/expect/status/500").catch((e: any) => e)
  expect(error.response.data.count).toBe(1)

  const error2 = await instance.get("https://mock-server/expect/status/500").catch((e: any) => e)
  expect(error2.response.data.count).toBe(2)
})

test("FUNC build WITH no configuration EXPECT default behavior", async () => {
  const instance = new Builder().build()
  const response = await instance.get("https://mock-server/expect/status/200")

  expect(response.status).toBe(200)
  expect(response.data).toBeDefined()
})

test("FUNC build WITH multiple build calls EXPECT shared cache between instances", async () => {
  const builder = new Builder().withCache(10)

  const instance1 = builder.build()
  const instance2 = builder.build()

  await instance1.get("https://mock-server/expect/status/200")
  const response = await instance2.get("https://mock-server/expect/status/200")

  expect(response.cached).toBe(true)
})

test("FUNC withErrorMapping WITH null EXPECT no error mapping applied", async () => {
  const instance = new Builder().build()

  const error = await instance.get("https://mock-server/expect/status/500").catch((e: any) => e)
  expect(error).not.toBeInstanceOf(ExternalApiError)
})
