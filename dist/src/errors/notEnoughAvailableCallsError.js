"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class NotEnoughAvailableCallsError extends customError_1.default {
    constructor(props) {
        super({
            name: "NotEnoughAvailableCallsError",
            message: "You don't have enough available calls to proceed.",
            title: "You're out of available calls! 🤙",
            description: "You have exceeded your available calls monthly limit.",
            httpCode: 400,
            ...props
        });
    }
}
exports.default = NotEnoughAvailableCallsError;
//# sourceMappingURL=notEnoughAvailableCallsError.js.map