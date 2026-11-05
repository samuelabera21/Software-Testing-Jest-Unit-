
# Question 1: Student Registration Defect Log

## 1. Initial Test Execution

Test file: `src/01-registration.js` and `tests/unit/01-registration.test.js`

Initial implementation results:
- Passed: 11
- Failed: 6
- Total: 17

## 2. Defect Analysis

| Input | Observed defect | Resolution |
|---|---|---|
| Age 17 | Generic Error instead of RangeError | Added explicit age range validation |
| Age 121 | Incorrectly accepted | Added maximum age of 120 |
| Age 20.5 | Fractional age accepted | Added integer validation |
| Email samuel@ | Malformed email accepted | Added basic email regex |
| Missing ID | Registration accepted | Added required ID validation |
| ID -5 | Negative ID accepted | Added positive safe integer validation |

## 3. Additional Validation

- ID must be a positive safe integer.
- Name must be a nonblank string.
- Age must be an integer between 18 and 120.
- Email must match the documented basic email format.
- Incorrect data types are rejected.
- Original input objects must remain unchanged.

## 4. Before and After Results

| Metric | Before correction | After correction |
|---|---:|---:|
| Total tests | 17 | 22 |
| Passed tests | 11 | 22 |
| Failed tests | 6 | 0 |

## 5. Conclusion

The original registration implementation contained
validation defects that could allow invalid student
records.

After implementing stricter validation and running
the expanded Jest test suite, all 22 tests passed.

The corrected implementation preserves valid
registration results and does not mutate the
original student object.
