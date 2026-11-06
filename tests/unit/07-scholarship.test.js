import { evaluateScholarship } from "../../src/07-scholarship.js";
import { scholarshipCases } from "../fixtures/scholarshipCases.js";

describe("Scholarship Eligibility Decision Table", () => {
  // Task 1 & 2: Object-based test.each() with 21 fixture cases
  describe("Object-based parameterized test cases", () => {
    test.each(scholarshipCases)(
      "evaluates $description -> $expected",
      ({ student, expected }) => {
        expect(evaluateScholarship(student)).toBe(expected);
      }
    );
  });

  // Task 4: Small equivalent array-based test table
  describe("Equivalent array-based test table demonstration", () => {
    test.each([
      [95, 96, 16, false, "Full Scholarship"],
      [85, 90, 13, false, "Partial Scholarship"],
      [75, 80, 10, false, "Not Eligible"],
      [95, 96, 16, true, "Rejected"]
    ])(
      "given avg=%d, att=%d, cr=%d, disc=%s -> returns %s",
      (average, attendance, credits, disciplinaryAction, expected) => {
        const student = { average, attendance, credits, disciplinaryAction };
        expect(evaluateScholarship(student)).toBe(expected);
      }
    );
  });

  // Task 3: Input validation tests with strict message assertions to kill mutation survivors
  describe("Input validation for student attributes", () => {
    const validStudent = { average: 85, attendance: 90, credits: 15, disciplinaryAction: false };

    test("rejects non-object student input (null, undefined, number, array)", () => {
      expect(() => evaluateScholarship(null)).toThrow("Student must be a valid object");
      expect(() => evaluateScholarship(undefined)).toThrow("Student must be a valid object");
      expect(() => evaluateScholarship(123)).toThrow("Student must be a valid object");
      expect(() => evaluateScholarship([])).toThrow("Student must be a valid object");
    });

    test("rejects non-numeric average with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, average: "90" })).toThrow("Average must be a finite number");
    });

    test("rejects average out of 0-100 range with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, average: -1 })).toThrow("Average must be between 0 and 100");
      expect(() => evaluateScholarship({ ...validStudent, average: 101 })).toThrow("Average must be between 0 and 100");
    });

    test("rejects non-finite average (NaN/Infinity) with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, average: NaN })).toThrow("Average must be a finite number");
      expect(() => evaluateScholarship({ ...validStudent, average: Infinity })).toThrow("Average must be a finite number");
    });

    test("rejects non-numeric attendance with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, attendance: "85" })).toThrow("Attendance must be a finite number");
    });

    test("rejects attendance out of 0-100 range with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, attendance: -5 })).toThrow("Attendance must be between 0 and 100");
      expect(() => evaluateScholarship({ ...validStudent, attendance: 105 })).toThrow("Attendance must be between 0 and 100");
    });

    test("rejects non-numeric credits with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, credits: "15" })).toThrow("Credits must be a number");
    });

    test("rejects negative or fractional credits with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, credits: -1 })).toThrow("Credits must be a nonnegative integer");
      expect(() => evaluateScholarship({ ...validStudent, credits: 14.5 })).toThrow("Credits must be a nonnegative integer");
    });

    test("rejects non-boolean disciplinaryAction with exact message", () => {
      expect(() => evaluateScholarship({ ...validStudent, disciplinaryAction: "false" })).toThrow("disciplinaryAction must be a Boolean");
      expect(() => evaluateScholarship({ ...validStudent, disciplinaryAction: 0 })).toThrow("disciplinaryAction must be a Boolean");
    });
  });
});
