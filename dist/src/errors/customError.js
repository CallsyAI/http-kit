"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../util/error");
const environment_1 = require("../util/environment");
class CustomError extends Error {
    constructor(props) {
        const message = props?.message || "Custom error happened!";
        super(message);
        this.isCustomError = true;
        this.name = props?.name || "CustomError";
        this.message = message;
        this.title = props?.title || "Custom Error";
        this.description = props?.description || "Unspecific custom error occurred.";
        this.httpCode = props?.httpCode || 500;
        this.isCritical = props?.isCritical || true;
        this.debugMessage = props?.debugMessage || null;
        this.shop = props?.shop || null;
    }
    //-------------------------------
    // Name property.
    //-------------------------------
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    //-------------------------------
    // Message property.
    //-------------------------------
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    //-------------------------------
    // Title property.
    //-------------------------------
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    //-------------------------------
    // Description property.
    //-------------------------------
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    //-------------------------------
    // HTTP code property.
    //-------------------------------
    getHttpCode() {
        return this.httpCode;
    }
    setHttpCode(code) {
        this.httpCode = code;
        return this;
    }
    //-------------------------------
    // Debug message property.
    //-------------------------------
    getDebugMessage() {
        return this.debugMessage || null;
    }
    setDebugMessage(message) {
        this.debugMessage = message;
        return this;
    }
    //-------------------------------
    // Shop property.
    //-------------------------------
    getShop() {
        return this.shop || null;
    }
    setShop(shopName) {
        this.shop = shopName;
        return this;
    }
    //-------------------------------
    // Public methods.
    //-------------------------------
    getStackTrace() {
        return (0, error_1.getStackTrace)(this);
    }
    /**
     * Serialises the whole error instance into an object.
     */
    toObject() {
        const obj = {
            isCustomError: this.isCustomError,
            name: this.getName(),
            message: this.getMessage(),
            title: this.getTitle(),
            description: this.getDescription(),
            httpCode: this.getHttpCode(),
            shop: this.getShop(),
        };
        if ((0, environment_1.isDevelopment)()) {
            obj.debugMessage = this.getDebugMessage();
            obj.stackTrace = this.getStackTrace();
        }
        return obj;
    }
    static fromObject(obj) {
        if (!CustomError.isError(obj))
            return null;
        return new CustomError({
            name: obj.name ?? undefined,
            message: obj.message ?? undefined,
            title: obj.title ?? undefined,
            description: obj.description ?? undefined,
            httpCode: obj.httpCode ?? undefined,
            shop: obj.shop ?? undefined,
            debugMessage: obj.debugMessage ?? undefined
        });
    }
    static isError(obj) {
        return obj?.isCustomError === true;
    }
    static throwIfError(obj) {
        if (!obj) {
            return;
        }
        if (CustomError.isError(obj)) {
            throw CustomError.fromObject(obj);
        }
    }
}
exports.default = CustomError;
//# sourceMappingURL=customError.js.map