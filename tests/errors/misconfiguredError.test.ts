import MisconfiguredError from "../../src/errors/misconfiguredError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new MisconfiguredError()

  expect(error.getName()).toBe("MisconfiguredError")
  expect(error.getHttpCode()).toBe(500)
  expect(error.getMessage()).toBe("It looks like something is misconfigured.")
  expect(error.getTitle()).toBe("Something is not entirely right with the system")
  expect(error.getDescription()).toBe("An internal error was detected due to some unexpected misconfiguration. This error should be shared with the support team.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new MisconfiguredError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new MisconfiguredError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("MisconfiguredError")
  expect(obj.httpCode).toBe(500)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new MisconfiguredError()

  expect(error).toBeInstanceOf(CustomError)
})
