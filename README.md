# @callsy/http-kit

A powerful and fluent HTTP client toolkit for Node.js, built on top of Axios. It simplifies creating robust and resilient HTTP clients with built-in caching, automatic retries, and intelligent error handling.

## Features

- **Fluent Builder**: A clean, chainable API for constructing `axios` instances.
- **Smart Error Handling**: Automatically map HTTP error responses to custom, serializable error classes.
- **Automatic Retries**: Built-in, configurable retry mechanism for transient network and server errors.
- **Request Caching**: Out-of-the-box caching for `GET` requests to improve performance.
- **TypeScript Ready**: Fully typed for a great developer experience.

## Installation

```bash
npm install @callsy/http-kit
```

## Quick Start

Create a configured client, make a request, and automatically catch a typed, custom error.

```typescript
import {
  Builder,
  ErrorMap,
  ExternalApiError,
  InvalidInputError,
  CustomError
} from '@callsy/http-kit';

// 1. Define how errors should be mapped
const errorMap = new ErrorMap()
  .withError(InvalidInputError, [400]) // Map 400 status to InvalidInputError
  .withDefault(ExternalApiError); // Use ExternalApiError for all other errors

// 2. Build a new HTTP client instance
const httpClient = new Builder()
  .withDefaults({ baseURL: 'https://api.example.com' })
  .withRetry(3) // Retry failed requests up to 3 times
  .withCache(60) // Cache GET requests for 60 seconds
  .withErrorMapping(errorMap)
  .build();

// 3. Use the client and handle errors
async function getUser(id: string) {
  try {
    const response = await httpClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (CustomError.isError(error)) {
      // 'error' is now a typed CustomError instance (e.g., InvalidInputError)
      console.error(error.getTitle()); // "Bad Request"
      console.error(error.getMessage()); // "The server cannot process the request..."
      // You can now handle the specific error type
    } else {
      // Handle non-custom errors (e.g., network issues)
      console.error('An unknown error occurred', error);
    }
  }
}
```

## Core Concepts

### The Fluent Builder

The `Builder` provides a clean, chainable API to construct your `axios` client.

- `.withDefaults({ ... })`: Sets default `axios` request configuration (e.g., `baseURL`, `headers`, `timeout`).
- `.withRetry(retries, delay)`: Enables automatic retries for failed requests. Retries on network errors, 5xx status codes, 408 (Request Timeout), and 429 (Too Many Requests).
- `.withCache(ttlSeconds)`: Enables in-memory caching for `GET` requests with a specified Time-To-Live.
- `.withErrorMapping(errorMap)`: Attaches an `ErrorMap` to translate HTTP errors into custom error classes.

### Advanced Error Handling with ErrorMap

The `ErrorMap` gives you fine-grained control over how errors are translated.

```typescript
import { ErrorMap, RateLimitError, UnauthorizedError, ExternalApiError, GenericError } from '@callsy/http-kit';

const errorMap = new ErrorMap()
  // Map by HTTP status code
  .withError(UnauthorizedError, [401, 403])

  // Map by a substring in the response body
  .withError(RateLimitError, ['rate limit', 'too many requests'])

  // Extract a specific error message from a nested path in the JSON response
  .withCustomErrorPath('errors[0].detail')

  // Set a default fallback error for any unhandled cases
  .withDefault(ExternalApiError);
```

### Error Serialization

A key feature of `@callsy/http-kit` is the ability to serialize custom errors to plain objects and deserialize them back into class instances. This is incredibly useful for passing errors between services or from your backend to your frontend.

**Serializing an Error to an Object:**

```typescript
import { ResourceDoesNotExistError } from '@callsy/http-kit';

const error = new ResourceDoesNotExistError({ message: 'User not found' });

// The .toObject() method converts the error into a plain object.
const errorObject = error.toObject();
/*
{
  isCustomError: true,
  name: 'ResourceDoesNotExistError',
  message: 'User not found',
  title: 'Resource does not exist',
  description: 'The requested resource could not be found.',
  httpCode: 404,
  isCritical: false
}
*/
```

**Deserializing an Object back into an Error:**

Use the static `fromObject` method to reconstruct the error.

```typescript
import { CustomError } from '@callsy/http-kit';

// Assume 'errorObject' is from an API response
const errorInstance = CustomError.fromObject(errorObject);

if (errorInstance) {
  // errorInstance is now a fully-functional ResourceDoesNotExistError instance
  console.log(errorInstance instanceof ResourceDoesNotExistError); // true
  throw errorInstance;
}
```

You can also safely check and throw the error in one go:

```typescript
// Throws a fully reconstructed error if the object is a custom error
CustomError.throwIfError(apiResponse);
```

### Available Error Classes

The library includes a set of pre-defined, semantic error classes for common HTTP scenarios:

- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `PaymentRequiredError` (402)
- `ForbiddenError` (403)
- `ResourceDoesNotExistError` (404)
- `MethodNotAllowedError` (405)
- `NotAcceptableError` (406)
- `RequestTimeoutError` (408)
- `ConflictError` (409)
- `GoneError` (410)
- `RateLimitError` (429)
- `UnprocessableEntityError` (422)
- `ExternalApiError` (424)
- `GenericError` (500)
- `NotImplementedError` (501)
- `BadGatewayError` (502)
- `GatewayTimeoutError` (504)
- `MaintenanceModeError` (503)

And utility errors:
- `CustomError` (Base class)
- `InvalidInputError`
- `RequiredValueError`
- `MisconfiguredError`
- `NotAllowedError`

## License

ISC