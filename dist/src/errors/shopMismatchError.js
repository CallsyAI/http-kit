"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class ShopMismatchError extends customError_1.default {
    constructor(props) {
        super({
            name: "ShopMismatchError",
            message: "Shop mismatch. This should not happen. Please contact support.",
            title: "Shop mismatch! 💥",
            description: "The shop linked to this resource doesn't match the shop where the request is coming from.",
            httpCode: 500,
            ...props
        });
    }
}
exports.default = ShopMismatchError;
//# sourceMappingURL=shopMismatchError.js.map