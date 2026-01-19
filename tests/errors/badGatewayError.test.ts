import BadGatewayError from "../../src/errors/badGatewayError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new BadGatewayError()

  expect(error.getName()).toBe("BadGatewayError")
  expect(error.getHttpCode()).toBe(502)
  expect(error.getMessage()).toBe("Bad gateway.")
  expect(error.getTitle()).toBe("Bad gateway")
  expect(error.getDescription()).toBe("The server received an invalid response from an upstream server.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new BadGatewayError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new BadGatewayError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("BadGatewayError")
  expect(obj.httpCode).toBe(502)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new BadGatewayError()

  expect(error).toBeInstanceOf(CustomError)
})
