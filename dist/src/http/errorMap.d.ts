import { AxiosError } from "axios";
import CustomError, { CustomErrorProps } from "../errors/customError";
type ErrorConstructor = new (props?: CustomErrorProps) => CustomError;
type ErrorMapping = {
    error: ErrorConstructor;
    triggers: (number | string)[];
};
export default class ErrorMap {
    private __shop?;
    private __mappings;
    private __defaultError;
    private __customErrorPath;
    constructor(initialMappings?: ErrorMapping[]);
    get shop(): string | null;
    get mappings(): ErrorMapping[];
    get defaultError(): ErrorConstructor | null;
    get customErrorPath(): string | null;
    /**
     * Adds a new rule to the error map.
     *
     * @param error The custom error class to be thrown.
     * @param triggers An array of status codes or strings to check for.
     */
    withError(error: ErrorConstructor, triggers: (number | string)[]): this;
    /**
     * Sets a default fallback error to be thrown if no other rules match.
     *
     * @param error The default custom error class to be thrown.
     */
    withDefault(error: ErrorConstructor): this;
    /**
     * Sets a custom path to find the error message within a JSON response body.
     *
     * @param path A dot-notation string, e.g., 'errors[0].detail'.
     */
    withCustomErrorPath(path: string): this;
    /**
     * Sets a shop variable which will be passed when constructing an exception.
     *
     * @param shop A shop for which the error has occurred.
     */
    withShop(shop: string | undefined): this;
    /** Matches a custom error against AxiosError. */
    match(error: AxiosError): CustomError | null;
}
export {};
//# sourceMappingURL=errorMap.d.ts.map