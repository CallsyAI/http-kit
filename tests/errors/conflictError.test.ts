import ConflictError from "../../src/errors/conflictError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new ConflictError()

  expect(error.getName()).toBe("ConflictError")
  expect(error.getHttpCode()).toBe(409)
  expect(error.getMessage()).toBe("Conflict.")
  expect(error.getTitle()).toBe("Conflict")
  expect(error.getDescription()).toBe("The request conflicts with the current state of the server.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new ConflictError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new ConflictError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("ConflictError")
  expect(obj.httpCode).toBe(409)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new ConflictError()

  expect(error).toBeInstanceOf(CustomError)
})
