import CustomError, { CustomErrorProps } from "./customError";
interface InvalidInputErrorProps extends CustomErrorProps {
    invalidFields?: Record<string, string>;
}
export default class InvalidInputError extends CustomError {
    private invalidFields?;
    constructor(props?: InvalidInputErrorProps);
    getInvalidFields(): Record<string, string>;
    toObject(): {
        invalidFields: Record<string, string>;
    };
}
export {};
//# sourceMappingURL=invalidInputError.d.ts.map