import axios, {AxiosError, AxiosRequestConfig, CreateAxiosDefaults} from 'axios'
import axiosRetry, {IAxiosRetryConfig} from 'axios-retry'
import {AxiosCacheInstance, buildMemoryStorage, CacheOptions, setupCache} from 'axios-cache-interceptor'
import ErrorMap from "./errorMap"

export const sharedCache = buildMemoryStorage("double")

export default class Builder {
  private axiosConfig: CreateAxiosDefaults = {}
  private cacheConfig: CacheOptions = {ttl: 0, storage: sharedCache, enabled: false}
  private retryConfig: IAxiosRetryConfig | null = null
  private errorMap: ErrorMap | null = null

  public withDefaults(config: CreateAxiosDefaults = {}): this {
    this.axiosConfig = {...config}
    return this
  }

  public withRetry(retries: number = 3, retryDelayMultiplier: number = 2000): this {
    this.retryConfig = {
      retries,
      onRetry: (retryCount: number, error: AxiosError, requestConfig: AxiosRequestConfig) => {
        console.warn(`Retrying failed HTTP (${error.response?.status}) request to ${requestConfig.method} ${requestConfig.url}. Retry attempt: ${retryCount}. Failure message: ${error.message}.`)
        return
      },
      retryDelay: (retryCount) => {
        return retryCount * retryDelayMultiplier
      },
      retryCondition: (error: AxiosError) => {
        const networkError = axiosRetry.isNetworkOrIdempotentRequestError(error)
        const serverError = !!error.response && error.response.status >= 500 && error.response.status < 600
        const rateLimited = !!error.response && error.response.status === 429
        const timeout = !!error.response && error.response.status === 408
        return networkError || serverError || rateLimited || timeout
      },
    }
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
      axiosRetry(instance, this.retryConfig)
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
