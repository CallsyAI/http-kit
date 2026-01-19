import type { CompareHeaders, VaryHeader } from './types';
/**
 * Checks if {@linkcode source} and {@linkcode target} headers are equivalent for the given
 * Vary header, as per
 * {@link https://www.rfc-editor.org/rfc/rfc9110.html#name-vary RFC 9110 Section 12.5.5}.
 *
 * This function determines if two requests would receive the same cached response based
 * on the Vary header requirements.
 *
 * @remarks
 * - Returns `false` for wildcard vary (`'*'`) as responses always differ
 * - Header name matching is case-insensitive (per RFC 9110)
 * - Missing headers are treated as `undefined`
 * - String values are trimmed before comparison
 * - Array values are converted to strings via `.toString()`
 * - Uses loose equality (!=) for comparison
 * - Empty strings are distinct from missing headers
 *
 * @example
 *
 * ```ts
 * const vary = ['accept-encoding', 'user-agent'];
 * const headers1 = { 'Accept-Encoding': 'gzip', 'User-Agent': 'Chrome' };
 * const headers2 = { 'Accept-Encoding': 'gzip', 'User-Agent': 'Chrome' };
 *
 * compare(vary, headers1, headers2);
 * // => true
 * ```
 *
 * @param {VaryHeader | null} vary - The Vary header specifying which fields to compare
 * @param {CompareHeaders} source - The first set of request headers
 * @param {CompareHeaders} target - The second set of request headers
 * @returns {boolean} `true` if the headers are equivalent for the given Vary header,
 *   `false` otherwise
 */
export declare function compare(vary: VaryHeader | null, source: CompareHeaders, target: CompareHeaders): boolean;
//# sourceMappingURL=compare.d.ts.map