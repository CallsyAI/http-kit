import GatewayTimeoutError from "../../src/errors/gatewayTimeoutError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new GatewayTimeoutError()

  expect(error.getName()).toBe("GatewayTimeoutError")
  expect(error.getHttpCode()).toBe(504)
  expect(error.getMessage()).toBe("Gateway timeout.")
  expect(error.getTitle()).toBe("Gateway timeout")
  expect(error.getDescription()).toBe("The server did not receive a timely response from an upstream server.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new GatewayTimeoutError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new GatewayTimeoutError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("GatewayTimeoutError")
  expect(obj.httpCode).toBe(504)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new GatewayTimeoutError()

  expect(error).toBeInstanceOf(CustomError)
})
