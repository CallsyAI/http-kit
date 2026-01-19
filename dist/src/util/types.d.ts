/**
 * JSON-compatible primitives.
 */
export type JsonPrimitive = string | number | boolean | null | Date;
/**
 * Accurate JSON type representation.
 */
export type JsonDict = {
    [key: string]: JsonDict | JsonDict[] | JsonPrimitive | JsonPrimitive[];
};
//# sourceMappingURL=types.d.ts.map