import MaintenanceModeError from "../../src/errors/maintenanceModeError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new MaintenanceModeError()

  expect(error.getName()).toBe("MaintenanceModeError")
  expect(error.getHttpCode()).toBe(503)
  expect(error.getMessage()).toBe("We're currently performing scheduled maintenance. Please try again shortly.")
  expect(error.getTitle()).toBe("Maintenance Mode")
  expect(error.getDescription()).toBe("The application is temporarily unavailable due to scheduled maintenance.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new MaintenanceModeError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new MaintenanceModeError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("MaintenanceModeError")
  expect(obj.httpCode).toBe(503)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new MaintenanceModeError()

  expect(error).toBeInstanceOf(CustomError)
})
