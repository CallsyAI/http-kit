"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dot_prop_1 = require("dot-prop");
class ErrorMap {
    constructor(initialMappings) {
        this.__mappings = [];
        this.__defaultError = null;
        this.__customErrorPath = null;
        if (initialMappings) {
            this.__mappings = [...initialMappings];
        }
    }
    get shop() {
        return this.__shop || null;
    }
    get mappings() {
        return this.__mappings;
    }
    get defaultError() {
        return this.__defaultError;
    }
    get customErrorPath() {
        return this.__customErrorPath;
    }
    /**
     * Adds a new rule to the error map.
     *
     * @param error The custom error class to be thrown.
     * @param triggers An array of status codes or strings to check for.
     */
    withError(error, triggers) {
        this.__mappings.push({ error, triggers });
        return this;
    }
    /**
     * Sets a default fallback error to be thrown if no other rules match.
     *
     * @param error The default custom error class to be thrown.
     */
    withDefault(error) {
        this.__defaultError = error;
        return this;
    }
    /**
     * Sets a custom path to find the error message within a JSON response body.
     *
     * @param path A dot-notation string, e.g., 'errors[0].detail'.
     */
    withCustomErrorPath(path) {
        this.__customErrorPath = path;
        return this;
    }
    /**
     * Sets a shop variable which will be passed when constructing an exception.
     *
     * @param shop A shop for which the error has occurred.
     */
    withShop(shop) {
        this.__shop = shop;
        return this;
    }
    /** Matches a custom error against AxiosError. */
    match(error) {
        if (!error.response) {
            return null;
        }
        const { status, data } = error.response;
        // 1. Determine the final error message with a clear order of precedence.
        const nestedMessage = (0, dot_prop_1.getProperty)(data, this.customErrorPath || '');
        const originalErrorMessage = String(nestedMessage || data?.error || data?.message || error.message);
        const tmpErrorMessage = originalErrorMessage.toLowerCase().trim();
        // 2. Check specific mappings for a match.
        for (const mapping of this.mappings) {
            for (const trigger of mapping.triggers) {
                let match = false;
                if (typeof trigger === 'number') {
                    match = trigger === status;
                }
                else if (typeof trigger === 'string') {
                    const cleanTrigger = trigger.toLowerCase().trim();
                    match = tmpErrorMessage.includes(cleanTrigger);
                }
                if (match) {
                    // Found a match, return a new instance of the corresponding error.
                    return new mapping.error({ message: originalErrorMessage, shop: this.__shop });
                }
            }
        }
        // 3. If no specific mappings matched, use the default error if it exists.
        if (this.defaultError) {
            return new this.defaultError({ message: originalErrorMessage, shop: this.__shop });
        }
        // 4. If nothing matches, return null to indicate no custom error was found.
        return null;
    }
}
exports.default = ErrorMap;
//# sourceMappingURL=errorMap.js.map