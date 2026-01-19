# @callsy/http-kit

HTTP client utilities and custom error handling for Callsy applications.

## Installation

```bash
npm install @callsy/http-kit
```

## Features

- **Custom Error Classes**: HTTP-compatible error classes with serialization support
- **HTTP Builder**: Fluent API for creating Axios instances with caching, retry logic, and error mapping
- **Error Mapping**: Automatically map external API errors to custom error classes

## Usage

### Custom Errors

All error classes extend `CustomError` which provides a fluent API for error handling:

```typescript
import { InvalidInputError, CustomError } from '@callsy/http-kit'

// Throw a specific error
throw new InvalidInputError({ message: 'Invalid email format' })

// Check if an object is a CustomError
if (CustomError.isError(responseData)) {
  // Handle error
}

// Throw if error (useful for error boundaries)
CustomError.throwIfError(loaderData)

// Serialize error for API responses
const errorObj = error.toObject()
```

### Available Error Classes

- `CustomError` - Base error class
- `InvalidInputError` (400) - Invalid input data
- `UnauthorizedError` (401) - Authentication required
- `NotAllowedError` (405) - Insufficient permissions
- `ResourceDoesNotExistError` (404) - Resource not found
- `ExternalApiError` (424) - External API failure
- `RateLimitError` (429) - Rate limit exceeded
- `GenericError` (500) - Generic server error
- `RequiredValueError` (400) - Required value missing
- `MisconfiguredError` - Application misconfiguration
- `NotEnoughAvailableCallsError` - Insufficient available calls
- `ShopMismatchError` - Shop context mismatch
- `MaintenanceModeError` - Application in maintenance
- `InitiateCallFailed` - Call initiation failure

### HTTP Builder

Create configured Axios instances with caching, retries, and error mapping:

```typescript
import { Builder, ErrorMap, RateLimitError, ExternalApiError } from '@callsy/http-kit'

const errorMap = new ErrorMap()
  .withError(RateLimitError, [429])
  .withError(ExternalApiError, [500, 502, 503])
  .withDefault(ExternalApiError)

const httpClient = new Builder()
  .withDefaults({ baseURL: 'https://api.example.com' })
  .withRetry(3, 2000)
  .withCustomCacheTTL(60)
  .withErrorMapping(errorMap)
  .build()

// Use the client
const response = await httpClient.get('/endpoint')
```

### Error Mapping

Map external API errors to custom error classes:

```typescript
import { ErrorMap, RateLimitError, UnauthorizedError, ExternalApiError } from '@callsy/http-kit'

const errorMap = new ErrorMap()
  // Map by HTTP status code
  .withError(RateLimitError, [429])
  .withError(UnauthorizedError, [401, 403])

  // Map by error message substring
  .withError(RateLimitError, ['rate limit', 'too many requests'])

  // Extract error message from nested path
  .withCustomErrorPath('errors[0].detail')

  // Set shop context
  .withShop('my-shop.myshopify.com')

  // Set default fallback error
  .withDefault(ExternalApiError)
```

## Advanced Features

### Error Serialization

Errors can be serialized to JSON for API responses:

```typescript
const error = new InvalidInputError({ message: 'Invalid data' })
const serialized = error.toObject()
// {
//   isCustomError: true,
//   name: 'InvalidInputError',
//   message: 'Invalid data',
//   title: 'Invalid Input',
//   description: '...',
//   httpCode: 400,
//   shop: null
// }
```

In development mode, `debugMessage` and `stackTrace` are included automatically.

### Builder Features

- **Caching**: Built-in memory cache with configurable TTL
- **Retry Logic**: Automatic retry for network errors, 5xx errors, 429, and 408
- **Test Safety**: Blocks HTTP requests during tests (except to mock-server)
- **Error Mapping**: Transform Axios errors to custom errors automatically

## TypeScript

Full TypeScript support with type definitions included.

```typescript
import type { JsonDict, CustomErrorProps } from '@callsy/http-kit'
```

## License

ISC
