import UnprocessableEntityError from "../../src/errors/unprocessableEntityError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new UnprocessableEntityError()

  expect(error.getName()).toBe("UnprocessableEntityError")
  expect(error.getHttpCode()).toBe(422)
  expect(error.getMessage()).toBe("Unprocessable entity.")
  expect(error.getTitle()).toBe("Unprocessable entity")
  expect(error.getDescription()).toBe("The request was well-formed but contains semantic errors.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new UnprocessableEntityError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new UnprocessableEntityError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("UnprocessableEntityError")
  expect(obj.httpCode).toBe(422)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new UnprocessableEntityError()

  expect(error).toBeInstanceOf(CustomError)
})
