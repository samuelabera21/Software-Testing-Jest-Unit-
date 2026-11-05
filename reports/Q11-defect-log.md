# Question 11 – Coverage Thresholds and Regression Testing Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`jest.config.js`, `src/11-coverageRegression.js`, and `tests/unit/11-coverageRegression.test.js`

## 1. Global Coverage Threshold Configuration
The required minimum coverage thresholds were added to `jest.config.js`:
```javascript
coverageThreshold: {
  global: {
    statements: 90,
    branches: 85,
    functions: 90,
    lines: 90
  }
}
```

## 2. Controlled Coverage Regression
- **Action**: Introduced a new module `src/11-coverageRegression.js` exporting `calculateAcademicStanding(gpa, creditsCompleted)` containing multiple branching decisions:
  - `gpa >= 3.5 && creditsCompleted >= 30` -> `"Dean's List"`
  - `gpa >= 2.0` -> `"Good Standing"`
  - `gpa >= 1.5` -> `"Academic Warning"`
  - else -> `"Academic Probation"`
- **Observed Regression**:
  When tested with only a single test path, branch coverage for the new module dropped below the threshold, and running the single-file coverage resulted in:
  ```
  Jest: Coverage for statements (2.48%) does not meet "global" threshold (90%)
  Jest: Coverage for branches (44.44%) does not meet "global" threshold (85%)
  ```

## 3. Threshold Restoration and Comparison

| Metric | Configured Global Threshold | Global Suite Measured | `coverageRegression.js` File Measured | Status |
|---|---:|---:|---:|---|
| Statements | 90% | 99.09% | 100.00% | PASS |
| Branches | 85% | 99.01% | 100.00% | PASS |
| Functions | 90% | 100.00% | 100.00% | PASS |
| Lines | 90% | 99.09% | 100.00% | PASS |

All 5 branching decisions and boundaries were verified with targeted assertions, restoring full passing status.

## 4. Why Coverage Alone Is Insufficient: Weak Assertion Example

A passing test with high execution coverage and an intentionally weak assertion was implemented:
```javascript
test("demonstrates high execution coverage with an intentionally weak assertion", () => {
  const result = calculateAcademicStanding(3.9, 60);
  expect(result).toBeDefined();
  expect(typeof result).toBe("string");
});
```

### Analysis
- **Code Execution**: The test executes statements, functions, and branches, contributing 100% line coverage for that path.
- **The Defect**: If a programmer introduced a critical bug (for example, returning `"Incorrect Standing"` or swapping decisions), `expect(result).toBeDefined()` and `expect(typeof result).toBe("string")` would still pass!
- **Conclusion**: Code coverage only measures what code was *executed*, not whether the code was *verified for correctness*. Meaningful assertions that check exact outputs, invariants, and state changes are essential.

## Final test results
- Total tests in Q11: 6
- Passed: 6
- Failed: 0
- Coverage threshold: Satisfied across all metrics

