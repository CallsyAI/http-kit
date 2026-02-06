/**
 * Normalizes binary response data to a parsed JSON object.
 * Handles both Node.js (Buffer) and browser (ArrayBuffer) environments.
 */
export function normalizeBinaryData(data: unknown): unknown {
  // Node.js: Buffer.
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
    try {
      return JSON.parse(data.toString("utf-8"))
    } catch {
      return data
    }
  }

  // Browser: ArrayBuffer.
  if (data instanceof ArrayBuffer) {
    try {
      return JSON.parse(new TextDecoder().decode(data))
    } catch {
      return data
    }
  }

  return data
}
