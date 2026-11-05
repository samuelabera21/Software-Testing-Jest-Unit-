# Question 9 – Data-Driven Student Result Processing Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/09-resultProcessor.js` and `tests/unit/09-resultProcessor.test.js`

## Initial test results
- Total tests: 24
- Passed: 18
- Failed: 6

## Defects identified and resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Array with string element `["80", 90]` | Accepted strings, leading to string concatenation in reduce | Enforced `typeof score === "number"` with `TypeError` |
| 2 | Array with nested array `[[80], 90]` | Accepted nested structures causing corrupt summation | Enforced scalar finite number validation with `TypeError` |
| 3 | Array with `NaN` (`[80, NaN]`) | Produced `NaN` average without error | Added `Number.isFinite(score)` check with `TypeError` |
| 4 | Array with `Infinity` (`[80, Infinity]`) | Produced `Infinity` average | Added `Number.isFinite(score)` check with `TypeError` |
| 5 | Negative score in array (`[-5, 80]`) | Permitted invalid negative scores | Added `score < 0` check throwing `RangeError` |
| 6 | Out-of-range score > 100 (`[105, 80]`) | Permitted scores above 100 | Added `score > 100` check throwing `RangeError` |

## Parameterized Result Table

| Case ID | Input Scores | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| TC-01 | `[]` | `{ average: 0, status: "No Scores" }` | `{ average: 0, status: "No Scores" }` | PASS |
| TC-02 | `[0]` | `{ average: 0, status: "Fail" }` | `{ average: 0, status: "Fail" }` | PASS |
| TC-03 | `[100]` | `{ average: 100, status: "Pass" }` | `{ average: 100, status: "Pass" }` | PASS |
| TC-04 | `[50]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| TC-05 | `[0, 0]` | `{ average: 0, status: "Fail" }` | `{ average: 0, status: "Fail" }` | PASS |
| TC-06 | `[100, 100]` | `{ average: 100, status: "Pass" }` | `{ average: 100, status: "Pass" }` | PASS |
| TC-07 | `[70, 70, 70]` | `{ average: 70, status: "Pass" }` | `{ average: 70, status: "Pass" }` | PASS |
| TC-08 | `[50.5, 51.5]` | `{ average: 51, status: "Pass" }` | `{ average: 51, status: "Pass" }` | PASS |
| TC-09 | `[49.8, 49.9]` | `{ average: 49.85, status: "Fail" }` | `{ average: 49.85, status: "Fail" }` | PASS |
| TC-10 | `[49.5, 50.5]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| TC-11 | `[49, 50]` | `{ average: 49.5, status: "Fail" }` | `{ average: 49.5, status: "Fail" }` | PASS |
| TC-12 | `[40, 60]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| TC-13 | `[85, 95, 90]` | `{ average: 90, status: "Pass" }` | `{ average: 90, status: "Pass" }` | PASS |
| TC-14 | `[20, 30, 40]` | `{ average: 30, status: "Fail" }` | `{ average: 30, status: "Fail" }` | PASS |
| TC-15 | `[0, 50, 100]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| TC-16 | `[49.99]` | `{ average: 49.99, status: "Fail" }` | `{ average: 49.99, status: "Fail" }` | PASS |

## Final test results
- Total tests: 24
- Passed: 24
- Failed: 0
- Test suites passed: 1

