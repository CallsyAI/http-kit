import NotAcceptableError from "../../src/errors/notAcceptableError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new NotAcceptableError()

  expect(error.getName()).toBe("NotAcceptableError")
  expect(error.getHttpCode()).toBe(406)
  expect(error.getMessage()).toBe("Not acceptable.")
  expect(error.getTitle()).toBe("Not acceptable")
  expect(error.getDescription()).toBe("The server cannot produce a response matching the list of acceptable values defined in the request headers.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new NotAcceptableError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new NotAcceptableError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("NotAcceptableError")
  expect(obj.httpCode).toBe(406)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new NotAcceptableError()

  expect(error).toBeInstanceOf(CustomError)
})
