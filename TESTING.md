# Testing the Bastet Framework Implementation

We aim at a high test coverage of the Bastet Framework.

This document describes conventions and best practices
that should be used for this project.

## Specification-Oriented Testing

Three constructs are central:

- `describe("the thing or the case we test") { .. }`: 
    The function `describe` is parameterized
    with a description of the **subject to test** or 
    a specific **case** for that the subject is tested.
    Multiple `describe` can be nested; convention: 
    The outer for the test subjects, the inner for the cases.
    
- `beforeEach(() => { .. })`: 
    Is an optional function that **initializes** the 
    test subject before the actual test is conducted.
    
- `it("the expected behavior", () => { .. })`:
    The actual **test to conduct** to check whether a **behavior exists or not**.
    
## Placement of Tests

Test are separated into a separate folder structure
under `test/`. This folder structure reflects the
structure of the project source code it self, which
is placed under `src/`.

## Test Execution

We use the JEST framework to execute tests.  

## Literature

[1] https://www.bignerdranch.com/blog/why-do-javascript-test-frameworks-use-describe-and-beforeeach/
