"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class ExternalApiError extends customError_1.default {
    constructor(props) {
        super({
            name: "ExternalApiError",
            message: "An error happened when calling an external api.",
            title: "External system error",
            description: "There was an internal error due to an error from an external API.",
            httpCode: 424,
            ...props
        });
    }
}
exports.default = ExternalApiError;
//# sourceMappingURL=externalApiError.js.map