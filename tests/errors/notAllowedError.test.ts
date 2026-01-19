import NotAllowedError from "../../src/errors/notAllowedError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new NotAllowedError()

  expect(error.getName()).toBe("NotAllowedError")
  expect(error.getHttpCode()).toBe(405)
  expect(error.getMessage()).toBe("You are not allowed to do this action.")
  expect(error.getTitle()).toBe("You are not allowed to do this action")
  expect(error.getDescription()).toBe("You lack the permissions to do this action.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new NotAllowedError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new NotAllowedError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("NotAllowedError")
  expect(obj.httpCode).toBe(405)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new NotAllowedError()

  expect(error).toBeInstanceOf(CustomError)
})
