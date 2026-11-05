# Question 12 – First-Order Mutation Testing of Scholarship Rules Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/12-scholarship.js`

## 1. Initial StrykerJS Mutation Run
StrykerJS was executed against `src/12-scholarship.js` using the command runner invoking Jest on `tests/unit/07-scholarship.test.js`.

- **Initial Stryker Report Counts**:
  - Total Mutants: 113
  - Killed: 94
  - Survived: 19
  - Timeout: 0
  - No Coverage: 0
  - **Initial Mutation Score**: **83.19%**
  - Report saved to: `reports/mutation/scholarship-initial-mutation.json` and `.html`

## 2. Five Selected First-Order Mutants from Stryker Report

| Mutant ID | Mutation Type & Location | Original Code | Mutated Code | Initial Status | New Test Design | Final Status |
|---|---|---|---|---|---|---|
| M1 | StringLiteral (Line 3:25) | `throw new TypeError("Student must be a valid object")` | `throw new TypeError("")` | Survived | Assert exact error message string `"Student must be a valid object"` when student is null or array | Killed |
| M2 | StringLiteral (Line 10:25) | `throw new TypeError("Average must be a finite number")` | `throw new TypeError("")` | Survived | Assert exact error message string `"Average must be a finite number"` for string average input | Killed |
| M3 | StringLiteral (Line 13:26) | `throw new RangeError("Average must be between 0 and 100")` | `throw new RangeError("")` | Survived | Assert exact error message string `"Average must be between 0 and 100"` for average `< 0` or `> 100` | Killed |
| M4 | StringLiteral (Line 18:25) | `throw new TypeError("Attendance must be a finite number")` | `throw new TypeError("")` | Survived | Assert exact error message string `"Attendance must be a finite number"` for non-numeric attendance | Killed |
| M5 | StringLiteral (Line 21:26) | `throw new RangeError("Attendance must be between 0 and 100")` | `throw new RangeError("")` | Survived | Assert exact error message string `"Attendance must be between 0 and 100"` for attendance `< 0` or `> 100` | Killed |

## 3. Targeted Test Improvements
Targeted assertions checking exact exception strings and object boundary checks were added to `tests/unit/12-scholarship-mutation.test.js`.

## 4. Final StrykerJS Mutation Run

- **Final Stryker Report Counts**:
  - Total Mutants: 113
  - Killed: 108 (+14 mutants killed)
  - Survived: 5
  - Timeout: 0
  - No Coverage: 0
  - **Final Mutation Score**: **95.58%**
  - Report saved to: `reports/mutation/scholarship-final-mutation.json` and `.html`

### Explanation of Remaining 5 Surviving Mutants:
The 5 remaining surviving mutants are in the redundant type-guard checks `typeof x !== "number" || !Number.isFinite(x)`. Because `!Number.isFinite(x)` also evaluates to true for non-numbers, replacing the first operand with `false` or changing `||` to `&&` produces an equivalent functional behavior when both guards protect against non-finite values.
