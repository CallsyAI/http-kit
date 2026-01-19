import GenericError from "../../src/errors/genericError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new GenericError()

  expect(error.getName()).toBe("GenericError")
  expect(error.getHttpCode()).toBe(500)
  expect(error.getMessage()).toBe("Unknown error occurred.")
  expect(error.getTitle()).toBe("Generic unknown error")
  expect(error.getDescription()).toBe("An unknown error happened. Please contact support or try refreshing the page and trying again.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new GenericError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new GenericError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("GenericError")
  expect(obj.httpCode).toBe(500)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new GenericError()

  expect(error).toBeInstanceOf(CustomError)
})
