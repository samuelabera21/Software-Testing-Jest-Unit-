import { checkEligibility } from "../../src/13-eligibility.js";

// FOM 1: age relational operator mutated (>= to >)
function mutantFOM1(age, score, hasDocument) {
  if (age > 18 && score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

// FOM 2: score relational operator mutated (>= to >)
function mutantFOM2(age, score, hasDocument) {
  if (age >= 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

// FOM 3: first logical connector mutated (&& to ||)
function mutantFOM3(age, score, hasDocument) {
  if ((age >= 18 || score >= 60) && hasDocument) return "Eligible";
  return "Not Eligible";
}

// SOM (Second-Order Mutant): combines both relational changes
function mutantSOM(age, score, hasDocument) {
  if (age > 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

// TOM (Third-Order Mutant): combines both relational changes and first logical connector change
function mutantTOM(age, score, hasDocument) {
  if ((age > 18 || score > 60) && hasDocument) return "Eligible";
  return "Not Eligible";
}

describe("Question 13: First-Order and Higher-Order Mutant Investigation", () => {
  // Task 1: Baseline tests for checkEligibility()
  describe("Baseline tests for original checkEligibility", () => {
    test("returns Eligible when all conditions are satisfied", () => {
      expect(checkEligibility(20, 75, true)).toBe("Eligible");
    });

    test("returns Eligible at exact boundary age 18 and score 60", () => {
      expect(checkEligibility(18, 60, true)).toBe("Eligible");
    });

    test("returns Not Eligible when age is below 18", () => {
      expect(checkEligibility(17, 75, true)).toBe("Not Eligible");
    });

    test("returns Not Eligible when score is below 60", () => {
      expect(checkEligibility(20, 59, true)).toBe("Not Eligible");
    });

    test("returns Not Eligible when hasDocument is false", () => {
      expect(checkEligibility(20, 75, false)).toBe("Not Eligible");
    });
  });

  // Task 3: Parameterized killing comparison using test.each()
  describe("Killing each mutant with distinguishing inputs via test.each()", () => {
    const killingCases = [
      {
        mutantName: "FOM1 (age >= mutated to >)",
        mutantFn: mutantFOM1,
        input: [18, 70, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible"
      },
      {
        mutantName: "FOM2 (score >= mutated to >)",
        mutantFn: mutantFOM2,
        input: [22, 60, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible"
      },
      {
        mutantName: "FOM3 (first && mutated to ||)",
        mutantFn: mutantFOM3,
        input: [16, 75, true],
        expectedOriginal: "Not Eligible",
        expectedMutant: "Eligible"
      },
      {
        mutantName: "SOM (relational changes combined: age > 18 && score > 60)",
        mutantFn: mutantSOM,
        input: [18, 60, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible"
      },
      {
        mutantName: "TOM (relational + logical changes combined: (age > 18 || score > 60))",
        mutantFn: mutantTOM,
        input: [16, 75, true],
        expectedOriginal: "Not Eligible",
        expectedMutant: "Eligible"
      }
    ];

    test.each(killingCases)(
      "kills $mutantName on input $input",
      ({ mutantFn, input, expectedOriginal, expectedMutant }) => {
        const originalOutput = checkEligibility(...input);
        const mutantOutput = mutantFn(...input);

        expect(originalOutput).toBe(expectedOriginal);
        expect(mutantOutput).toBe(expectedMutant);
        expect(originalOutput).not.toBe(mutantOutput);
      }
    );
  });
});
