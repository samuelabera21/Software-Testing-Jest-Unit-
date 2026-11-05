# Question 7 – Scholarship Eligibility Decision Table Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/07-scholarship.js` and `tests/unit/07-scholarship.test.js`

## 1. Initial Test Results
- Total tests: 34
- Passed: 26
- Failed: 8

## 2. Defects Identified and Resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Non-numeric average string `"90"` | Accepted without type checking; JS coerced string in comparisons | Added `TypeError` validation for non-numeric/non-finite average |
| 2 | Out-of-bounds average (< 0 or > 100) | Handled negative or excessive numbers without boundary checks | Enforced [0, 100] range with `RangeError` |
| 3 | `NaN` / `Infinity` average | Evaluated inconsistently without error | Validated `Number.isFinite(average)` throwing `TypeError` |
| 4 | Non-numeric attendance string `"85"` | Missing type validation | Enforced finite numeric attendance with `TypeError` |
| 5 | Attendance outside [0, 100] | Accepted impossible percentages like 105% or -5% | Enforced [0, 100] range with `RangeError` |
| 6 | Non-numeric credits string `"15"` | Accepted strings | Added `TypeError` validation for non-numeric credits |
| 7 | Negative or fractional credits (-1, 14.5) | Permitted invalid credit values | Required nonnegative integer credits with `RangeError` |
| 8 | Non-boolean `disciplinaryAction` (e.g. `"false"`, `0`) | Truthy/falsy evaluation led to unexpected decisions | Required strict `typeof === "boolean"` check with `TypeError` |

## 3. Formal Scholarship Decision Table Matrix

| Rule # | Disciplinary Action | Academic Average | Attendance | Completed Credits | Expected Outcome | Actual Result |
|---|:---:|:---:|:---:|:---:|---|---|
| R1 | True | Don't Care | Don't Care | Don't Care | `"Rejected"` | `"Rejected"` (PASS) |
| R2 | False | $\ge 90$ | $\ge 95$ | $\ge 15$ | `"Full Scholarship"` | `"Full Scholarship"` (PASS) |
| R3 | False | $< 90$ ($\ge 80$) | $\ge 95$ | $\ge 15$ | `"Partial Scholarship"` | `"Partial Scholarship"` (PASS) |
| R4 | False | $\ge 90$ | $< 95$ ($\ge 85$) | $\ge 15$ | `"Partial Scholarship"` | `"Partial Scholarship"` (PASS) |
| R5 | False | $\ge 90$ | $\ge 95$ | $< 15$ ($\ge 12$) | `"Partial Scholarship"` | `"Partial Scholarship"` (PASS) |
| R6 | False | $\ge 80$ | $\ge 85$ | $\ge 12$ | `"Partial Scholarship"` | `"Partial Scholarship"` (PASS) |
| R7 | False | $< 80$ | $\ge 85$ | $\ge 12$ | `"Not Eligible"` | `"Not Eligible"` (PASS) |
| R8 | False | $\ge 80$ | $< 85$ | $\ge 12$ | `"Not Eligible"` | `"Not Eligible"` (PASS) |
| R9 | False | $\ge 80$ | $\ge 85$ | $< 12$ | `"Not Eligible"` | `"Not Eligible"` (PASS) |
| R10 | False | $< 80$ | $< 85$ | $< 12$ | `"Not Eligible"` | `"Not Eligible"` (PASS) |

## 4. Test-Suite Coverage
- **Fixtures**: 21 object-based test cases defined in `tests/fixtures/scholarshipCases.js` testing all 4 decisions, boundaries (90/80 average, 95/85 attendance, 15/12 credits), and disciplinary overrides.
- **Table demonstration**: Array-based table covering the decision matrix.
- **Validation**: 9 distinct error and edge-case tests.

## 5. Final Test Results
- Total tests: 34
- Passed: 34
- Failed: 0
- Test suites passed: 1
