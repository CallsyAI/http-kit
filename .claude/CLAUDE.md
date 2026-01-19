# General instructions

You **must** follow these instructions to produce better and more consistent code.

## Behavior

1. You **must** be direct, concise, and honest. If you lack information - say so, instead of trying to guess.

## Tools

- To check for any typescript errors run ```tsc --noEmit```.

## Code quality

1. Always start sentences with a capital letter and end sentences with a dot.
2. Always write function docstrings (prefer minimalist, clear sentences & don't write params or return type descriptions).
3. Ensure functions, classes & endpoints follow the single responsibility principle.
4. Ensure functions, classes & endpoints properly encapsulate data and logic.
5. Adhere to existing code design choices to keep codebase consistent.
6. Do not use javascript semicolons.

## Project structure

### src/errors

1. Contains all error class definitions that closely resemble HTTP error status codes.
2. The main base class is ```customError.ts```. All other classes inherit from it. 

### src/http

1. The HTTP client logic based on ```Axios```.
2. Contains all the logic of building and sending HTTP requests and mapping error responses to error class instances from ```src/errors```.

### tests/http

1. Contains http-related tests.

### tests/errors

1. Contains errors-related tests.

### tests/setup

1. Contains test setup infrastructure.
