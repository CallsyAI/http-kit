import CustomError from "../../src/errors/customError"

test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new CustomError()

  expect(error.getName()).toBe("CustomError")
  expect(error.getMessage()).toBe("Custom error happened!")
  expect(error.getTitle()).toBe("Custom Error")
  expect(error.getDescription()).toBe("Unspecific custom error occurred.")
  expect(error.getHttpCode()).toBe(500)
  expect(error.getIsCritical()).toBe(true)
  expect(error.getDebugMessage()).toBe(null)
  expect(error.isCustomError).toBe(true)
})

test("FUNC constructor WITH partial props EXPECT partial overrides", () => {
  const error = new CustomError({
    name: "PartialError",
    httpCode: 400
  })

  expect(error.getName()).toBe("PartialError")
  expect(error.getMessage()).toBe("Custom error happened!")
  expect(error.getTitle()).toBe("Custom Error")
  expect(error.getDescription()).toBe("Unspecific custom error occurred.")
  expect(error.getHttpCode()).toBe(400)
  expect(error.getIsCritical()).toBe(true)
  expect(error.getDebugMessage()).toBe(null)
})

test("FUNC constructor WITH full props EXPECT all values set", () => {
  const error = new CustomError({
    name: "FullError",
    message: "Full message",
    title: "Full Title",
    description: "Full description",
    httpCode: 404,
    isCritical: false,
    debugMessage: "Debug info"
  })

  expect(error.getName()).toBe("FullError")
  expect(error.getMessage()).toBe("Full message")
  expect(error.getTitle()).toBe("Full Title")
  expect(error.getDescription()).toBe("Full description")
  expect(error.getHttpCode()).toBe(404)
  expect(error.getIsCritical()).toBe(true)
  expect(error.getDebugMessage()).toBe("Debug info")
})

test("FUNC constructor WITH debugMessage EXPECT debugMessage stored", () => {
  const error = new CustomError({
    debugMessage: "Detailed debug info"
  })

  expect(error.getDebugMessage()).toBe("Detailed debug info")
})

test("FUNC constructor WITH undefined debugMessage EXPECT null returned", () => {
  const error = new CustomError()

  expect(error.getDebugMessage()).toBe(null)
})

test("FUNC setName WITH new name EXPECT name updated and chainable", () => {
  const error = new CustomError()
  const result = error.setName("UpdatedError")

  expect(error.getName()).toBe("UpdatedError")
  expect(result).toBe(error)
})

test("FUNC setMessage WITH new message EXPECT message updated and chainable", () => {
  const error = new CustomError()
  const result = error.setMessage("Updated message")

  expect(error.getMessage()).toBe("Updated message")
  expect(result).toBe(error)
})

test("FUNC setTitle WITH new title EXPECT title updated and chainable", () => {
  const error = new CustomError()
  const result = error.setTitle("Updated Title")

  expect(error.getTitle()).toBe("Updated Title")
  expect(result).toBe(error)
})

test("FUNC setDescription WITH new description EXPECT description updated and chainable", () => {
  const error = new CustomError()
  const result = error.setDescription("Updated description")

  expect(error.getDescription()).toBe("Updated description")
  expect(result).toBe(error)
})

test("FUNC setHttpCode WITH new code EXPECT code updated and chainable", () => {
  const error = new CustomError()
  const result = error.setHttpCode(400)

  expect(error.getHttpCode()).toBe(400)
  expect(result).toBe(error)
})

test("FUNC setIsCritical WITH new value EXPECT value updated and chainable", () => {
  const error = new CustomError()
  const result = error.setIsCritical(false)

  expect(error.getIsCritical()).toBe(false)
  expect(result).toBe(error)
})

test("FUNC setDebugMessage WITH new message EXPECT message updated and chainable", () => {
  const error = new CustomError()
  const result = error.setDebugMessage("New debug")

  expect(error.getDebugMessage()).toBe("New debug")
  expect(result).toBe(error)
})

test("FUNC setters WITH chained calls EXPECT all values updated", () => {
  const error = new CustomError()
    .setName("ChainedError")
    .setMessage("Chained message")
    .setTitle("Chained Title")
    .setDescription("Chained description")
    .setHttpCode(403)
    .setIsCritical(false)
    .setDebugMessage("Chained debug")

  expect(error.getName()).toBe("ChainedError")
  expect(error.getMessage()).toBe("Chained message")
  expect(error.getTitle()).toBe("Chained Title")
  expect(error.getDescription()).toBe("Chained description")
  expect(error.getHttpCode()).toBe(403)
  expect(error.getIsCritical()).toBe(false)
  expect(error.getDebugMessage()).toBe("Chained debug")
})

test("FUNC getStackTrace WITH error instance EXPECT cleaned array", () => {
  const error = new CustomError()
  const stackTrace = error.getStackTrace()

  expect(Array.isArray(stackTrace)).toBe(true)
  expect(stackTrace.length).toBeGreaterThan(0)
})

test("FUNC getStackTrace WITH error instance EXPECT cwd paths removed", () => {
  const error = new CustomError()
  const stackTrace = error.getStackTrace()
  const cwd = process.cwd()

  stackTrace.forEach(line => {
    expect(line).not.toContain(cwd)
  })
})

test("FUNC getStackTrace WITH error instance EXPECT at prefix removed", () => {
  const error = new CustomError()
  const stackTrace = error.getStackTrace()

  stackTrace.forEach(line => {
    expect(line).not.toMatch(/^at\s+/)
  })
})

test("FUNC getStackTrace WITH error instance EXPECT commas removed", () => {
  const error = new CustomError()
  const stackTrace = error.getStackTrace()

  stackTrace.forEach(line => {
    expect(line).not.toContain(",")
  })
})

test("FUNC getStackTrace WITH error instance EXPECT no empty lines", () => {
  const error = new CustomError()
  const stackTrace = error.getStackTrace()

  stackTrace.forEach(line => {
    expect(line.length).toBeGreaterThan(0)
  })
})

test("FUNC toObject WITH debug false EXPECT basic fields only", () => {
  const error = new CustomError({
    name: "TestError",
    message: "Test",
    title: "Title",
    description: "Description",
    httpCode: 400,
    isCritical: false,
    debugMessage: "Debug"
  })

  const obj = error.toObject(false)

  expect(obj.isCustomError).toBe(true)
  expect(obj.name).toBe("TestError")
  expect(obj.message).toBe("Test")
  expect(obj.title).toBe("Title")
  expect(obj.description).toBe("Description")
  expect(obj.httpCode).toBe(400)
  expect(obj.isCritical).toBe(true)
  expect(obj.debugMessage).toBeUndefined()
  expect(obj.stackTrace).toBeUndefined()
})

test("FUNC toObject WITH debug true EXPECT debug fields included", () => {
  const error = new CustomError({
    debugMessage: "Debug info"
  })

  const obj = error.toObject(true)

  expect(obj.debugMessage).toBe("Debug info")
  expect(obj.stackTrace).toBeDefined()
  expect(Array.isArray(obj.stackTrace)).toBe(true)
})

test("FUNC toObject WITH null debugMessage and debug true EXPECT debugMessage null", () => {
  const error = new CustomError()

  const obj = error.toObject(true)

  expect(obj.debugMessage).toBe(null)
})

test("FUNC toObject WITH error instance EXPECT isCustomError flag", () => {
  const error = new CustomError()

  const obj = error.toObject()

  expect(obj.isCustomError).toBe(true)
})

test("FUNC fromObject WITH valid error object EXPECT CustomError instance", () => {
  const obj = {
    isCustomError: true,
    name: "DeserializedError",
    message: "Deserialized message",
    title: "Test Title",
    description: "Test description",
    httpCode: 404,
    isCritical: true,
    debugMessage: null
  }

  const error = CustomError.fromObject(obj)

  expect(error).toBeInstanceOf(CustomError)
  expect(error?.getName()).toBe("DeserializedError")
  expect(error?.getMessage()).toBe("Deserialized message")
  expect(error?.getHttpCode()).toBe(404)
})

test("FUNC fromObject WITH partial object EXPECT instance with defaults", () => {
  const obj = {
    isCustomError: true,
    name: "PartialError",
    message: "Test message",
    title: "Test Title",
    description: "Test description",
    httpCode: 500,
    isCritical: true,
    debugMessage: null
  }

  const error = CustomError.fromObject(obj)

  expect(error).toBeInstanceOf(CustomError)
  expect(error?.getName()).toBe("PartialError")
  expect(error?.getMessage()).toBe("Test message")
})

test("FUNC fromObject WITH non-error object EXPECT null", () => {
  const obj = {
    isCustomError: false,
    name: "NotError"
  }

  const error = CustomError.fromObject(obj)

  expect(error).toBe(null)
})

test("FUNC fromObject WITH null EXPECT null", () => {
  const error = CustomError.fromObject(null)

  expect(error).toBe(null)
})

test("FUNC fromObject WITH object missing isCustomError EXPECT null", () => {
  const obj = {
    name: "NoFlag"
  }

  const error = CustomError.fromObject(obj)

  expect(error).toBe(null)
})

test("FUNC fromObject WITH undefined EXPECT null", () => {
  const error = CustomError.fromObject(undefined)

  expect(error).toBe(null)
})

test("FUNC isError WITH object having isCustomError true EXPECT true", () => {
  const obj = {isCustomError: true}

  expect(CustomError.isError(obj)).toBe(true)
})

test("FUNC isError WITH object having isCustomError false EXPECT false", () => {
  const obj = {isCustomError: false}

  expect(CustomError.isError(obj)).toBe(false)
})

test("FUNC isError WITH object missing isCustomError EXPECT false", () => {
  const obj = {name: "Test"}

  expect(CustomError.isError(obj)).toBe(false)
})

test("FUNC isError WITH null EXPECT false", () => {
  expect(CustomError.isError(null)).toBe(false)
})

test("FUNC isError WITH undefined EXPECT false", () => {
  expect(CustomError.isError(undefined)).toBe(false)
})

test("FUNC isError WITH empty object EXPECT false", () => {
  expect(CustomError.isError({})).toBe(false)
})

test("FUNC throwIfError WITH valid error object EXPECT CustomError thrown", () => {
  const obj = {
    isCustomError: true,
    name: "TestError",
    message: "Should throw",
    title: "Test Title",
    description: "Test description",
    httpCode: 500,
    isCritical: true,
    debugMessage: null
  }

  expect(() => {
    CustomError.throwIfError(obj)
  }).toThrow(CustomError)
})

test("FUNC throwIfError WITH non-error object EXPECT no throw", () => {
  const obj = {isCustomError: false}

  expect(() => {
    CustomError.throwIfError(obj)
  }).not.toThrow()
})

test("FUNC throwIfError WITH null EXPECT no throw", () => {
  expect(() => {
    CustomError.throwIfError(null)
  }).not.toThrow()
})

test("FUNC throwIfError WITH undefined EXPECT no throw", () => {
  expect(() => {
    CustomError.throwIfError(undefined)
  }).not.toThrow()
})

test("FUNC throwIfError WITH object missing isCustomError EXPECT no throw", () => {
  const obj = {name: "Test"}

  expect(() => {
    CustomError.throwIfError(obj)
  }).not.toThrow()
})
