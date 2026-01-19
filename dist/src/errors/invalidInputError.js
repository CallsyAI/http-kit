"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class InvalidInputError extends customError_1.default {
    constructor(props) {
        super({
            name: "InvalidInputError",
            message: "Invalid input.",
            title: "Oops! Some of the inputs are not correct! 🔤",
            description: "You have provided information that is not valid. Please check your input and try again.",
            httpCode: 400,
            ...props
        });
        this.invalidFields = {};
        this.invalidFields = props?.invalidFields;
    }
    getInvalidFields() {
        return this.invalidFields ?? {};
    }
    toObject() {
        return {
            ...super.toObject(),
            invalidFields: this.getInvalidFields()
        };
    }
}
exports.default = InvalidInputError;
//# sourceMappingURL=invalidInputError.js.map