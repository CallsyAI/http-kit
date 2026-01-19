import BadRequestError from "../../src/errors/badRequestError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new BadRequestError()

  expect(error.getName()).toBe("BadRequestError")
  expect(error.getHttpCode()).toBe(400)
  expect(error.getMessage()).toBe("Bad request.")
  expect(error.getTitle()).toBe("Bad request")
  expect(error.getDescription()).toBe("The server cannot process the request due to a client error.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new BadRequestError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new BadRequestError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("BadRequestError")
  expect(obj.httpCode).toBe(400)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new BadRequestError()

  expect(error).toBeInstanceOf(CustomError)
})
