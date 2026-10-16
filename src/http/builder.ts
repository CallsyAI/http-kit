import axios, {AxiosError, AxiosRequestConfig, CreateAxiosDefaults} from 'axios'
import axiosRetry, {IAxiosRetryConfig} from 'axios-retry'
import {AxiosCacheInstance, buildMemoryStorage, CacheOptions, setupCache} from 'axios-cache-interceptor'
import ErrorMap from "./errorMap.js"
import {isIdempotent} from "../util/isIdempotent.js"
import {isTimeout} from "../util/isTimeout.js"

export const sharedCache = buildMemoryStorage("double")

export default class Builder {
  private axiosConfig: CreateAxiosDefaults = {}
  private cacheConfig: CacheOptions = {ttl: 0, storage: sharedCache, enabled: false}
  private retryConfig: IAxiosRetryConfig | null = null
  private timeoutRetries: boolean = false
  private errorMap: ErrorMap | null = null

  public withDefaults(config: CreateAxiosDefaults = {}): this {
    this.axiosConfig = {...config}
    return this
  }

  /**
   * Retries requests that failed with a network error, a 5xx, a 408 or a 429.
   * With timeout retries on, a timed out request is retried only for an idempotent method.
   */
  public withRetry(retries: number = 3, retryDelayMultiplier: number = 2000): this {
    this.retryConfig = {
      retries,
      onRetry: (retryCount: number, error: AxiosError, requestConfig: AxiosRequestConfig) => {
        console.warn(`Retrying failed HTTP (${error.response?.status ?? error.code}) request to ${requestConfig.method} ${requestConfig.url}. Retry attempt: ${retryCount}. Failure message: ${error.message}.`)
        return
      },
      retryDelay: (retryCount) => {
        return retryCount * retryDelayMultiplier
      },
      retryCondition: (error: AxiosError) => {
        // A timed out write may already have reached the server.
        if (this.timeoutRetries && isTimeout(error)) return isIdempotent(error)

        const networkError = axiosRetry.isNetworkOrIdempotentRequestError(error)
        const serverError = !!error.response && error.response.status >= 500 && error.response.status < 600
        const rateLimited = !!error.response && error.response.status === 429
        const requestTimeout = !!error.response && error.response.status === 408
        return networkError || serverError || rateLimited || requestTimeout
      },
    }
    return this
  }

  /**
   * Retries timed out requests with an idempotent method.
   * A timed out POST or PATCH is not retried.
   * Every retry gets a fresh timeout.
   * Applies only together with withRetry.
   */
  public withTimeoutRetries(): this {
    this.timeoutRetries = true
    return this
  }

  public withCache(ttlSeconds: number = 10): this {
    this.cacheConfig.ttl = ttlSeconds * 1000
    this.cacheConfig.enabled = true
    return this
  }

  public withErrorMapping(map: ErrorMap): this {
    this.errorMap = map
    return this
  }

  public build(): AxiosCacheInstance {
    const instance = setupCache(axios.create(this.axiosConfig), this.cacheConfig)

    if (this.retryConfig) {
      axiosRetry(instance, {...this.retryConfig, shouldResetTimeout: this.timeoutRetries})
    }

    if (this.errorMap) {
      instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          // Match Axios error with a custom error.
          const customError = this.errorMap?.match(error)

          if (customError) {
            // A custom error was found and created, reject with it.
            return Promise.reject(customError)
          }

          // If match returned null, no mapping was found, so we
          // reject with the original Axios error as a fallback.
          return Promise.reject(error)
        }
      )
    }

    return instance
  }
}
