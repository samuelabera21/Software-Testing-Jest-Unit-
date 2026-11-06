import { calculateAcademicStanding } from "../../src/11-coverageRegression.js";

describe("Coverage Thresholds and Regression Testing", () => {
  // Task 4: High execution coverage with an intentionally weak assertion
  test("demonstrates high execution coverage with an intentionally weak assertion", () => {
    const result = calculateAcademicStanding(3.9, 60);
    // Intentionally weak assertion: exercises code lines but does not verify correctness
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  // Task 3: Meaningful assertions covering all branches to restore configured thresholds
  describe("Comprehensive branch testing for academic standing", () => {
    test("assigns Dean's List for GPA >= 3.5 and credits >= 30", () => {
      expect(calculateAcademicStanding(3.8, 45)).toBe("Dean's List");
      expect(calculateAcademicStanding(3.5, 30)).toBe("Dean's List");
    });

    test("assigns Good Standing when GPA >= 3.5 but credits < 30", () => {
      expect(calculateAcademicStanding(3.8, 20)).toBe("Good Standing");
    });

    test("assigns Good Standing for GPA >= 2.0 and < 3.5", () => {
      expect(calculateAcademicStanding(2.5, 15)).toBe("Good Standing");
      expect(calculateAcademicStanding(2.0, 15)).toBe("Good Standing");
    });

    test("assigns Academic Warning for GPA between 1.5 and 1.99", () => {
      expect(calculateAcademicStanding(1.8, 15)).toBe("Academic Warning");
      expect(calculateAcademicStanding(1.5, 15)).toBe("Academic Warning");
    });

    test("assigns Academic Probation for GPA < 1.5", () => {
      expect(calculateAcademicStanding(1.4, 15)).toBe("Academic Probation");
      expect(calculateAcademicStanding(0.0, 15)).toBe("Academic Probation");
    });
  });
});

