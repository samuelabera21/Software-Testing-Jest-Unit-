# Question 6 – Lifecycle Hooks and Resource Cleanup Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/06-fakeDatabase.js` and `tests/unit/06-fakeDatabase.test.js`

## 1. Initial Observations and Defects

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Record retention across tests | Tests inherited records from previous insertions when run sequentially | Used `beforeEach()` to reset records (`db.clear()`), ensuring zero state leakage |
| 2 | Premature or missing cleanup | Database remained connected after suite completion, leading to potential resource leaks | Implemented `afterAll()` to call `disconnect()`, verified with a Jest spy |
| 3 | Unconnected operations | Operations attempted without connection needed strict failure | Added check in `insert()` requiring `this.connected === true`, throwing `"Database not connected"` |
| 4 | Indeterminate hook order | Scoped hooks in nested describe blocks could execute out of expected hierarchy | Tracked execution via an event log verifying outer vs inner hook execution hierarchy |

## 2. Exact Observed Lifecycle Hook Execution Order

When combining outer and inner `describe()` suites with scoped hooks, the exact event log sequence recorded by Jest is:
```text
1. outer:beforeAll       (Connects shared database resource)
2. outer:beforeEach      (Clears records for test 1)
3. [Test 1 executes]     (Successful insert)
4. outer:afterEach       (Cleanup after test 1)
5. outer:beforeEach      (Clears records for test 2)
6. [Test 2 executes]     (Isolation verification)
7. outer:afterEach       (Cleanup after test 2)
8. outer:beforeEach      (Clears records for test 3)
9. [Test 3 executes]     (Disconnected rejection check)
10. outer:afterEach      (Cleanup after test 3)
11. outer:beforeEach     (Clears records for test 4)
12. [Test 4 executes]    (Spy & intentional rejection verification)
13. outer:afterEach      (Cleanup after test 4)
14. inner:beforeAll      (Scoped nested setup)
15. outer:beforeEach     (Outer test setup executes first)
16. inner:beforeEach     (Inner test setup executes second)
17. [Inner test executes](Scoped assertion & event log check)
18. inner:afterEach      (Inner test cleanup executes first)
19. outer:afterEach      (Outer test cleanup executes second)
20. inner:afterAll       (Scoped nested teardown)
21. outer:afterAll       (Disconnects database resource)
```

## 3. Final Test Results
- Total tests: 5
- Passed: 5
- Failed: 0
- Test suites passed: 1

## 4. Conclusion
The lifecycle test suite proved that resources are cleanly acquired in `beforeAll()`, reset for each isolated test in `beforeEach()`, and reliably torn down in `afterAll()`. Nested hooks adhere strictly to hierarchical ordering, and intentional failures are cleanly trapped with `toThrow()`.
