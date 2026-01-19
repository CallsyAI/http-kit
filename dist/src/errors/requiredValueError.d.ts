import CustomError, { CustomErrorProps } from "./customError";
/**
 * An error that explicitly tells that some given value was
 * not supposed to be null / undefined or falsy in general.
 */
export default class RequiredValueError extends CustomError {
    constructor(props?: CustomErrorProps);
}
//# sourceMappingURL=requiredValueError.d.ts.map