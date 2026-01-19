"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMap = exports.Builder = exports.InitiateCallFailed = exports.MaintenanceModeError = exports.ShopMismatchError = exports.ResourceDoesNotExistError = exports.NotEnoughAvailableCallsError = exports.MisconfiguredError = exports.GenericError = exports.NotAllowedError = exports.RequiredValueError = exports.UnauthorizedError = exports.RateLimitError = exports.ExternalApiError = exports.InvalidInputError = exports.CustomError = void 0;
// Error classes
var customError_1 = require("./src/errors/customError");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return __importDefault(customError_1).default; } });
var invalidInputError_1 = require("./src/errors/invalidInputError");
Object.defineProperty(exports, "InvalidInputError", { enumerable: true, get: function () { return __importDefault(invalidInputError_1).default; } });
var externalApiError_1 = require("./src/errors/externalApiError");
Object.defineProperty(exports, "ExternalApiError", { enumerable: true, get: function () { return __importDefault(externalApiError_1).default; } });
var rateLimitError_1 = require("./src/errors/rateLimitError");
Object.defineProperty(exports, "RateLimitError", { enumerable: true, get: function () { return __importDefault(rateLimitError_1).default; } });
var unauthorizedError_1 = require("./src/errors/unauthorizedError");
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return __importDefault(unauthorizedError_1).default; } });
var requiredValueError_1 = require("./src/errors/requiredValueError");
Object.defineProperty(exports, "RequiredValueError", { enumerable: true, get: function () { return __importDefault(requiredValueError_1).default; } });
var notAllowedError_1 = require("./src/errors/notAllowedError");
Object.defineProperty(exports, "NotAllowedError", { enumerable: true, get: function () { return __importDefault(notAllowedError_1).default; } });
var genericError_1 = require("./src/errors/genericError");
Object.defineProperty(exports, "GenericError", { enumerable: true, get: function () { return __importDefault(genericError_1).default; } });
var misconfiguredError_1 = require("./src/errors/misconfiguredError");
Object.defineProperty(exports, "MisconfiguredError", { enumerable: true, get: function () { return __importDefault(misconfiguredError_1).default; } });
var notEnoughAvailableCallsError_1 = require("./src/errors/notEnoughAvailableCallsError");
Object.defineProperty(exports, "NotEnoughAvailableCallsError", { enumerable: true, get: function () { return __importDefault(notEnoughAvailableCallsError_1).default; } });
var resourceDoesNotExistError_1 = require("./src/errors/resourceDoesNotExistError");
Object.defineProperty(exports, "ResourceDoesNotExistError", { enumerable: true, get: function () { return __importDefault(resourceDoesNotExistError_1).default; } });
var shopMismatchError_1 = require("./src/errors/shopMismatchError");
Object.defineProperty(exports, "ShopMismatchError", { enumerable: true, get: function () { return __importDefault(shopMismatchError_1).default; } });
var maintenanceModeError_1 = require("./src/errors/maintenanceModeError");
Object.defineProperty(exports, "MaintenanceModeError", { enumerable: true, get: function () { return __importDefault(maintenanceModeError_1).default; } });
var initiateCallFailed_1 = require("./src/errors/initiateCallFailed");
Object.defineProperty(exports, "InitiateCallFailed", { enumerable: true, get: function () { return __importDefault(initiateCallFailed_1).default; } });
// HTTP utilities
var builder_1 = require("./src/http/builder");
Object.defineProperty(exports, "Builder", { enumerable: true, get: function () { return __importDefault(builder_1).default; } });
var errorMap_1 = require("./src/http/errorMap");
Object.defineProperty(exports, "ErrorMap", { enumerable: true, get: function () { return __importDefault(errorMap_1).default; } });
//# sourceMappingURL=index.js.map