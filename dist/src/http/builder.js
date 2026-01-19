"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedCache = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const axios_cache_interceptor_1 = require("axios-cache-interceptor");
const externalApiError_1 = __importDefault(require("../errors/externalApiError"));
const environment_1 = require("../util/environment");
exports.sharedCache = (0, axios_cache_interceptor_1.buildMemoryStorage)("double");
class Builder {
    constructor() {
        this.axiosConfig = {};
        this.cacheConfig = { ttl: 1000, storage: exports.sharedCache };
        this.retryConfig = null;
        this.errorMap = null;
    }
    withDefaults(config = {}) {
        this.axiosConfig = { ...config };
        return this;
    }
    withRetry(retries = 3, retryDelayMultiplier = 2000) {
        this.retryConfig = {
            retries,
            onRetry: (retryCount, error, requestConfig) => {
                console.warn(`Retrying failed HTTP (${error.response?.status}) request to ${requestConfig.method} ${requestConfig.url}. Retry attempt: ${retryCount}. Failure message: ${error.message}.`);
                return;
            },
            retryDelay: (retryCount) => {
                return retryCount * retryDelayMultiplier;
            },
            retryCondition: (error) => {
                const networkError = axios_retry_1.default.isNetworkOrIdempotentRequestError(error);
                const serverError = !!error.response && error.response.status >= 500 && error.response.status < 600;
                const rateLimited = !!error.response && error.response.status === 429;
                const timeout = !!error.response && error.response.status === 408;
                return networkError || serverError || rateLimited || timeout;
            },
        };
        return this;
    }
    withCustomCacheTTL(ttlSeconds = 10) {
        this.cacheConfig.ttl = ttlSeconds * 1000;
        return this;
    }
    withErrorMapping(map) {
        this.errorMap = map;
        return this;
    }
    build() {
        const instance = (0, axios_cache_interceptor_1.setupCache)(axios_1.default.create(this.axiosConfig), this.cacheConfig);
        // That is a neat and nasty line at the same time. We check if the current environment is
        // testing (i.e. running tests). If this method is reached, it means some mock is missing.
        // We never want to send HTTP calls during tests, hence throw a blaring red error!
        // P.S. Vitest automatically sets process.env.NODE_ENV to "test" when running tests.
        // However, there is one exception, calling to "https://mock-server..." is allowed, because
        // we sometimes actually want to test HTTP calls.
        if ((0, environment_1.isTest)()) {
            instance.interceptors.request.use((config) => {
                if (config.url && !config.url.startsWith("https://mock-server")) {
                    throw new externalApiError_1.default({ message: `API call to "${config.method?.toUpperCase()} ${config.url}" blocked in test environment. Did you forget to mock this request?` });
                }
                return config;
            });
        }
        if (this.retryConfig) {
            (0, axios_retry_1.default)(instance, this.retryConfig);
        }
        if (this.errorMap) {
            instance.interceptors.response.use((response) => response, (error) => {
                // Match Axios error with a custom error.
                const customError = this.errorMap?.match(error);
                if (customError) {
                    // A custom error was found and created, reject with it.
                    return Promise.reject(customError);
                }
                // If match returned null, no mapping was found, so we
                // reject with the original Axios error as a fallback.
                return Promise.reject(error);
            });
        }
        return instance;
    }
}
exports.default = Builder;
//# sourceMappingURL=builder.js.map