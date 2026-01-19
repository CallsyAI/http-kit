export declare function sortNumbers(a: string, b: string): 1 | -1;
export declare function sortPairsByKey(a: [unknown, unknown], b: [unknown, unknown]): 1 | -1;
/**
 * Fast mixing using DJB2-style algorithm with XOR. Bitwise operations are much faster
 * than modulo.
 */
export declare function mix(h: number, value: number): number;
/**
 * Normalizes special numeric values to prevent collisions. Returns a safe integer
 * representation.
 */
export declare function normalizeNumber(val: number): number;
//# sourceMappingURL=util.d.ts.map