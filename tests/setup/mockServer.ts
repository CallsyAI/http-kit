import {http, HttpResponse} from 'msw'
import {setupServer} from "msw/node"

const httpMethods = ["get", "post", "put", "patch", "delete"] as const

// A list of functions that reset request counters for a particular endpoint.
const resetFunctions: (() => void)[] = []

// Counter for intermittent endpoint.
let intermittentCount = 0

/**
 * Dynamically creates a list of endpoints (get, post, delete, etc...) that return a predetermined
 * http code and some other additional info, for example, how many times the endpoint was called.
 */
const createEndpoint = (url: string, status: number) => {
  let count = 0

  // Add reset function for this endpoint.
  resetFunctions.push(() => {
    count = 0
  })

  return httpMethods.map(method =>
    http[method](url, () => {
      count++
      return HttpResponse.json({count}, {status})
    })
  )
}

export const handlers = [
  ...createEndpoint(`https://mock-server/expect/status/200`, 200),
  ...createEndpoint(`https://mock-server/expect/status/201`, 201),
  ...createEndpoint(`https://mock-server/expect/status/203`, 203),
  ...createEndpoint(`https://mock-server/expect/status/204`, 204),
  ...createEndpoint(`https://mock-server/expect/status/301`, 301),
  ...createEndpoint(`https://mock-server/expect/status/400`, 400),
  ...createEndpoint(`https://mock-server/expect/status/404`, 404),
  ...createEndpoint(`https://mock-server/expect/status/408`, 408),
  ...createEndpoint(`https://mock-server/expect/status/429`, 429),
  ...createEndpoint(`https://mock-server/expect/status/500`, 500),
  ...createEndpoint(`https://mock-server/expect/status/501`, 501),
  ...createEndpoint(`https://mock-server/expect/status/502`, 502),
  ...createEndpoint(`https://mock-server/expect/status/999`, 999),

  // Non-JSON response.
  http.get('https://mock-server/non-json', () =>
    new Response('Plain text response', {status: 200, headers: {'content-type': 'text/plain'}})
  ),

  // Empty body.
  http.get('https://mock-server/empty-body', () =>
    new Response('', {status: 200})
  ),

  // Nested error structure.
  http.get('https://mock-server/nested-error', () =>
    HttpResponse.json({data: {errors: [{message: 'Nested error message'}]}}, {status: 400})
  ),

  // Deep nested error structure.
  http.get('https://mock-server/deep-nested-error', () =>
    HttpResponse.json({deeply: {nested: {error: {text: 'Deep nested error'}}}}, {status: 400})
  ),

  // Error with only message field.
  http.get('https://mock-server/message-only', () =>
    HttpResponse.json({message: 'Message only error'}, {status: 400})
  ),

  // Error with only error field.
  http.get('https://mock-server/error-only', () =>
    HttpResponse.json({error: 'Error only message'}, {status: 400})
  ),

  // Intermittent failure (fails 2x then succeeds).
  http.get('https://mock-server/intermittent', () => {
    intermittentCount++
    if (intermittentCount <= 2) {
      return HttpResponse.json({error: 'Temporary failure'}, {status: 500})
    }
    return HttpResponse.json({success: true, count: intermittentCount}, {status: 200})
  }),

  // Timeout endpoint (delays 5 seconds).
  http.get('https://mock-server/expect/timeout', async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
    return HttpResponse.json({message: 'Delayed response'}, {status: 200})
  }),

  // Nested error with errors[0].detail structure for custom path testing.
  http.get('https://mock-server/nested-error/400', () =>
    HttpResponse.json({errors: [{detail: 'nested detail message'}]}, {status: 400})
  ),

  // Echo headers endpoint.
  http.get('https://mock-server/echo-headers', ({request}) => {
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headers[key] = value
    })
    return HttpResponse.json({headers}, {status: 200})
  }),

  // Delay endpoint with parameterized delay.
  http.get('https://mock-server/delay/:ms', async ({params}) => {
    const ms = parseInt(params.ms as string, 10)
    await new Promise(resolve => setTimeout(resolve, ms))
    return HttpResponse.json({delayed: ms}, {status: 200})
  }),

  // Echo auth endpoint.
  http.get('https://mock-server/echo-auth', ({request}) => {
    const authHeader = request.headers.get('authorization')
    return HttpResponse.json({auth: authHeader || null}, {status: 200})
  }),

  // 301 redirect endpoint.
  http.get('https://mock-server/redirect/301', () =>
    new Response(null, {
      status: 301,
      headers: {'Location': 'https://mock-server/expect/status/200'}
    })
  )
]

/** Resets all count counters to endpoints. Should run after or before each test. */
export const resetAllCounters = () => {
  resetFunctions.forEach(resetFn => resetFn())
  intermittentCount = 0
}

const mockServer = setupServer(...handlers)
export default mockServer
