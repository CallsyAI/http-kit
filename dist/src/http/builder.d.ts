import { CreateAxiosDefaults } from 'axios';
import { AxiosCacheInstance } from 'axios-cache-interceptor';
import ErrorMap from "./errorMap";
export declare const sharedCache: import("axios-cache-interceptor").MemoryStorage;
export default class Builder {
    private axiosConfig;
    private cacheConfig;
    private retryConfig;
    private errorMap;
    withDefaults(config?: CreateAxiosDefaults): this;
    withRetry(retries?: number, retryDelayMultiplier?: number): this;
    withCustomCacheTTL(ttlSeconds?: number): this;
    withErrorMapping(map: ErrorMap): this;
    build(): AxiosCacheInstance;
}
//# sourceMappingURL=builder.d.ts.map