import MethodNotAllowedError from "../../src/errors/methodNotAllowedError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new MethodNotAllowedError()

  expect(error.getName()).toBe("MethodNotAllowedError")
  expect(error.getHttpCode()).toBe(405)
  expect(error.getMessage()).toBe("Method not allowed.")
  expect(error.getTitle()).toBe("Method not allowed")
  expect(error.getDescription()).toBe("The HTTP method used is not supported for this resource.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new MethodNotAllowedError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new MethodNotAllowedError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("MethodNotAllowedError")
  expect(obj.httpCode).toBe(405)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new MethodNotAllowedError()

  expect(error).toBeInstanceOf(CustomError)
})
