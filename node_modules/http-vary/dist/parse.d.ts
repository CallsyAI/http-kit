import type { VaryHeader } from './types';
/**
 * Parses the Vary header as defined in
 * {@link https://www.rfc-editor.org/rfc/rfc9110.html#name-vary RFC 9110 Section 12.5.5}.
 *
 * The Vary header indicates which request headers a server considers when selecting or
 * generating a response, enabling proper HTTP caching behavior.
 *
 * @remarks
 * - Header field names are normalized to lowercase
 * - Duplicate fields are automatically deduplicated
 * - Invalid header names (per RFC 9110) are silently skipped
 * - If the header contains `'*'`, the function returns `'*'` (wildcard)
 * - Returns `null` for invalid input or when no valid fields are found
 *
 * @example
 *
 * ```ts
 * parse('Accept-Encoding, User-Agent');
 * // => ['accept-encoding', 'user-agent']
 *
 * parse('*');
 * // => '*'
 *
 * parse('Invalid Header!');
 * // => null
 * ```
 *
 * @param {string} headerStr - The Vary header value to parse (e.g., "Accept-Encoding,
 *   User-Agent")
 * @param {number} [maxLength=16] - Maximum number of header fields to parse for DoS
 *   protection. Default is `16`
 * @returns {VaryHeader | null} The parsed Vary header as an array of lowercase field
 *   names, `'*'` for wildcard, or `null` if invalid.
 */
export declare function parse(headerStr?: string, maxLength?: number): VaryHeader | null;
//# sourceMappingURL=parse.d.ts.map