# Advanced Jest Unit Testing Laboratory (Questions 1–14)

This project contains the complete laboratory implementation and testing solution for the **Advanced Jest Unit Testing Practice** worksheet (Questions 1 through 14).

Every question is implemented in its own dedicated source module in `src/`, tested by its own test suite in `tests/unit/`, and documented in `reports/`.

---

## 1. Project Overview & Folder Structure

```text
university-testing-lab/
├── Jest Unit Testing Lab Exercise.pdf    # Original Laboratory Worksheet (Preserved)
├── jest.config.js                        # Jest configuration with global coverage thresholds
├── package.json                          # Scripts & dependencies (Jest 30 & StrykerJS 10)
├── stryker.scholarship.config.json       # StrykerJS configuration for Q12 (12-scholarship.js)
├── stryker.payment.config.json           # StrykerJS configuration for Q14 (14-payment.js)
├── src/                                  # 14 Separate Source Modules (Questions 1–14)
│   ├── 01-registration.js                # Q1: Student registration & contract validation
│   ├── 02-grading.js                     # Q2: GradeBook stateful class & score statistics
│   ├── 03-tuition.js                     # Q3: Tuition calculation & array processing
│   ├── 04-enrollment.js                  # Q4: Enrollment manager & mock side-effects
│   ├── 05-studentRepository.js           # Q5: Student repository & isolated state
│   ├── 06-fakeDatabase.js                # Q6: Fake database lifecycle hooks & cleanup
│   ├── 07-scholarship.js                 # Q7: Scholarship eligibility decision logic
│   ├── 08-payment.js                     # Q8: Tuition payment & surcharge rules
│   ├── 09-resultProcessor.js             # Q9: Data-driven student result processing
│   ├── 10-admission.js                   # Q10: Admission system decision coverage
│   ├── 11-coverageRegression.js          # Q11: Academic standing coverage regression
│   ├── 12-scholarship.js                 # Q12: First-order mutation testing of scholarship
│   ├── 13-eligibility.js                 # Q13: First-order & higher-order mutation logic
│   └── 14-payment.js                     # Q14: Mutation score improvement of payment
├── tests/
│   ├── unit/                             # 14 Question-Specific Jest Test Suites
│   │   ├── 01-registration.test.js       # Q1 unit tests (22 tests)
│   │   ├── 02-grading.test.js            # Q2 unit tests (21 tests)
│   │   ├── 03-tuition.test.js            # Q3 unit tests (20 tests)
│   │   ├── 04-enrollment.test.js         # Q4 unit tests (14 tests)
│   │   ├── 05-studentRepository.test.js  # Q5 unit tests (10 tests)
│   │   ├── 06-fakeDatabase.test.js       # Q6 unit tests (5 tests)
│   │   ├── 07-scholarship.test.js        # Q7 unit tests (34 tests)
│   │   ├── 08-payment.test.js            # Q8 unit tests (21 tests)
│   │   ├── 09-resultProcessor.test.js    # Q9 unit tests (24 tests)
│   │   ├── 10-admission.test.js          # Q10 unit tests (13 tests)
│   │   ├── 11-coverageRegression.test.js # Q11 unit tests (6 tests)
│   │   ├── 12-scholarship-mutation.test.js # Q12 mutation-killing tests (14 tests)
│   │   ├── 13-eligibility.test.js        # Q13 FOM/SOM/TOM mutant comparison (10 tests)
│   │   └── 14-payment-mutation.test.js   # Q14 mutation-killing tests (15 tests)
│   └── fixtures/
│       └── scholarshipCases.js           # Reusable decision table fixtures for Q7
└── reports/                              # Detailed defect logs and mutation reports
    ├── Q1-defect-log.md                  # Q1 defect analysis, immutability, and assertion log
    ├── Q2-defect-log.md                  # Q2 defect analysis, boundaries, and state isolation
    ├── Q3-defect-log.md                  # Q3 defect analysis, rounding, and array processing
    ├── Q4-defect-log.md                  # Q4 mock interactions, rollback, and defensive copies
    ├── Q5-defect-log.md                  # Q5 test-order failure evidence and fixture isolation
    ├── Q6-defect-log.md                  # Q6 hierarchical lifecycle hook execution log
    ├── Q7-defect-log.md                  # Q7 formal decision table and boundary matrix
    ├── Q8-defect-log.md                  # Q8 payment method combination matrix
    ├── Q9-defect-log.md                  # Q9 parameterized result processing table
    ├── Q10-defect-log.md                 # Q10 before/after 100% coverage report & MC/DC analysis
    ├── Q11-defect-log.md                 # Q11 coverage regression evidence & weak assertion analysis
    ├── Q12-defect-log.md                 # Q12 Stryker mutant analysis table (M1–M5) & scores
    ├── Q13-defect-log.md                 # Q13 FOM, SOM, TOM mutant comparison & interaction matrix
    ├── Q14-defect-log.md                 # Q14 Stryker mutation score, manual formula & equivalent mutants
    └── mutation/                         # Actual StrykerJS HTML & JSON execution artifacts
        ├── scholarship-initial-mutation.json / .html
        ├── scholarship-final-mutation.json / .html
        ├── payment-initial-mutation.json / .html
        └── payment-final-mutation.json / .html
```

---

## 2. Environment Setup

### Prerequisites
- Node.js (v18+; project uses ECMAScript modules with `--experimental-vm-modules`)
- npm

### Installation
```bash
npm install
```

Installed packages:
- `jest` (`^30.0.0`)
- `@stryker-mutator/core` (`^10.1.1`)
- `@stryker-mutator/jest-runner` (`^10.1.1`)

---

## 3. Test & Verification Execution Commands

### A. Run Complete Unit Test Suite
Runs all 14 test suites in sequence:
```bash
npm test
```
*Current Result*: 14 passed suites, 225 passed tests, 0 failures.

### B. Run Individual Question Tests
Execute any question's test suite directly:
```bash
# Question 1: Registration
npm test tests/unit/01-registration.test.js

# Question 2: GradeBook
npm test tests/unit/02-grading.test.js

# Question 3: Tuition
npm test tests/unit/03-tuition.test.js

# Question 4: Enrollment & Mocks
npm test tests/unit/04-enrollment.test.js

# Question 5: StudentRepository Isolation
npm test tests/unit/05-studentRepository.test.js

# Question 6: FakeDatabase Lifecycle
npm test tests/unit/06-fakeDatabase.test.js

# Question 7: Scholarship Decision Table
npm test tests/unit/07-scholarship.test.js

# Question 8: Tuition Payment
npm test tests/unit/08-payment.test.js

# Question 9: Result Processor
npm test tests/unit/09-resultProcessor.test.js

# Question 10: Admission Coverage
npm test tests/unit/10-admission.test.js

# Question 11: Coverage Regression
npm test tests/unit/11-coverageRegression.test.js

# Question 12: Scholarship Mutation Killing
npm test tests/unit/12-scholarship-mutation.test.js

# Question 13: Eligibility FOM / SOM / TOM
npm test tests/unit/13-eligibility.test.js

# Question 14: Payment Mutation Killing
npm test tests/unit/14-payment-mutation.test.js
```

### C. Run Code Coverage Suite
Measures statement, branch, function, and line coverage against global thresholds (90% statements, 85% branches, 90% functions, 90% lines):
```bash
npm run test:coverage
```
*Current Result*: **100% Statements, 100% Branches, 100% Functions, 100% Lines across all 14 files**.

### D. Run StrykerJS Mutation Testing
Execute real mutation testing using StrykerJS:

```bash
# Run Stryker against scholarship (Question 12)
npm run test:mutation:scholarship

# Run Stryker against payment (Question 14)
npm run test:mutation:payment
```

HTML and JSON reports are saved to `reports/mutation/`.

---

## 4. Key Coverage and Mutation Results

| File | % Stmts | % Branch | % Funcs | % Lines | Status |
|---|---:|---:|---:|---:|:---:|
| **All files (Global)** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **PASS** |
| `01-registration.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `02-grading.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `03-tuition.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `04-enrollment.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `05-studentRepository.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `06-fakeDatabase.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `07-scholarship.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `08-payment.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `09-resultProcessor.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `10-admission.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `11-coverageRegression.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `12-scholarship.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `13-eligibility.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |
| `14-payment.js` | 100.00% | 100.00% | 100.00% | 100.00% | **PASS** |

### StrykerJS Mutation Scores

- **Question 12 (`12-scholarship.js`)**:
  - Initial Score: **83.19%** (94 killed / 113 mutants)
  - Final Score: **95.58%** (108 killed / 113 mutants, 5 equivalent mutants remaining)
- **Question 14 (`14-payment.js`)**:
  - Initial Score: **89.83%** (53 killed / 59 mutants)
  - Final Score: **96.61%** (57 killed / 59 mutants, 2 equivalent mutants remaining)
  - Formula: $\text{Mutation Score} = \frac{57 + 0}{57 + 0 + 2 + 0} \times 100\% = \mathbf{96.61\%}$
