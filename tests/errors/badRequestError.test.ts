import BadRequestError from "../../src/errors/badRequestError.js"
import CustomError from "../../src/errors/customError.js"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new BadRequestError()

  expect(error.getName()).toBe("BadRequestError")
  expect(error.getHttpCode()).toBe(400)
  expect(error.getIsCritical()).toBe(false)
  expect(error.getMessage()).toBe("Bad request.")
  expect(error.getTitle()).toBe("Bad request")
  expect(error.getDescription()).toBe("The server cannot process the request due to a client error.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new BadRequestError({
    message: "Custom",
    httpCode: 999,
    isCritical: true
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
  expect(error.getIsCritical()).toBe(true)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new BadRequestError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("BadRequestError")
  expect(obj.httpCode).toBe(400)
  expect(obj.isCritical).toBe(false)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new BadRequestError()

  expect(error).toBeInstanceOf(CustomError)
})
