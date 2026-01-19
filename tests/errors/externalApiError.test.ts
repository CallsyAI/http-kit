import ExternalApiError from "../../src/errors/externalApiError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new ExternalApiError()

  expect(error.getName()).toBe("ExternalApiError")
  expect(error.getHttpCode()).toBe(424)
  expect(error.getMessage()).toBe("An error happened when calling an external api.")
  expect(error.getTitle()).toBe("External system error")
  expect(error.getDescription()).toBe("There was an internal error due to an error from an external API.")
})

test("FUNC constructor WITH custom props EXPECT overridden values", () => {
  const error = new ExternalApiError({
    message: "Custom",
    httpCode: 999
  })

  expect(error.getMessage()).toBe("Custom")
  expect(error.getHttpCode()).toBe(999)
})

test("FUNC toObject WITH valid instance EXPECT serialized object", () => {
  const error = new ExternalApiError()
  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("ExternalApiError")
  expect(obj.httpCode).toBe(424)
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new ExternalApiError()

  expect(error).toBeInstanceOf(CustomError)
})
