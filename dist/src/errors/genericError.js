"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class GenericError extends customError_1.default {
    constructor(props) {
        super({
            name: "GenericError",
            message: "Unknown error occurred.",
            title: "Generic unknown error occurred! 🥸",
            description: "An unknown error happened. Please contact support or try refreshing the page and trying again.",
            httpCode: 500,
            ...props
        });
    }
}
exports.default = GenericError;
//# sourceMappingURL=genericError.js.map