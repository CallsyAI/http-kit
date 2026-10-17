import {AxiosError} from "axios"

// Request methods that are safe to send twice.
const IDEMPOTENT_METHODS = ["get", "head", "options", "put", "delete"]

/**
 * Checks whether the error is from a request with an idempotent method.
 */
export function isIdempotent(error: AxiosError): boolean {
  return !!error.config?.method && IDEMPOTENT_METHODS.includes(error.config.method)
}
