# Question 5 – Student Repository Isolation Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/05-studentRepository.js` and `tests/unit/05-studentRepository.test.js`

## 1. Reproduction of Test-Order Failure (Shared State)

When a single shared instance `const repo = new StudentRepository();` is used across tests at file scope without resetting:
- Test 1 (`adds student`) inserts record `{ id: 101, name: "Alice" }`. Count becomes 1.
- Test 2 (`starts empty`) asserts `expect(repo.count()).toBe(0)`.
- **Observed failure when run together**:
  ```
  Expected: 0
  Received: 1
  ```
- **Observed pass when Test 2 is run in isolation**:
  ```
  PASS tests/unit/05-studentRepository.test.js -t "starts empty"
  ```
This proved state leakage between test executions when relying on shared mutable instances.

## 2. Defects Identified and Resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Shared repository instance across tests | Tests depended on execution order; accumulated stale records | Instantiated fresh `new StudentRepository()` inside `beforeEach()` |
| 2 | Duplicate student ID insertion | Accepted duplicate IDs silently, causing corrupted lookups | Enforced unique ID constraint in `add()`, throwing `Error("Duplicate student ID: ...")` |
| 3 | Spy/mock retention | Spies on `findById` persisted across tests | Added `afterEach(() => jest.restoreAllMocks())` to restore all spies cleanly |
| 4 | Ad-hoc student test data | Inconsistent test fixtures across test cases | Created `createStudentFixture(overrides)` factory for standard test entities |

## 3. Independent Execution Commands and Results

- **Single Test Execution**:
  ```bash
  npm test tests/unit/05-studentRepository.test.js -t "starts each test with a clean empty repository"
  ```
  *Result*: PASS (1 passed, 8 skipped/not run)

- **Repository Test Suite Execution**:
  ```bash
  npm test tests/unit/05-studentRepository.test.js
  ```
  *Result*: PASS (9 passed, 9 total)

- **Full Suite Execution**:
  ```bash
  npm test
  ```
  *Result*: PASS (all test suites passed)

## 4. Final Results
- Total tests: 9
- Passed: 9
- Failed: 0

