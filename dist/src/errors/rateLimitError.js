"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class RateLimitError extends customError_1.default {
    constructor(props) {
        super({
            name: "RateLimitError",
            message: "Rate limit reached. Please try again later.",
            title: "Too many requests",
            description: "You tried to do this action too many times. Please wait and try again later.",
            httpCode: 429,
            ...props
        });
    }
}
exports.default = RateLimitError;
//# sourceMappingURL=rateLimitError.js.map