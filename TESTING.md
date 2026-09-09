# Testing Bastet

The test suite is split into a fast feedback tier and a required slow verification
tier. Both tiers must pass before a change is merged.

## Specification-Oriented Testing

Three constructs are central:

- `describe("the thing or the case we test") { .. }`: groups tests by subject or
  scenario. Groups may be nested.

- `beforeEach(() => { .. })`: optionally initializes the subject before each test.

- `test("the expected behavior", () => { .. })`: describes and checks observable
  behavior.

Tests import their tests and hooks explicitly from `node:test` and assertions
from `node:assert/strict`. Tests that perform asynchronous work must return or
`await` their promise; do not catch and discard failures.

## Placement of Tests

Tests live under `test/` and normally mirror the structure under `src/`.

- Fast unit, parser, and transformation tests use the `*.node.test.ts`
  suffix outside the slow-tier directories.
- Solver, verification-fixture, and end-to-end tests use the `*.node.test.ts`
  suffix in their existing slow-tier directories.
- Verification fixture names end in `_SAFE.sc` or `_UNSAFE.sc` and the test must
  assert the corresponding result.

Committed focused or skipped tests are not permitted. This includes `.only` and
`.skip` methods, `{only: true}` and `{skip: true}` options, legacy `xtest`/`xit`
forms, and test-context `skip()` or `runOnly(true)` calls. Enforce the policy
locally with:

```sh
pnpm run test:policy
```

## Test Execution

Run the complete fast tier while developing:

```sh
pnpm run test:fast
```

It executes TypeScript directly with tsx and collects Node V8 coverage only from
handwritten Bastet TypeScript. Generated ANTLR and Z3 bindings are excluded. Node
enforces floors of 78% lines, 89% branches, and 57% functions. The command also
runs the test-policy checker and its regression tests.

Run one selected file:

```sh
pnpm run test:fast:file -- test/bastet/utils/Optional.node.test.ts
```

Run tests matching a name, optionally restricted to one file:

```sh
pnpm run test:fast:test -- "updates immutably" test/bastet/utils/Optional.node.test.ts
```

Run the fast tier in watch mode:

```sh
pnpm run test:fast:watch
```

Watch mode observes the selected fast test files. Pass a file after `--file` to
limit the initial run and subsequent reruns to that file.

Run the required solver, fixture, and integration tier with:

```sh
pnpm run test:slow
```

Slow suites execute TypeScript directly with tsx. The runner starts one file per
process to isolate native Z3 state and defaults to one active process so
solver-heavy suites cannot overload CI. Node limits each individual test to 120
seconds; the outer runner terminates the suite's entire process group, including
descendants, if it does not finish within 240 seconds. Every run prints per-suite
and total elapsed times.

Run one or more selected slow suites:

```sh
pnpm run test:slow:file -- \
  test/bastet/utils/smt/Z3-Boolean.node.test.ts \
  test/integration/DegToRad.node.test.ts
```

The runner accepts `--concurrency 1` through `--concurrency 4` after its runner
script when explicitly needed locally; CI and the documented commands remain
sequential.

Run the short process-tree deadline regression probe with:

```sh
pnpm run test:slow:deadline
```

The complete local gate is:

```sh
pnpm test
```

CI requires one fast job and one slow job. The slow job also runs the process-tree
deadline regression probe so a native solver hang cannot stall CI indefinitely.

## Literature

[1] https://www.bignerdranch.com/blog/why-do-javascript-test-frameworks-use-describe-and-beforeeach/
