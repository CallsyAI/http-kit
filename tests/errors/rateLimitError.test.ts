import RateLimitError from "../../src/errors/rateLimitError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new RateLimitError()

  expect(error.getName()).toBe("RateLimitError")
  expect(error.getHttpCode()).toBe(429)
  expect(error.getMessage()).toBe("Rate limit reached. Please try again later.")
  expect(error.getTitle()).toBe("Too many requests")
  expect(error.getDescription()).toBe("You tried to do this action too many times. Please wait and try again later.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new RateLimitError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new RateLimitError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("RateLimitError")
  expect(obj.httpCode).toBe(429)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new RateLimitError()

  expect(error).toBeInstanceOf(CustomError)
})
