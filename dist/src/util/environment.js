"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = getEnvironment;
exports.isProduction = isProduction;
exports.isDevelopment = isDevelopment;
exports.isTest = isTest;
function getEnvironment() {
    return process.env.NODE_ENV;
}
function isProduction() {
    return getEnvironment() === "production";
}
function isDevelopment() {
    return getEnvironment() === "development";
}
function isTest() {
    return getEnvironment() === "test";
}
//# sourceMappingURL=environment.js.map