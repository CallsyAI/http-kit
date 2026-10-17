import {AxiosError} from "axios"

// Error codes of a request that timed out.
const TIMEOUT_CODES = ["ECONNABORTED", "ETIMEDOUT"]

/**
 * Checks whether the error is a request that timed out.
 */
export function isTimeout(error: AxiosError): boolean {
  return !!error.code && TIMEOUT_CODES.includes(error.code)
}
