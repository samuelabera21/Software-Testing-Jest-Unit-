# Question 3 – Tuition Fee Calculation Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/03-tuition.js` and `tests/unit/03-tuition.test.js`

## Initial test results
- Total tests: 20
- Passed: 5
- Failed: 15

## Defects identified and resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | `findMostExpensiveCourse` call | Function was not defined/exported | Implemented `findMostExpensiveCourse()` returning course with highest total cost |
| 2 | Empty course array for `findMostExpensiveCourse` | Not handled | Return `null` when array is empty |
| 3 | Tied highest costs for `findMostExpensiveCourse` | Not handled | Return the first encountered matching course |
| 4 | `scholarshipRate = null` | Treated as 0 or unvalidated | Explicitly reject `null` with `TypeError` |
| 5 | String `scholarshipRate` | JavaScript coerced string | Enforce numeric finite type validation with `TypeError` |
| 6 | Negative `scholarshipRate` (< 0) | Accepted negative rates reducing charges erroneously | Added `RangeError` validation for rate < 0 |
| 7 | `scholarshipRate` > 1 | Accepted rates exceeding 100% | Added `RangeError` validation for rate > 1 |
| 8 | Negative `creditHours` | Produced negative subtotal | Enforced nonnegative integer check with `RangeError` |
| 9 | Fractional `creditHours` | Accepted fractional credit hours | Enforced integer check with `RangeError` |
| 10 | String `creditHours` | Implicit coercion or unexpected arithmetic | Enforced `typeof === "number"` with `TypeError` |
| 11 | Negative `pricePerCredit` | Accepted negative price | Added `RangeError` for negative values |
| 12 | Non-finite `pricePerCredit` (Infinity/NaN) | Allowed Infinity or NaN subtotal | Added finite number check with `TypeError` |
| 13 | Floating-point precision | Resulted in long recurring floating-point decimals | Applied rounding to 2 decimal places for subtotal, discount, and payable |
| 14 | Non-array `courses` input | Caused runtime crash in `.reduce` | Enforced `Array.isArray(courses)` check with `TypeError` |

## Final test results

- Total tests: 20
- Passed: 20
- Failed: 0
- Test suites passed: 1

## Conclusion

The starter implementation of `calculateTuition` lacked input validation, allowed invalid numeric types and ranges, had floating-point inaccuracies, and was missing the required `findMostExpensiveCourse` function. All defects were resolved with strict type and range validations, two-decimal monetary rounding, immutability assurance, and proper implementation of `findMostExpensiveCourse`. All 20 tests pass.

