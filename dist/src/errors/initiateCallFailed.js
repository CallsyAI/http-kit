"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class InitiateCallFailed extends customError_1.default {
    constructor(props) {
        super({
            name: "InitiateCallFailed",
            message: "Failed to initiate call(s).",
            title: "Initiating calls failed! 📞",
            description: "Failed to initiate calls for recoveries.",
            httpCode: 500,
            ...props
        });
    }
}
exports.default = InitiateCallFailed;
//# sourceMappingURL=initiateCallFailed.js.map