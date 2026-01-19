"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
/**
 * An error that explicitly tells that some given value was
 * not supposed to be null / undefined or falsy in general.
 */
class RequiredValueError extends customError_1.default {
    constructor(props) {
        super({
            name: "RequiredValueError",
            message: "Value can not be empty.",
            title: "Provided value is empty",
            description: "The provided value was empty, but it can not be empty. Please check your input and try again.",
            httpCode: 400,
            ...props
        });
    }
}
exports.default = RequiredValueError;
//# sourceMappingURL=requiredValueError.js.map