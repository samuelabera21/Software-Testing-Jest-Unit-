# Question 10 – Admission System Coverage Improvement Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/10-admission.js` and `tests/unit/10-admission.test.js`

## 1. Initial Test Execution and Baseline Metrics
The initial suite contained only 2 tests exercising successful domestic admissions (with and without scholarship).
Gaps identified in the HTML coverage report:
- Lines 10–17 unexercised:
  - `age < 18` rejection branch never triggered.
  - `score < 60` rejection branch never triggered.
  - `!hasCertificate` pending branch never triggered.
  - `!applicationFeePaid` pending branch never triggered.
  - `isInternational && score < 75` compound decision branches never fully exercised.

## 2. Before and After Coverage Comparison for `admission.js`

| Metric | Initial (Baseline) | Final (Targeted Suite) | Improvement |
|---|---:|---:|---:|
| Statements | 100.00% | 100.00% | +0.00% |
| Branches | 33.33% | 100.00% | +66.67% |
| Functions | 100.00% | 100.00% | +0.00% |
| Lines | 100.00% | 100.00% | +0.00% |

## 3. Targeted Test Cases Added
- Boundary `age = 17` -> `{ status: "Rejected", reason: "Underage" }`
- Boundary `age = 18` -> proceeds to next rule
- Boundary `score = 59` -> `{ status: "Rejected", reason: "Low Score" }`
- Boundary `score = 60` -> proceeds to next rule
- Documentation `hasCertificate = false` -> `{ status: "Pending", reason: "Missing Certificate" }`
- Payment `applicationFeePaid = false` -> `{ status: "Pending", reason: "Payment Required" }`
- International review compound condition:
  - `isInternational = true, score = 74` -> `{ status: "Pending", reason: "International Review" }`
  - `isInternational = true, score = 75` -> passes review
  - `isInternational = false, score = 74` -> domestic bypasses international review
- Scholarship boundary `score = 89` -> `{ status: "Accepted", scholarship: false }`
- Scholarship boundary `score = 90` -> `{ status: "Accepted", scholarship: true }`

## 4. Admission-Rule Combination Not Guaranteed by Branch Coverage Alone
Branch coverage ensures every decision outcome (`true` and `false` branches of `if` statements) is executed at least once. However, it does not guarantee **condition combination coverage (or MC/DC)** for compound conditions.

**Concrete Example**:
For the condition `if (isInternational && score < 75)`:
- Branch coverage only requires that the overall branch evaluates to `true` (e.g. `isInternational = true, score = 70`) and to `false` (e.g. `isInternational = false, score = 80`).
- This means branch coverage alone would NOT guarantee testing the case where `isInternational = true` but `score = 65` when another preceding rule is violated (e.g. `hasCertificate = false`). Because of short-circuit early returns, an applicant with a missing certificate and underage age will never reach the international review evaluation.
- Multiple-condition interactions where multiple failure conditions coexist (e.g. underage applicant with low score and no fee) cannot be verified by 100% branch coverage alone without specific combinatorial test design.

## Final test results
- Total tests: 13
- Passed: 13
- Failed: 0
- Coverage: 100% Statements, 100% Branches, 100% Functions, 100% Lines

