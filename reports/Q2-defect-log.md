# Question 2 – GradeBook Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/02-grading.js` and `tests/unit/02-grading.test.js`

## Initial test results
- Total tests: 21
- Passed: 12
- Failed: 9

## Defects identified and resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Empty gradebook | Returned -Infinity | Return null |
| 2 | String score "80" | Accepted invalid type | Added TypeError validation |
| 3 | Negative score (-1) | Accepted invalid score | Added RangeError validation |
| 4 | Score 101 | Accepted score above limit | Enforced maximum 100 |
| 5 | NaN | Accepted invalid number | Added finite-number validation |
| 6 | Remove lowest score | Method did not exist | Implemented removeLowestScore() |
| 7 | Duplicate lowest scores | Removal functionality missing | Remove only one occurrence |
| 8 | Single score removal | Removal functionality missing | Implemented single-score removal |
| 9 | Empty gradebook removal | Removal functionality missing | Return null when empty |

## Final test results

- Total tests: 21
- Passed: 21
- Failed: 0
- Test suites passed: 1

## Conclusion

The original GradeBook implementation contained nine identified defects. These defects were corrected through input validation, proper empty-state handling, and implementation of the removeLowestScore() method.

All 21 Jest tests passed after correction, confirming that the required GradeBook behavior works as expected.
