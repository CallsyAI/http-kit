import InvalidInputError from "../../src/errors/invalidInputError"
import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no invalidFields EXPECT empty object", () => {
  const error = new InvalidInputError()

  expect(error.getInvalidFields()).toEqual({})
})

test("FUNC constructor WITH invalidFields EXPECT fields stored", () => {
  const fields = {email: "Invalid email format", password: "Too short"}
  const error = new InvalidInputError({invalidFields: fields})

  expect(error.getInvalidFields()).toEqual(fields)
})

test("FUNC constructor WITH invalidFields EXPECT correct defaults", () => {
  const error = new InvalidInputError({invalidFields: {test: "error"}})

  expect(error.getName()).toBe("InvalidInputError")
  expect(error.getMessage()).toBe("Invalid input.")
  expect(error.getTitle()).toBe("Some of the inputs are not correct")
  expect(error.getDescription()).toBe("You have provided information that is not valid. Please check your input and try again.")
  expect(error.getHttpCode()).toBe(400)
})

test("FUNC constructor WITH nested field names EXPECT fields stored", () => {
  const fields = {"user.email": "Invalid", "user.name": "Required"}
  const error = new InvalidInputError({invalidFields: fields})

  expect(error.getInvalidFields()).toEqual(fields)
})

test("FUNC getInvalidFields WITH fields EXPECT correct fields", () => {
  const fields = {username: "Already exists", age: "Must be 18+"}
  const error = new InvalidInputError({invalidFields: fields})

  expect(error.getInvalidFields()).toEqual(fields)
})

test("FUNC toObject WITH fields EXPECT invalidFields included", () => {
  const fields = {email: "Invalid format"}
  const error = new InvalidInputError({invalidFields: fields})

  const obj = error.toObject()

  expect(obj.invalidFields).toEqual(fields)
  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("InvalidInputError")
  expect(obj.message).toBe("Invalid input.")
})

test("FUNC toObject WITH fields and debugMessage EXPECT invalidFields included", () => {
  const fields = {test: "error"}
  const error = new InvalidInputError({
    invalidFields: fields,
    debugMessage: "Debug info"
  })

  const obj = error.toObject()

  expect(obj.invalidFields).toEqual(fields)
  expect(obj.debugMessage).toBeUndefined()
  expect(obj.stackTrace).toBeUndefined()
})

test("FUNC toObject WITH no fields EXPECT empty invalidFields", () => {
  const error = new InvalidInputError()

  const obj = error.toObject()

  expect(obj.invalidFields).toEqual({})
})

test("FUNC constructor WITH instance EXPECT instanceof CustomError", () => {
  const error = new InvalidInputError()

  expect(error).toBeInstanceOf(CustomError)
})

test("FUNC constructor WITH custom httpCode EXPECT override applied", () => {
  const error = new InvalidInputError({httpCode: 422})

  expect(error.getHttpCode()).toBe(422)
})
