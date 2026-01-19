"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class ResourceDoesNotExistError extends customError_1.default {
    constructor(props) {
        super({
            name: "ResourceDoesNotExistError",
            message: "Resource does not exist.",
            title: "The requested resource could not be found! 🫣",
            description: "You just requested a resource that is not (or no longer) in the system. Maybe it was recently deleted?",
            httpCode: 404,
            ...props
        });
    }
}
exports.default = ResourceDoesNotExistError;
//# sourceMappingURL=resourceDoesNotExistError.js.map