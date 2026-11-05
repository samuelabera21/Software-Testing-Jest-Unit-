# Question 13 – First-Order and Higher-Order Mutant Investigation Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/13-eligibility.js` and `tests/unit/13-eligibility.test.js`

## 1. Mutant Design and Investigation
The decision function `checkEligibility(age, score, hasDocument)` combines three predicates:
`age >= 18 && score >= 60 && hasDocument`

To investigate mutation orders and defect coupling:
- **First-Order Mutants (FOMs)** introduce exactly one syntactic fault:
  - `FOM1`: `age > 18 && score >= 60 && hasDocument`
  - `FOM2`: `age >= 18 && score > 60 && hasDocument`
  - `FOM3`: `(age >= 18 || score >= 60) && hasDocument`
- **Second-Order Mutant (SOM)** combines both relational mutations:
  - `SOM`: `age > 18 && score > 60 && hasDocument`
- **Third-Order Mutant (TOM)** combines all three mutations:
  - `TOM`: `(age > 18 || score > 60) && hasDocument`

## 2. Mutant Killing Matrix and Interactions

| Mutant | Killing Input `[age, score, hasDoc]` | Original Output | Mutant Output | Status | Explanation of Interactions & Coupling |
|---|---|---|---|---|---|
| **FOM1** | `[18, 70, true]` | `"Eligible"` | `"Not Eligible"` | KILLED | Off-by-one boundary defect on `age`. Tested by providing the exact boundary `age = 18`. |
| **FOM2** | `[22, 60, true]` | `"Eligible"` | `"Not Eligible"` | KILLED | Off-by-one boundary defect on `score`. Tested by providing the exact boundary `score = 60`. |
| **FOM3** | `[16, 75, true]` | `"Not Eligible"` | `"Eligible"` | KILLED | Logical operator defect turns conjunction into disjunction. Tested with failing age (16) and passing score (75). |
| **SOM** | `[18, 60, true]` | `"Eligible"` | `"Not Eligible"` | KILLED | **Cooperative interaction**: Both relational conditions become strict (`>`). Testing the dual boundary `(18, 60)` kills SOM as well as either constituent FOM. |
| **TOM** | `[16, 75, true]` | `"Not Eligible"` | `"Eligible"` | KILLED | **Masking / Dominance interaction**: The `||` operator dominates and masks the relational mutation on `age > 18` whenever `score > 60` is met. The input `[16, 75, true]` exposes this interaction by proving that an underage student is erroneously granted eligibility. |

## 3. Final Test Results
- Total tests: 10
- Passed: 10
- Failed: 0
- Test suites passed: 1
- All mutants (FOM1, FOM2, FOM3, SOM, TOM) successfully killed with parameterized tests.

