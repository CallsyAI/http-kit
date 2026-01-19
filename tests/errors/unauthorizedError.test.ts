import UnauthorizedError from "../../src/errors/unauthorizedError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new UnauthorizedError()

  expect(error.getName()).toBe("UnauthorizedError")
  expect(error.getHttpCode()).toBe(401)
  expect(error.getMessage()).toBe("Authentication required.")
  expect(error.getTitle()).toBe("Authentication required")
  expect(error.getDescription()).toBe("You must provide valid authentication credentials to access this resource.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new UnauthorizedError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new UnauthorizedError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("UnauthorizedError")
  expect(obj.httpCode).toBe(401)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new UnauthorizedError()

  expect(error).toBeInstanceOf(CustomError)
})
