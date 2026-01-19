"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class MisconfiguredError extends customError_1.default {
    constructor(props) {
        super({
            name: "MisconfiguredError",
            message: "It looks like something is misconfigured.",
            title: "Something is not entirely right with the application! 🤔",
            description: "An internal error was detected due to some unexpected misconfiguration. This error should be shared with the support team.",
            httpCode: 400,
            ...props
        });
    }
}
exports.default = MisconfiguredError;
//# sourceMappingURL=misconfiguredError.js.map