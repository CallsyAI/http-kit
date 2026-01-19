import NotImplementedError from "../../src/errors/notImplementedError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new NotImplementedError()

  expect(error.getName()).toBe("NotImplementedError")
  expect(error.getHttpCode()).toBe(501)
  expect(error.getMessage()).toBe("Not implemented.")
  expect(error.getTitle()).toBe("Not implemented")
  expect(error.getDescription()).toBe("The server does not support the functionality required to fulfill the request.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new NotImplementedError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new NotImplementedError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("NotImplementedError")
  expect(obj.httpCode).toBe(501)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new NotImplementedError()

  expect(error).toBeInstanceOf(CustomError)
})
