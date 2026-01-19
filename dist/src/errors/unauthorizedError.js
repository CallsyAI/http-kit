"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class UnauthorizedError extends customError_1.default {
    constructor(props) {
        super({
            name: "UnauthorizedError",
            message: "Authentication required.",
            title: "Authentication required! 🔒",
            description: "You must provide valid authentication credentials to access this resource.",
            httpCode: 401,
            ...props
        });
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=unauthorizedError.js.map