"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class NotAllowedError extends customError_1.default {
    constructor(props) {
        super({
            name: "NotAllowedError",
            message: "You are not allowed to do this action.",
            title: "You are not allowed to do this action! 🛑",
            description: "You lack the permissions to do this action.",
            httpCode: 405,
            ...props
        });
    }
}
exports.default = NotAllowedError;
//# sourceMappingURL=notAllowedError.js.map