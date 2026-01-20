// Base error.
export { default as CustomError } from './src/errors/customError.js'

// 4xx Client Errors.
export { default as BadRequestError } from './src/errors/badRequestError.js'
export { default as InvalidInputError } from './src/errors/invalidInputError.js'
export { default as RequiredValueError } from './src/errors/requiredValueError.js'
export { default as UnauthorizedError } from './src/errors/unauthorizedError.js'
export { default as PaymentRequiredError } from './src/errors/paymentRequiredError.js'
export { default as ForbiddenError } from './src/errors/forbiddenError.js'
export { default as ResourceDoesNotExistError } from './src/errors/resourceDoesNotExistError.js'
export { default as MethodNotAllowedError } from './src/errors/methodNotAllowedError.js'
export { default as NotAllowedError } from './src/errors/notAllowedError.js'
export { default as NotAcceptableError } from './src/errors/notAcceptableError.js'
export { default as RequestTimeoutError } from './src/errors/requestTimeoutError.js'
export { default as ConflictError } from './src/errors/conflictError.js'
export { default as GoneError } from './src/errors/goneError.js'
export { default as UnprocessableEntityError } from './src/errors/unprocessableEntityError.js'
export { default as ExternalApiError } from './src/errors/externalApiError.js'
export { default as RateLimitError } from './src/errors/rateLimitError.js'

// 5xx Server Errors.
export { default as GenericError } from './src/errors/genericError.js'
export { default as MisconfiguredError } from './src/errors/misconfiguredError.js'
export { default as NotImplementedError } from './src/errors/notImplementedError.js'
export { default as BadGatewayError } from './src/errors/badGatewayError.js'
export { default as MaintenanceModeError } from './src/errors/maintenanceModeError.js'
export { default as GatewayTimeoutError } from './src/errors/gatewayTimeoutError.js'

// HTTP utilities.
export { default as Builder } from './src/http/builder.js'
export { default as ErrorMap } from './src/http/errorMap.js'

// Re-export CustomErrorProps for consumers.
export type { CustomErrorProps } from './src/errors/customError.js'
