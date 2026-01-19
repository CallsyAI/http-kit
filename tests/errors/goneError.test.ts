import GoneError from "../../src/errors/goneError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new GoneError()

  expect(error.getName()).toBe("GoneError")
  expect(error.getHttpCode()).toBe(410)
  expect(error.getMessage()).toBe("Resource gone.")
  expect(error.getTitle()).toBe("Resource gone")
  expect(error.getDescription()).toBe("The requested resource is no longer available and will not be available again.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new GoneError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new GoneError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("GoneError")
  expect(obj.httpCode).toBe(410)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new GoneError()

  expect(error).toBeInstanceOf(CustomError)
})
