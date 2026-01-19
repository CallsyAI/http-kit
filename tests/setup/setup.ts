import {sharedCache} from "../../src/http/builder"
import {afterEach, beforeEach, afterAll, beforeAll} from "vitest"
import mockServer, {resetAllCounters} from "./mockServer"

//-------------------------------
// Validate environment.
//-------------------------------

// Validate test environment configuration to prevent accidental production access.
if (process.env.NODE_ENV !== "test") {
  throw Error("Tests must run with NODE_ENV=test.")
}

//-------------------------------
// Register hooks.
//-------------------------------

beforeEach(async () => {
  // Reset the axios cache.
  const clearFunction = sharedCache.clear
  clearFunction?.()

  // Reset mock server counters.
  resetAllCounters()
})

afterEach(() => {
  // Reset mock-fake test server.
  mockServer.resetHandlers()
})

beforeAll(async () => {
  // Establish API mocking before all tests.
  mockServer.listen()
})

afterAll(async () => {
  // Clean up after the tests are finished.
  mockServer.close()
})
