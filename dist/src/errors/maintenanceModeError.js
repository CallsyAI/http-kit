"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
class MaintenanceModeError extends customError_1.default {
    constructor(props) {
        super({
            name: "MaintenanceModeError",
            message: "We're currently performing scheduled maintenance. Please try again shortly.",
            title: "Maintenance Mode",
            description: "The application is temporarily unavailable due to scheduled maintenance.",
            httpCode: 503,
            ...props
        });
    }
}
exports.default = MaintenanceModeError;
//# sourceMappingURL=maintenanceModeError.js.map