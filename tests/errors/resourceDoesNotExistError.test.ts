import ResourceDoesNotExistError from "../../src/errors/resourceDoesNotExistError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new ResourceDoesNotExistError()

  expect(error.getName()).toBe("ResourceDoesNotExistError")
  expect(error.getHttpCode()).toBe(404)
  expect(error.getMessage()).toBe("Resource does not exist.")
  expect(error.getTitle()).toBe("The requested resource could not be found")
  expect(error.getDescription()).toBe("You just requested a resource that is not (or no longer) in the system. Maybe it was recently deleted?")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new ResourceDoesNotExistError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new ResourceDoesNotExistError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("ResourceDoesNotExistError")
  expect(obj.httpCode).toBe(404)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new ResourceDoesNotExistError()

  expect(error).toBeInstanceOf(CustomError)
})
