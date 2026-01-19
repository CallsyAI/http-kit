import RequestTimeoutError from "../../src/errors/requestTimeoutError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new RequestTimeoutError()

  expect(error.getName()).toBe("RequestTimeoutError")
  expect(error.getHttpCode()).toBe(408)
  expect(error.getMessage()).toBe("Request timeout.")
  expect(error.getTitle()).toBe("Request timeout")
  expect(error.getDescription()).toBe("The server timed out waiting for the request.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new RequestTimeoutError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new RequestTimeoutError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("RequestTimeoutError")
  expect(obj.httpCode).toBe(408)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new RequestTimeoutError()

  expect(error).toBeInstanceOf(CustomError)
})
