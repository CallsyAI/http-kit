import ForbiddenError from "../../src/errors/forbiddenError.js"
import CustomError from "../../src/errors/customError.js"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new ForbiddenError()

  expect(error.getName()).toBe("ForbiddenError")
  expect(error.getHttpCode()).toBe(403)
  expect(error.getIsCritical()).toBe(false)
  expect(error.getMessage()).toBe("Access forbidden.")
  expect(error.getTitle()).toBe("Access forbidden")
  expect(error.getDescription()).toBe("You do not have permission to access this resource.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new ForbiddenError({
    message: "Custom",
    httpCode: 999,
    isCritical: true
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
  expect(error.getIsCritical()).toBe(true)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new ForbiddenError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("ForbiddenError")
  expect(obj.httpCode).toBe(403)
  expect(obj.isCritical).toBe(false)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new ForbiddenError()

  expect(error).toBeInstanceOf(CustomError)
})
