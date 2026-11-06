import { evaluateScholarship } from "../../src/12-scholarship.js";

// First-Order Mutants (FOMs) for mutation analysis
function mutantM1(student) {
  // M1: Mutate average >= 90 to average > 90
  const { average, attendance, credits, disciplinaryAction } = student;
  if (disciplinaryAction) return "Rejected";
  if (average > 90 && attendance >= 95 && credits >= 15)
    return "Full Scholarship";
  if (average >= 80 && attendance >= 85 && credits >= 12)
    return "Partial Scholarship";
  return "Not Eligible";
}

function mutantM2(student) {
  // M2: Mutate attendance >= 95 to attendance > 95
  const { average, attendance, credits, disciplinaryAction } = student;
  if (disciplinaryAction) return "Rejected";
  if (average >= 90 && attendance > 95 && credits >= 15)
    return "Full Scholarship";
  if (average >= 80 && attendance >= 85 && credits >= 12)
    return "Partial Scholarship";
  return "Not Eligible";
}

function mutantM3(student) {
  // M3: Mutate credits >= 15 to credits > 15
  const { average, attendance, credits, disciplinaryAction } = student;
  if (disciplinaryAction) return "Rejected";
  if (average >= 90 && attendance >= 95 && credits > 15)
    return "Full Scholarship";
  if (average >= 80 && attendance >= 85 && credits >= 12)
    return "Partial Scholarship";
  return "Not Eligible";
}

function mutantM4(student) {
  // M4: Mutate logical operator && to || in second condition of Full Scholarship
  const { average, attendance, credits, disciplinaryAction } = student;
  if (disciplinaryAction) return "Rejected";
  if ((average >= 90 || attendance >= 95) && credits >= 15)
    return "Full Scholarship";
  if (average >= 80 && attendance >= 85 && credits >= 12)
    return "Partial Scholarship";
  return "Not Eligible";
}

function mutantM5(student) {
  // M5: Mutate return value from "Full Scholarship" to ""
  const { average, attendance, credits, disciplinaryAction } = student;
  if (disciplinaryAction) return "Rejected";
  if (average >= 90 && attendance >= 95 && credits >= 15)
    return "";
  if (average >= 80 && attendance >= 85 && credits >= 12)
    return "Partial Scholarship";
  return "Not Eligible";
}

describe("Question 12: First-Order Mutation Testing of Scholarship Rules", () => {
  // Baseline tests for original module
  describe("Original evaluateScholarship baseline functionality", () => {
    test("awards Full Scholarship for qualifying student", () => {
      expect(
        evaluateScholarship({ average: 95, attendance: 98, credits: 16, disciplinaryAction: false })
      ).toBe("Full Scholarship");
    });

    test("awards Partial Scholarship for qualifying student", () => {
      expect(
        evaluateScholarship({ average: 85, attendance: 88, credits: 13, disciplinaryAction: false })
      ).toBe("Partial Scholarship");
    });

    test("returns Not Eligible for low metrics", () => {
      expect(
        evaluateScholarship({ average: 70, attendance: 75, credits: 10, disciplinaryAction: false })
      ).toBe("Not Eligible");
    });

    test("rejects when disciplinaryAction is true", () => {
      expect(
        evaluateScholarship({ average: 95, attendance: 98, credits: 16, disciplinaryAction: true })
      ).toBe("Rejected");
    });
  });

  // Task 3: Five targeted tests designed to kill surviving mutants M1-M5
  describe("Targeted tests killing first-order mutants M1 through M5", () => {
    test("Kills M1 (average >= 90 mutated to > 90) using exact boundary average 90", () => {
      const killingInput = { average: 90, attendance: 96, credits: 16, disciplinaryAction: false };
      const originalOutput = evaluateScholarship(killingInput);
      const mutantOutput = mutantM1(killingInput);

      expect(originalOutput).toBe("Full Scholarship");
      expect(mutantOutput).toBe("Partial Scholarship");
      expect(originalOutput).not.toBe(mutantOutput);
    });

    test("Kills M2 (attendance >= 95 mutated to > 95) using exact boundary attendance 95", () => {
      const killingInput = { average: 92, attendance: 95, credits: 16, disciplinaryAction: false };
      const originalOutput = evaluateScholarship(killingInput);
      const mutantOutput = mutantM2(killingInput);

      expect(originalOutput).toBe("Full Scholarship");
      expect(mutantOutput).toBe("Partial Scholarship");
      expect(originalOutput).not.toBe(mutantOutput);
    });

    test("Kills M3 (credits >= 15 mutated to > 15) using exact boundary credits 15", () => {
      const killingInput = { average: 92, attendance: 96, credits: 15, disciplinaryAction: false };
      const originalOutput = evaluateScholarship(killingInput);
      const mutantOutput = mutantM3(killingInput);

      expect(originalOutput).toBe("Full Scholarship");
      expect(mutantOutput).toBe("Partial Scholarship");
      expect(originalOutput).not.toBe(mutantOutput);
    });

    test("Kills M4 (&& mutated to ||) using average 92 with failing attendance 80", () => {
      const killingInput = { average: 92, attendance: 80, credits: 16, disciplinaryAction: false };
      const originalOutput = evaluateScholarship(killingInput);
      const mutantOutput = mutantM4(killingInput);

      expect(originalOutput).toBe("Not Eligible");
      expect(mutantOutput).toBe("Full Scholarship");
      expect(originalOutput).not.toBe(mutantOutput);
    });

    test("Kills M5 (return value mutated to empty string) using full scholarship input", () => {
      const killingInput = { average: 95, attendance: 98, credits: 16, disciplinaryAction: false };
      const originalOutput = evaluateScholarship(killingInput);
      const mutantOutput = mutantM5(killingInput);

      expect(originalOutput).toBe("Full Scholarship");
      expect(mutantOutput).toBe("");
      expect(originalOutput).not.toBe(mutantOutput);
    });
  });
  // Input validation coverage
  describe("Input validation error checks", () => {
    const validStudent = { average: 85, attendance: 90, credits: 15, disciplinaryAction: false };

    test("rejects invalid student object", () => {
      expect(() => evaluateScholarship(null)).toThrow(TypeError);
      expect(() => evaluateScholarship(undefined)).toThrow(TypeError);
      expect(() => evaluateScholarship([])).toThrow(TypeError);
    });

    test("rejects invalid average", () => {
      expect(() => evaluateScholarship({ ...validStudent, average: "90" })).toThrow(TypeError);
      expect(() => evaluateScholarship({ ...validStudent, average: -1 })).toThrow(RangeError);
      expect(() => evaluateScholarship({ ...validStudent, average: 101 })).toThrow(RangeError);
      expect(() => evaluateScholarship({ ...validStudent, average: NaN })).toThrow(TypeError);
    });

    test("rejects invalid attendance", () => {
      expect(() => evaluateScholarship({ ...validStudent, attendance: "85" })).toThrow(TypeError);
      expect(() => evaluateScholarship({ ...validStudent, attendance: -1 })).toThrow(RangeError);
      expect(() => evaluateScholarship({ ...validStudent, attendance: 101 })).toThrow(RangeError);
    });

    test("rejects invalid credits", () => {
      expect(() => evaluateScholarship({ ...validStudent, credits: "15" })).toThrow(TypeError);
      expect(() => evaluateScholarship({ ...validStudent, credits: -1 })).toThrow(RangeError);
      expect(() => evaluateScholarship({ ...validStudent, credits: 15.5 })).toThrow(RangeError);
    });

    test("rejects non-boolean disciplinaryAction", () => {
      expect(() => evaluateScholarship({ ...validStudent, disciplinaryAction: "false" })).toThrow(TypeError);
    });
  });
});
