import { JsonDict } from "../util/types";
export interface CustomErrorProps {
    name?: string;
    message?: string;
    title?: string;
    description?: string;
    httpCode?: number;
    isCritical?: boolean;
    debugMessage?: string;
    shop?: string;
}
export default class CustomError extends Error {
    readonly isCustomError: boolean;
    protected title: string;
    protected description: string;
    protected httpCode: number;
    protected isCritical: boolean;
    protected debugMessage: string | null;
    protected shop: string | null;
    constructor(props?: CustomErrorProps);
    getName(): string;
    setName(name: string): CustomError;
    getMessage(): string;
    setMessage(message: string): CustomError;
    getTitle(): string;
    setTitle(title: string): CustomError;
    getDescription(): string;
    setDescription(description: string): CustomError;
    getHttpCode(): number;
    setHttpCode(code: number): CustomError;
    getDebugMessage(): string | null;
    setDebugMessage(message: string): CustomError;
    getShop(): string | null;
    setShop(shopName: string): CustomError;
    getStackTrace(): string[];
    /**
     * Serialises the whole error instance into an object.
     */
    toObject(): JsonDict;
    static fromObject(obj: JsonDict): CustomError | null;
    static isError(obj?: JsonDict | null): boolean;
    static throwIfError(obj?: JsonDict | null): void;
}
//# sourceMappingURL=customError.d.ts.map