# Question 14 – Mutation Score Improvement Project Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/14-payment.js`

## 1. Initial StrykerJS Mutation Run
StrykerJS was executed targeting `src/14-payment.js` with tests in `tests/unit/08-payment.test.js`.

- **Initial Stryker Report Counts**:
  - Total Mutants: 59
  - Killed: 53
  - Survived: 6
  - Timeout: 0
  - No Coverage: 0
  - **Initial Mutation Score**: **89.83%**
  - Report saved to: `reports/mutation/payment-initial-mutation.json` and `.html`

## 2. Classification of Initial Surviving Mutants
1. **Error String Literals (4 mutants survived)**:
   - `throw new TypeError("Amount must be a finite number")` mutated to `throw new TypeError("")`
   - `throw new RangeError("Amount must be greater than zero")` mutated to `throw new RangeError("")`
   - `throw new TypeError("Payment method must be a string")` mutated to `throw new TypeError("")`
   - `throw new TypeError("isInternational must be a Boolean")` mutated to `throw new TypeError("")`
   *Reason for Survival*: Tests initially asserted only error types (`toThrow(TypeError)`) rather than exact error message strings.

2. **Conditional Redundancy / Equivalent Mutants (2 mutants survived)**:
   - `if (typeof amount !== "number" || !Number.isFinite(amount))` mutated to `if (false || !Number.isFinite(amount))`
   - `else if (method === "bank")` mutated to `else if (true)`

## 3. Targeted Test Improvements
Targeted assertions checking exact error messages and strict input handling were added to `tests/unit/08-payment.test.js`.
In addition, `tests/unit/14-payment-mutation.test.js` verified 8 targeted mutation-killing scenarios across fee arithmetic, surcharge logic, and method validation.

## 4. Final StrykerJS Mutation Run
- **Final Stryker Report Counts**:
  - Total Mutants: 59
  - Killed: 57 (+4 mutants killed)
  - Survived: 2
  - Timeout: 0
  - No Coverage: 0
  - **Final Mutation Score**: **96.61%**
  - Report saved to: `reports/mutation/payment-final-mutation.json` and `.html`

## 5. Mutation Score Calculation

Using the manual scoring formula:
$$\text{Mutation Score} = \frac{\text{Killed} + \text{Timeout}}{\text{Killed} + \text{Timeout} + \text{Survived} + \text{No Coverage}} \times 100\%$$

$$\text{Final Mutation Score} = \frac{57 + 0}{57 + 0 + 2 + 0} \times 100\% = \mathbf{96.61\%}$$

## 6. Equivalent Mutant Justification
The two remaining survivors are provably equivalent mutants under the specified business rules:
1. **Mutant on `else if (method === "bank")` changed to `else if (true)`**:
   Preceding code explicitly verifies:
   ```javascript
   if (method !== "card" && method !== "bank") {
     throw new Error("Unsupported payment method");
   }
   ```
   If execution reaches `else if (method === "bank")`, `method` cannot be `"card"`, nor can it be any unsupported string (which was rejected earlier). Therefore, `method` is mathematically guaranteed to be `"bank"`. Replacing the condition with `true` creates an equivalent mutant that behaves identically for all reachable inputs.
2. **Mutant on `typeof amount !== "number" || !Number.isFinite(amount)`**:
   In JavaScript, `Number.isFinite(v)` returns `false` for any non-number. The type guard `typeof amount !== "number"` is functionally subsumed by `!Number.isFinite(amount)`, rendering the mutated clause equivalent.
