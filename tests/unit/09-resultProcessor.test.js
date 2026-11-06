import { processResult } from "../../src/09-resultProcessor.js";

describe("Data-Driven Student Result Processing", () => {
  // Task 1: At least 15 test.each() cases
  const validCases = [
    { id: "TC-01", scores: [], expected: { average: 0, status: "No Scores" } },
    { id: "TC-02", scores: [0], expected: { average: 0, status: "Fail" } },
    { id: "TC-03", scores: [100], expected: { average: 100, status: "Pass" } },
    { id: "TC-04", scores: [50], expected: { average: 50, status: "Pass" } },
    { id: "TC-05", scores: [0, 0], expected: { average: 0, status: "Fail" } },
    { id: "TC-06", scores: [100, 100], expected: { average: 100, status: "Pass" } },
    { id: "TC-07", scores: [70, 70, 70], expected: { average: 70, status: "Pass" } },
    { id: "TC-08", scores: [50.5, 51.5], expected: { average: 51, status: "Pass" } },
    { id: "TC-09", scores: [49.8, 49.9], expected: { average: 49.85, status: "Fail" } },
    { id: "TC-10", scores: [49.5, 50.5], expected: { average: 50, status: "Pass" } },
    { id: "TC-11", scores: [49, 50], expected: { average: 49.5, status: "Fail" } },
    { id: "TC-12", scores: [40, 60], expected: { average: 50, status: "Pass" } },
    { id: "TC-13", scores: [85, 95, 90], expected: { average: 90, status: "Pass" } },
    { id: "TC-14", scores: [20, 30, 40], expected: { average: 30, status: "Fail" } },
    { id: "TC-15", scores: [0, 50, 100], expected: { average: 50, status: "Pass" } },
    { id: "TC-16", scores: [49.99], expected: { average: 49.99, status: "Fail" } }
  ];

  test.each(validCases)(
    "$id: processResult($scores) -> avg: $expected.average, status: $expected.status",
    ({ scores, expected }) => {
      const result = processResult(scores);
      expect(result.average).toBeCloseTo(expected.average, 2);
      expect(result.status).toBe(expected.status);
    }
  );

  // Task 2 & 3: Invalid score types and ranges
  describe("Invalid input validations", () => {
    test("rejects non-array input (null, undefined, number, string)", () => {
      expect(() => processResult(null)).toThrow(TypeError);
      expect(() => processResult(undefined)).toThrow(TypeError);
      expect(() => processResult(80)).toThrow(TypeError);
      expect(() => processResult("80, 90")).toThrow(TypeError);
    });

    test("rejects array containing string elements", () => {
      expect(() => processResult(["80", 90])).toThrow(TypeError);
    });

    test("rejects array containing nested arrays", () => {
      expect(() => processResult([[80], 90])).toThrow(TypeError);
    });

    test("rejects array containing NaN", () => {
      expect(() => processResult([80, NaN])).toThrow(TypeError);
    });

    test("rejects array containing Infinity", () => {
      expect(() => processResult([80, Infinity])).toThrow(TypeError);
    });

    test("rejects scores below 0", () => {
      expect(() => processResult([-5, 80])).toThrow(RangeError);
    });

    test("rejects scores above 100", () => {
      expect(() => processResult([105, 80])).toThrow(RangeError);
    });
  });

  // Task 3: Input array immutability
  test("verifies input scores array is not modified", () => {
    const input = [70, 80, 90];
    const original = [...input];
    processResult(input);
    expect(input).toEqual(original);
  });
});

