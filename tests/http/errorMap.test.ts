import ErrorMap from "~/http/errorMap"
import GenericError from "~/errors/genericError"
import {AxiosError} from "axios"
import MisconfiguredError from "~/errors/misconfiguredError"
import InvalidInputError from "~/errors/invalidInputError"
import BadRequestError from "~/errors/badRequestError"
import UnauthorizedError from "~/errors/unauthorizedError"
import ExternalApiError from "~/errors/externalApiError"

const mockError = new AxiosError("Request failed with status code 500")

mockError.response = {
  data: "Unknown error happened!",
  status: 500,
  statusText: 'Internal Server Error',
  headers: {},
  config: {} as any,
}

test("FUNC match WITH matching error code EXPECT error matched", async () => {
  const err = new ErrorMap()
    .withError(MisconfiguredError, [499])
    .withError(InvalidInputError, [500])
    .withError(GenericError, [501])
    .match(mockError)

  // Check if internal 500 error was correctly mapped to invalid input 400 error.
  expect(err).toBeInstanceOf(InvalidInputError)
  expect(err?.getHttpCode()).toBe(400)
  expect(err?.getMessage()).toBe("Unknown error happened!")
})

test("FUNC match WITH matching error text EXPECT error matched", async () => {
  const err = new ErrorMap()
    .withError(MisconfiguredError, [499])
    .withError(InvalidInputError, ["unknown error"])
    .withError(GenericError, ["something"])
    .match(mockError)

  // Check if internal 500 error was correctly mapped to invalid input 400 error.
  expect(err).toBeInstanceOf(InvalidInputError)
  expect(err?.getHttpCode()).toBe(400)
  expect(err?.getMessage()).toBe("Unknown error happened!")
})

test("FUNC match WITH no matching errors EXPECT null", async () => {
  const err = new ErrorMap()
    .withError(MisconfiguredError, [400])
    .withError(MisconfiguredError, [300])
    .withError(MisconfiguredError, ["something that is not matching"])
    .match(mockError)

  expect(err).toBe(null)
})

test("FUNC withDefault WITH no matching mappings EXPECT default error returned", () => {
  const errorMap = new ErrorMap().withDefault(GenericError)

  const error = {
    response: {status: 999, data: {message: "Unknown error"}, statusText: "", headers: {}, config: {} as any},
    message: "Unknown error"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result).toBeInstanceOf(GenericError)
  expect(result?.getMessage()).toBe("Unknown error")
})

test("FUNC withDefault WITH matching mapping EXPECT mapped error not default", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withDefault(GenericError)

  const error = {
    response: {status: 400, data: {message: "Bad request"}, statusText: "", headers: {}, config: {} as any},
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result).toBeInstanceOf(BadRequestError)
  expect(result).not.toBeInstanceOf(GenericError)
})

test("FUNC withDefault WITH null response EXPECT null returned", () => {
  const errorMap = new ErrorMap().withDefault(GenericError)

  const error = {response: null, message: "Network error"} as unknown as AxiosError

  const result = errorMap.match(error)
  expect(result).toBeNull()
})

test("FUNC match WITH default error and custom message EXPECT message passed to default", () => {
  const errorMap = new ErrorMap().withDefault(GenericError)

  const error = {
    response: {status: 999, data: {message: "Custom error message"}, statusText: "", headers: {}, config: {} as any},
    message: "Custom error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Custom error message")
})

test("FUNC withError WITH multiple status codes EXPECT all trigger mapping", () => {
  const errorMap = new ErrorMap().withError(UnauthorizedError, [401, 403])

  const error1 = {
    response: {status: 401, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Unauthorized"
  } as AxiosError

  const error2 = {
    response: {status: 403, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Forbidden"
  } as AxiosError

  const result1 = errorMap.match(error1)
  const result2 = errorMap.match(error2)

  expect(result1).toBeInstanceOf(UnauthorizedError)
  expect(result2).toBeInstanceOf(UnauthorizedError)
})

test("FUNC withError WITH multiple string triggers EXPECT all trigger mapping", () => {
  const errorMap = new ErrorMap().withError(ExternalApiError, ["timeout", "network error"])

  const error1 = {
    response: {status: 500, data: {message: "Request timeout"}, statusText: "", headers: {}, config: {} as any},
    message: "Request timeout"
  } as AxiosError

  const error2 = {
    response: {status: 500, data: {message: "Network error occurred"}, statusText: "", headers: {}, config: {} as any},
    message: "Network error occurred"
  } as AxiosError

  const result1 = errorMap.match(error1)
  const result2 = errorMap.match(error2)

  expect(result1).toBeInstanceOf(ExternalApiError)
  expect(result2).toBeInstanceOf(ExternalApiError)
})

test("FUNC withError WITH mixed number and string triggers EXPECT both types work", () => {
  const errorMap = new ErrorMap().withError(ExternalApiError, [500, "server error"])

  const error1 = {
    response: {status: 500, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Internal server error"
  } as AxiosError

  const error2 = {
    response: {status: 400, data: {message: "Server error occurred"}, statusText: "", headers: {}, config: {} as any},
    message: "Server error occurred"
  } as AxiosError

  const result1 = errorMap.match(error1)
  const result2 = errorMap.match(error2)

  expect(result1).toBeInstanceOf(ExternalApiError)
  expect(result2).toBeInstanceOf(ExternalApiError)
})

test("FUNC withCustomErrorPath WITH nested path EXPECT message extracted from path", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("errors[0].detail")

  const error = {
    response: {
      status: 400,
      data: {errors: [{detail: "Nested error message"}]},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Nested error message")
})

test("FUNC withCustomErrorPath WITH dot notation path EXPECT deep property extracted", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("error.details.message")

  const error = {
    response: {
      status: 400,
      data: {error: {details: {message: "Deep nested message"}}},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Deep nested message")
})

test("FUNC withCustomErrorPath WITH nonexistent path EXPECT fallback to data.message", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("nonexistent.path")

  const error = {
    response: {
      status: 400,
      data: {message: "Fallback message"},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Fallback message")
})

test("FUNC withCustomErrorPath WITH array index notation EXPECT array element extracted", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("errors[1].message")

  const error = {
    response: {
      status: 400,
      data: {errors: [{message: "First"}, {message: "Second error"}]},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Second error")
})

test("FUNC withCustomErrorPath WITH empty string path EXPECT default precedence", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("")

  const error = {
    response: {
      status: 400,
      data: {error: "Error field", message: "Message field"},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Error field")
})

test("FUNC match WITH all message sources EXPECT custom path highest priority", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withCustomErrorPath("custom.path")

  const error = {
    response: {
      status: 400,
      data: {
        custom: {path: "Custom path message"},
        error: "Error field",
        message: "Message field"
      },
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Custom path message")
})

test("FUNC match WITH data.error and data.message EXPECT data.error priority", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {
      status: 400,
      data: {
        error: "Error field value",
        message: "Message field value"
      },
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Error field value")
})

test("FUNC match WITH only data.message EXPECT data.message used", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {
      status: 400,
      data: {message: "Message field value"},
      statusText: "",
      headers: {},
      config: {} as any
    },
    message: "Error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Message field value")
})

test("FUNC match WITH only error.message EXPECT error.message used", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {status: 400, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Error message fallback"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Error message fallback")
})

test("FUNC match WITH null data EXPECT error.message used", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {status: 400, data: null, statusText: "", headers: {}, config: {} as any},
    message: "Fallback to error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Fallback to error message")
})

test("FUNC match WITH undefined data EXPECT error.message used", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {status: 400, data: undefined, statusText: "", headers: {}, config: {} as any},
    message: "Fallback to error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Fallback to error message")
})

test("FUNC match WITH empty string data EXPECT error.message used", () => {
  const errorMap = new ErrorMap().withError(BadRequestError, [400])

  const error = {
    response: {status: 400, data: "", statusText: "", headers: {}, config: {} as any},
    message: "Fallback to error message"
  } as AxiosError

  const result = errorMap.match(error)
  expect(result?.getMessage()).toBe("Fallback to error message")
})

test("FUNC constructor WITH initial mappings EXPECT mappings loaded", () => {
  const initialMappings = [
    {error: BadRequestError, triggers: [400]},
    {error: UnauthorizedError, triggers: [401]}
  ]

  const errorMap = new ErrorMap(initialMappings)

  const error = {
    response: {status: 400, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Bad request"
  } as AxiosError

  const result = errorMap.match(error)

  expect(result).toBeInstanceOf(BadRequestError)
})

test("FUNC constructor WITH initial mappings and chained withError EXPECT both mappings work", () => {
  const initialMappings = [{error: BadRequestError, triggers: [400]}]

  const errorMap = new ErrorMap(initialMappings)
    .withError(UnauthorizedError, [401])

  const error1 = {
    response: {status: 400, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Bad request"
  } as AxiosError

  const error2 = {
    response: {status: 401, data: {}, statusText: "", headers: {}, config: {} as any},
    message: "Unauthorized"
  } as AxiosError

  const result1 = errorMap.match(error1)
  const result2 = errorMap.match(error2)

  expect(result1).toBeInstanceOf(BadRequestError)
  expect(result2).toBeInstanceOf(UnauthorizedError)
})

test("FUNC mappings WITH configured mappings EXPECT mappings returned", () => {
  const errorMap = new ErrorMap()
    .withError(BadRequestError, [400])
    .withError(UnauthorizedError, [401])

  const mappings = errorMap.mappings

  expect(mappings).toHaveLength(2)
  expect(mappings[0].error).toBe(BadRequestError)
  expect(mappings[1].error).toBe(UnauthorizedError)
})

test("FUNC defaultError WITH configured default EXPECT default error returned", () => {
  const errorMap = new ErrorMap().withDefault(GenericError)
  const defaultError = errorMap.defaultError
  expect(defaultError).toBe(GenericError)
})

test("FUNC customErrorPath WITH configured path EXPECT path returned", () => {
  const errorMap = new ErrorMap().withCustomErrorPath("errors[0].detail")
  const path = errorMap.customErrorPath
  expect(path).toBe("errors[0].detail")
})
