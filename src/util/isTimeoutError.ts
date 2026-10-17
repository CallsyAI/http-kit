import {AxiosError} from "axios"

// Error codes of a request that timed out.
const TIMEOUT_CODES: string[] = [AxiosError.ECONNABORTED, AxiosError.ETIMEDOUT]

/**
 * Checks whether the error is from a request that timed out.
 */
export function isTimeoutError(error: AxiosError): boolean {
  return !!error.code && TIMEOUT_CODES.includes(error.code)
}
