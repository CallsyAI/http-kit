import {AxiosError} from "axios"

// Request methods that have the same effect when sent twice.
const IDEMPOTENT_METHODS = ["get", "head", "options", "put", "delete"]

/**
 * Checks whether the error is from a request with an idempotent method.
 */
export function hasIdempotentMethod(error: AxiosError): boolean {
  return !!error.config?.method && IDEMPOTENT_METHODS.includes(error.config.method)
}
