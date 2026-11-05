# Question 4 – Enrollment Management Defect Log

## Project
Advanced Jest Unit Testing – Practical Laboratory

## Module
`src/04-enrollment.js` and `tests/unit/04-enrollment.test.js`

## Initial test results
- Total tests: 10
- Passed: 4
- Failed: 6

## Defects identified and resolved

| No. | Input / Condition | Observed Defect | Resolution |
|---|---|---|---|
| 1 | Duplicate (studentId, courseId) enrollment | Created duplicate record and sent duplicate notification | Check for existing pair before pushing, throw error, and skip notification |
| 2 | Notification throws error | Newly added record remained in array (inconsistent state) | Added try/catch block to roll back (pop) record before rethrowing error |
| 3 | Call to `unenroll(studentId, courseId)` | Method did not exist (`TypeError: manager.unenroll is not a function`) | Implemented `unenroll()` returning `true` on removal |
| 4 | `unenroll` on non-matching course | Method did not exist | Return `false` when record is not found |
| 5 | `unenroll` on unknown student | Method did not exist | Return `false` when student has no records |
| 6 | Returned enrollments mutated externally | Returned internal object references directly, breaking encapsulation | Return deep/defensive copies of enrollment objects from `getEnrollments()` |

## Final test results

- Total tests: 10
- Passed: 10
- Failed: 0
- Test suites passed: 1

## Conclusion

The initial `EnrollmentManager` implementation did not handle duplicate enrollments, lacked transactional rollback on notification failures, did not support unenrollment, and leaked internal mutable references. The corrected class addresses all side effects, ensures proper state rollback on failure, isolates records via defensive copying, and successfully passes all 10 unit tests with Jest mocks.

