// Base error.
export { default as CustomError } from './src/errors/customError'

// 4xx Client Errors.
export { default as BadRequestError } from './src/errors/badRequestError'
export { default as InvalidInputError } from './src/errors/invalidInputError'
export { default as RequiredValueError } from './src/errors/requiredValueError'
export { default as UnauthorizedError } from './src/errors/unauthorizedError'
export { default as PaymentRequiredError } from './src/errors/paymentRequiredError'
export { default as ForbiddenError } from './src/errors/forbiddenError'
export { default as ResourceDoesNotExistError } from './src/errors/resourceDoesNotExistError'
export { default as MethodNotAllowedError } from './src/errors/methodNotAllowedError'
export { default as NotAllowedError } from './src/errors/notAllowedError'
export { default as NotAcceptableError } from './src/errors/notAcceptableError'
export { default as RequestTimeoutError } from './src/errors/requestTimeoutError'
export { default as ConflictError } from './src/errors/conflictError'
export { default as GoneError } from './src/errors/goneError'
export { default as UnprocessableEntityError } from './src/errors/unprocessableEntityError'
export { default as ExternalApiError } from './src/errors/externalApiError'
export { default as RateLimitError } from './src/errors/rateLimitError'

// 5xx Server Errors.
export { default as GenericError } from './src/errors/genericError'
export { default as MisconfiguredError } from './src/errors/misconfiguredError'
export { default as NotImplementedError } from './src/errors/notImplementedError'
export { default as BadGatewayError } from './src/errors/badGatewayError'
export { default as MaintenanceModeError } from './src/errors/maintenanceModeError'
export { default as GatewayTimeoutError } from './src/errors/gatewayTimeoutError'

// HTTP utilities.
export { default as Builder } from './src/http/builder'
export { default as ErrorMap } from './src/http/errorMap'

// Re-export CustomErrorProps for consumers.
export type { CustomErrorProps } from './src/errors/customError'
