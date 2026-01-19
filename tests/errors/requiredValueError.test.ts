import RequiredValueError from "../../src/errors/requiredValueError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new RequiredValueError()

  expect(error.getName()).toBe("RequiredValueError")
  expect(error.getHttpCode()).toBe(400)
  expect(error.getMessage()).toBe("Value can not be empty.")
  expect(error.getTitle()).toBe("Provided value is empty")
  expect(error.getDescription()).toBe("The provided value was empty, but it can not be empty. Please check your input and try again.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new RequiredValueError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new RequiredValueError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("RequiredValueError")
  expect(obj.httpCode).toBe(400)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new RequiredValueError()

  expect(error).toBeInstanceOf(CustomError)
})
