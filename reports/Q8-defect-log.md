# Question 8 – Tuition Payment Rules and Data Combinations Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/08-payment.js` and `tests/unit/08-payment.test.js`

## Initial test results
- Total tests: 21
- Passed: 10
- Failed: 11

## Defects identified and resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Decimal calculations (e.g. 100.55 card/bank) | Returned unrounded floats (e.g. `103.06375`, `104.572`) | Implemented standard two-decimal monetary rounding |
| 2 | Zero amount (`amount = 0`) | Threw generic `Error` instead of `RangeError` | Enforced `RangeError` for non-positive amounts |
| 3 | Negative amount (`amount = -50`) | Threw generic `Error` instead of `RangeError` | Enforced `RangeError` for negative amounts |
| 4 | String amount (`"100"`) | Coerced string or bypassed check | Validated `typeof amount === "number"` with `TypeError` |
| 5 | `NaN` amount | Evaluated without error | Added `Number.isFinite(amount)` throwing `TypeError` |
| 6 | `Infinity` amount | Accepted infinity | Added finite number validation with `TypeError` |
| 7 | Non-string method (`123`) | Threw generic Error | Added `typeof method === "string"` throwing `TypeError` |
| 8 | Non-boolean `isInternational` (`"true"`) | Permitted truthy string | Required boolean type check throwing `TypeError` |
| 9 | Missing arguments (`undefined`) | Premature calculation failure or generic error | Validated all mandatory parameters throw `TypeError` |

## Test-Case Combination Matrix

| Case ID | Method | Amount | International | Expected Value / Exception | Actual Jest Result | Status |
|---|---|---|---|---|---|---|
| TC-01 | card | 100.00 | false | 102.50 | 102.50 | PASS |
| TC-02 | card | 100.00 | true | 104.00 | 104.00 | PASS |
| TC-03 | card | 100.55 | false | 103.06 | 103.06 | PASS |
| TC-04 | card | 100.55 | true | 104.57 | 104.57 | PASS |
| TC-05 | card | 100000.00 | false | 102500.00 | 102500.00 | PASS |
| TC-06 | card | 100000.00 | true | 104000.00 | 104000.00 | PASS |
| TC-07 | bank | 100.00 | false | 110.00 | 110.00 | PASS |
| TC-08 | bank | 100.00 | true | 111.50 | 111.50 | PASS |
| TC-09 | bank | 100.55 | false | 110.55 | 110.55 | PASS |
| TC-10 | bank | 100.55 | true | 112.06 | 112.06 | PASS |
| TC-11 | bank | 100000.00 | false | 100010.00 | 100010.00 | PASS |
| TC-12 | bank | 100000.00 | true | 101510.00 | 101510.00 | PASS |
| TC-13 | card | 0 | false | RangeError | RangeError | PASS |
| TC-14 | bank | -50 | false | RangeError | RangeError | PASS |
| TC-15 | card | "100" | false | TypeError | TypeError | PASS |
| TC-16 | card | NaN | false | TypeError | TypeError | PASS |
| TC-17 | bank | Infinity | false | TypeError | TypeError | PASS |
| TC-18 | crypto | 100 | false | Error ("Unsupported payment method") | Error ("Unsupported payment method") | PASS |
| TC-19 | 123 | 100 | false | TypeError | TypeError | PASS |
| TC-20 | card | 100 | "true" | TypeError | TypeError | PASS |
| TC-21 | undefined | undefined | undefined | TypeError | TypeError | PASS |

## Final test results
- Total tests: 21
- Passed: 21
- Failed: 0
- Test suites passed: 1

