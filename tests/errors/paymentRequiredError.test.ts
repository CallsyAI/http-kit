import PaymentRequiredError from "../../src/errors/paymentRequiredError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new PaymentRequiredError()

  expect(error.getName()).toBe("PaymentRequiredError")
  expect(error.getHttpCode()).toBe(402)
  expect(error.getMessage()).toBe("Payment required.")
  expect(error.getTitle()).toBe("Payment required")
  expect(error.getDescription()).toBe("Payment is required to access this resource.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new PaymentRequiredError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new PaymentRequiredError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("PaymentRequiredError")
  expect(obj.httpCode).toBe(402)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new PaymentRequiredError()

  expect(error).toBeInstanceOf(CustomError)
})
