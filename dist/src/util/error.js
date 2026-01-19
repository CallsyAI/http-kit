"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackTrace = getStackTrace;
/**
 * Gets a clean stack trace as a list of strings with cleaned up paths.
 */
function getStackTrace(error) {
    const stack = error.stack?.split(/\r?\n/).slice(1) ?? [];
    const cwd = process.cwd();
    return stack.map(line => {
        let cleaned = line.trim();
        // Remove absolute paths for a cleaner look.
        cleaned = cleaned.replace(cwd, "");
        // Remove "at" word at the beginning of each line for a cleaner look.
        cleaned = cleaned.replace(/^at\s+/, "");
        // Remove commas for a cleaner look.
        cleaned = cleaned.replace(",", "");
        // Remove the remaining white-spaces after the previous cleanup for a cleaner look.
        cleaned = cleaned.trim();
        return cleaned;
    }).filter(line => line.length > 0);
}
//# sourceMappingURL=error.js.map