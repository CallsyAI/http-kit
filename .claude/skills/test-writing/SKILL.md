---
name: test-writing
description: Skill for writing and maintaining project tests. Use when user mentions anything related to tests (e.g. creating a new test or fixing an existing one), implementing mocks, or setting up testing infrastructure. The skill contains test signatures, mocking rules, isolation patterns, and coverage strategies.
---

# Test writing

## General

- Use `vitest` to run, write and configure tests.
- Use `npm run test` to run all tests.
- Vite config is defined in `vitest.config.ts`.
- Tests are set up by `tests/setup/setup.ts` file.

## Test signature

Use this format:

```
test("FUNC <function name> WITH <data and configs> EXPECT <what test expects to happen>", async () => {
```

- `<function name>` being the main function the test is testing. (Example, send).
- `<data and configs>` being with what parameters and context the function is called / tested. (Example, non-existing user).
- `<what test expects to happen>` being the expected output of a function call. (Example, error thrown).

## Test structure

### Easy to read
Ensure easy to read structure - it is better to duplicate and repeat code rather than implementing some clever but more complex code.

❌ Don't: Complex loops:
```typescript
test("FUNC fun WITH with EXPECT expect", () => {
  for (let i: number = 0; i < 5; i++) {
    users = CreateUser(`Username` + i)
  }
})
```

✅ Do: Duplicate code if it's small enough (boost readability):
```typescript
test("FUNC fun WITH with EXPECT expect", () => {
  const user1 = CreateUser("Username1")
  const user2 = CreateUser("Username2")
  const user3 = CreateUser("Username3")
  const user4 = CreateUser("Username4")
  const user5 = CreateUser("Username5")
})
```

### Minimal space
To boost readability sometimes small tests (usually just a couple lines of code) can be compacted to be without spaces and new lines.

❌ Don't: Leaving spaces in small tests:
```typescript
test("FUNC fun WITH with EXPECT expect", () => {
  const x = new X({
    something: 1,
    else: 2
  })

  expect(error.fun()).toEqual({})
})
```

✅ Do: Minimise space in small tests:
```typescript
test("FUNC fun WITH with EXPECT expect", () => {
  const x = new X({something: 1, else: 2})
  expect(error.fun()).toEqual({})
})
```

### Minimal reference in naming
Don't reference specific objects or functions in test signature apart from the function you are testing.

❌ Don't: Reference other specific fields or functions (e.g. invalidFields property):
```typescript
test("FUNC constructor WITH invalidFields EXPECT instance created", () => {
  new InvalidInputError({invalidFields: {test: "error"}})
})
```

✅ Do: Vaguely mention the property (e.g. instead of `invalidFields` use `invalid fields`):
```typescript
test("FUNC constructor WITH invalid fields EXPECT instance created", () => {
  new InvalidInputError({invalidFields: {test: "error"}})
})
```

### Thorough testing
Expect specific responses and statues. Not just expect the field to be defined, not empty, or something vague. In tests, you can control everything, so expect specific outcomes.

❌ Don't: Simply expecting that the value is there.
```typescript
test("FUNC constructor WITH no props EXPECT default values", async () => {
  const instance = new SomeInstance()
  expect(instance.a()).toBeTruthy()
  expect(instance.b()).toBeTruthy()
  expect(instance.c()).toBeTruthy()
  await expect(instance.get()).rejects.toThrow()
})
```

✅ Do: Expect specific values and outcomes.
```typescript
test("FUNC constructor WITH no props EXPECT default values", async () => {
  const instance = new SomeInstance()
  expect(instance.a()).toBe(123)
  expect(instance.b()).toBe("Be yourself")
  expect(instance.c()).toBe(true)
  await expect(instance.get()).rejects.toThrow(InvalidError)
})
```

### Avoid test duplication
Avoid testing same properties and functionality in exactly the same way. Even though in different tests, test signatures may be different, but if tests are very similar or identical - they are considered duplicates.

❌ Don't: Creating tests that essentially test the same thing (overlap).
```typescript
test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new Http()
  expect(error.getName()).toBe("Http")
  expect(error.getHttpCode()).toBe(200)
})

// Comment: This is duplicate as the first test already tested the name.
test("FUNC constructor WITH no props EXPECT correct default name", () => {
  const error = new Http()
  expect(error.getName()).toBe("Http")
})

// Comment: This is duplicate as the first test already tested the http code.
test("FUNC constructor WITH no props EXPECT default http code", () => {
  const error = new Http()
  expect(error.getHttpCode()).toBe(200)
})
```

✅ Do: Minimise test footprint and test scenarios once.
```typescript
test("FUNC constructor WITH no props EXPECT default values", () => {
  const error = new Http()
  expect(error.getName()).toBe("Http")
  expect(error.getHttpCode()).toBe(200)
})
```

### Add simple explanation comments
In some more complex logic scenarios, add simple code comments to explain the situation or state.

✅ Do: In complex code logic executions, add simple comments.
```typescript
test("FUNC constructor WITH 1 second ttl EXPECT cache expires after time", async () => {
  vi.useFakeTimers()
  
  const cache = new Cache({ttlSeconds: 1})
  
  // First time call - expect response to be raw. <--- (explanation comment added)
  const response1 = await instance.get("https://google.com/")
  expect(response1.cached).toBe(false)

  // Second consecutive call - expect cached. <--- (explanation comment added)
  const response2 = await instance.get("https://google.com/")
  expect(response2.cached).toBe(true)

  vi.advanceTimersByTime(1500)

  // At this point more time has passed than the given ttl, expect cache expired and response to be raw again. <--- (explanation comment added)
  const response3 = await instance.get("https://google.com/")
  expect(response3.cached).toBe(false)

  vi.restoreAllMocks()
})
```

### Test initial state
To properly capture state changes, ttl expirations and data modifications you need to check the initial state, intermediate state, as well as the final state.

❌ Don't: Testing just the final state.
```typescript
test("FUNC constructor WITH defaults EXPECT something", async () => {
  const instance = Instance()
  instance.process()
  expect(instance.state1).toBe("DONE")
})
```

✅ Do: Testing the initial state and testing the final state.
```typescript
test("FUNC constructor WITH defaults EXPECT something", async () => {
  const instance = Instance()
  expect(instance.state1).toBe("NEW")
  instance.process()
  expect(instance.state1).toBe("DONE")
})
```

### Keep tests in a file flat
Keep test file clean and don't segregate tests with code comments, separations, `describe` grouping, etc.

❌ Don't: Separate or group tests.
```typescript
describe("Math functions", () => {
  test("adds two numbers", () => {
    expect(1 + 2).toBe(3)
  })

  // Test multiplication.
  test("multiplies two numbers", () => {
    expect(2 * 3).toBe(6)
  })
})
```

✅ Do: Keep test structure flat.
```typescript
test("Test signature", () => {
  expect(1 + 2).toBe(3)
})

test("Test signature", () => {
  expect(2 * 3).toBe(6)
})
```

### Expect errors instead of catching them
Don't try/catch errors and then expect an outcome, immediately expect that a method throws.

❌ Don't: Try/catch then expect.
```typescript
test("FUNC get WITH empty EXPECT error", async () => {
  try {
    await instance.get("")
    expect.fail("Expected request to throw an error.")
  } catch (error: any) {
    expect(error).toBeInstanceOf(BadRequestError)
  }
})
```

✅ Do: Immediately expect rejection.
```typescript
test("FUNC get WITH empty EXPECT error", async () => {
  await expect(instance.get("")).rejects.toBeInstanceOf(BadRequestError)
})
```

## Directory structure

- The `tests` directory structure must match the `app` / `src` directory (and subdirectories) structure.
- Test file names must match app file names e.g. `http.ts` → `http.test.ts`.
- If you find mismatching structure or mismatching file names - immediately notify and attempt to fix it.

## Best practices

- Write clear, easy to read, easy to maintain tests. You are allowed to repeat lines or dumb-down the code to make sure it is as much readable as possible. Take note of other tests that exist in the project.
- Avoid duplicate tests. Some tests may have different ideas, but if implementation is very similar, and they overlap significantly - avoid writing such tests.
- Before implementing each test - think how will you implement it and if the test actually makes sense and is implementable.
- When thinking what tests to write, put a lot of focus on out-of-the-box edge cases, for example:
  - Running the function multiple times (sequentially or parallel).
  - Supplying malformed inputs.
  - Changing the context in app or database.
  - Testing the function against multiple resources e.g. multiple concurrent users.
  - Testing for proper segregation.
  - Considering caching edge cases.
