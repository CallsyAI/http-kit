import {AxiosError} from "axios"
import {getProperty} from "dot-prop"
import CustomError, {CustomErrorProps} from "../errors/customError"

type ErrorConstructor = new (props?: CustomErrorProps) => CustomError
type ErrorMapping = { error: ErrorConstructor, triggers: (number | string)[] }

export default class ErrorMap {
  private __mappings: ErrorMapping[] = []
  private __defaultError: ErrorConstructor | null = null
  private __customErrorPath: string | null = null
  private __callback: ((error: CustomError) => void) | null = null

  public constructor(initialMappings?: ErrorMapping[]) {
    if (initialMappings) {
      this.__mappings = [...initialMappings]
    }
  }

  public get mappings(): ErrorMapping[] {
    return this.__mappings
  }

  public get defaultError(): ErrorConstructor | null {
    return this.__defaultError
  }

  public get customErrorPath(): string | null {
    return this.__customErrorPath
  }

  /**
   * Adds a new rule to the error map.
   *
   * @param error The custom error class to be thrown.
   * @param triggers An array of status codes or strings to check for.
   */
  public withError(error: ErrorConstructor, triggers: (number | string)[]): this {
    this.__mappings.push({error, triggers})
    return this
  }

  /**
   * Sets a default fallback error to be thrown if no other rules match.
   *
   * @param error The default custom error class to be thrown.
   */
  public withDefault(error: ErrorConstructor): this {
    this.__defaultError = error
    return this
  }

  /**
   * Sets a custom path to find the error message within a JSON response body.
   *
   * @param path A dot-notation string, e.g., 'errors[0].detail'.
   */
  public withCustomErrorPath(path: string): this {
    this.__customErrorPath = path
    return this
  }

  /**
   * Executes a custom function when an error match was found.
   */
  public withMatchEvent(callback: (error: CustomError) => void): this {
    this.__callback = callback
    return this
  }

  /** Matches a custom error against AxiosError. */
  public match(error: AxiosError): CustomError | null {
    if (!error.response) {
      return null
    }

    const {status, data} = error.response

    // 1. Determine the final error message with a clear order of precedence.
    const nestedMessage = getProperty(data, this.customErrorPath || '')
    const originalErrorMessage = String(nestedMessage || (data as any)?.error || (data as any)?.message || error.message)
    const tmpErrorMessage = originalErrorMessage.toLowerCase().trim()

    // 2. Check specific mappings for a match.
    for (const mapping of this.mappings) {
      for (const trigger of mapping.triggers) {
        let match = false
        if (typeof trigger === 'number') {
          match = trigger === status
        } else if (typeof trigger === 'string') {
          const cleanTrigger = trigger.toLowerCase().trim()
          match = tmpErrorMessage.includes(cleanTrigger)
        }

        if (match) {
          // Found a match, return a new instance of the corresponding error.
          const matchedError = new mapping.error({message: originalErrorMessage})
          if (this.__callback) this.__callback(matchedError)
          return matchedError
        }
      }
    }

    // 3. If no specific mappings matched, use the default error if it exists.
    if (this.defaultError) {
      return new this.defaultError({message: originalErrorMessage})
    }

    // 4. If nothing matches, return null to indicate no custom error was found.
    return null
  }
}
