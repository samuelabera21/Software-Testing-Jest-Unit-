import { calculateTuition, findMostExpensiveCourse } from "../../src/03-tuition.js";

describe("Tuition Fee Calculation and Array Processing", () => {
  const sampleCourses = [
    { name: "Math", creditHours: 3, pricePerCredit: 100 },
    { name: "Physics", creditHours: 4, pricePerCredit: 150 }
  ];

  // 1. No courses
  test("calculates tuition for zero courses", () => {
    const result = calculateTuition([]);
    expect(result).toEqual({ subtotal: 0, discount: 0, payable: 0 });
  });

  // 2. One course
  test("calculates tuition for one course", () => {
    const courses = [{ name: "Art", creditHours: 3, pricePerCredit: 100 }];
    const result = calculateTuition(courses);
    expect(result).toEqual({ subtotal: 300, discount: 0, payable: 300 });
  });

  // 3. Several courses
  test("calculates tuition for several courses", () => {
    const result = calculateTuition(sampleCourses);
    expect(result).toEqual({ subtotal: 900, discount: 0, payable: 900 });
  });

  // 4. Omitted scholarshipRate defaults to 0
  test("defaults scholarshipRate to 0 when omitted", () => {
    const result = calculateTuition(sampleCourses);
    expect(result.discount).toBe(0);
    expect(result.payable).toBe(900);
  });

  // 5. Undefined scholarshipRate defaults to 0
  test("defaults scholarshipRate to 0 when undefined", () => {
    const result = calculateTuition(sampleCourses, undefined);
    expect(result.discount).toBe(0);
    expect(result.payable).toBe(900);
  });

  // 6. Explicitly reject null as an invalid rate
  test("rejects null as an invalid scholarshipRate", () => {
    expect(() => calculateTuition(sampleCourses, null)).toThrow(TypeError);
  });

  // 7. Reject string scholarshipRate
  test("rejects a string scholarshipRate", () => {
    expect(() => calculateTuition(sampleCourses, "0.2")).toThrow(TypeError);
  });

  // 8. Reject negative scholarshipRate
  test("rejects scholarshipRate below 0", () => {
    expect(() => calculateTuition(sampleCourses, -0.1)).toThrow(RangeError);
  });

  // 9. Reject scholarshipRate above 1
  test("rejects scholarshipRate above 1", () => {
    expect(() => calculateTuition(sampleCourses, 1.1)).toThrow(RangeError);
  });

  // 10. Reject negative creditHours
  test("rejects negative creditHours", () => {
    const courses = [{ name: "Bio", creditHours: -3, pricePerCredit: 100 }];
    expect(() => calculateTuition(courses)).toThrow(RangeError);
  });

  // 11. Reject fractional creditHours
  test("rejects fractional creditHours", () => {
    const courses = [{ name: "Bio", creditHours: 3.5, pricePerCredit: 100 }];
    expect(() => calculateTuition(courses)).toThrow(RangeError);
  });

  // 12. Reject string creditHours
  test("rejects non-numeric creditHours", () => {
    const courses = [{ name: "Bio", creditHours: "3", pricePerCredit: 100 }];
    expect(() => calculateTuition(courses)).toThrow(TypeError);
  });

  // 13. Reject negative pricePerCredit
  test("rejects negative pricePerCredit", () => {
    const courses = [{ name: "Bio", creditHours: 3, pricePerCredit: -50 }];
    expect(() => calculateTuition(courses)).toThrow(RangeError);
  });

  // 14. Reject non-finite pricePerCredit
  test("rejects non-finite pricePerCredit (Infinity / NaN)", () => {
    const courses = [{ name: "Bio", creditHours: 3, pricePerCredit: Infinity }];
    expect(() => calculateTuition(courses)).toThrow(TypeError);
  });

  // 15. Round subtotal, discount, and payable to two decimal places
  test("rounds subtotal, discount, and payable to two decimal places", () => {
    const courses = [{ name: "CS", creditHours: 3, pricePerCredit: 33.333 }];
    // subtotal = 99.999 -> 100.00
    // discount with 0.15 = 14.99985 -> 15.00
    // payable = 85.00
    const result = calculateTuition(courses, 0.15);
    expect(result.subtotal).toBe(100);
    expect(result.discount).toBe(15);
    expect(result.payable).toBe(85);
  });

  // 16. Verify input objects are not mutated
  test("does not mutate input course objects or array", () => {
    const courses = [
      { name: "CS", creditHours: 3, pricePerCredit: 100 }
    ];
    const clone = structuredClone(courses);
    calculateTuition(courses, 0.2);
    expect(courses).toEqual(clone);
  });

  // 17. findMostExpensiveCourse returns null for empty array
  test("findMostExpensiveCourse returns null for an empty array", () => {
    expect(findMostExpensiveCourse([])).toBeNull();
  });

  // 18. findMostExpensiveCourse returns the most expensive course
  test("findMostExpensiveCourse returns course with highest total cost", () => {
    const courses = [
      { name: "A", creditHours: 2, pricePerCredit: 100 }, // 200
      { name: "B", creditHours: 4, pricePerCredit: 100 }, // 400
      { name: "C", creditHours: 3, pricePerCredit: 50 }   // 150
    ];
    expect(findMostExpensiveCourse(courses)).toEqual(courses[1]);
  });

  // 19. findMostExpensiveCourse returns first matching course in a tie
  test("findMostExpensiveCourse returns the first course in a tie", () => {
    const courses = [
      { name: "First", creditHours: 2, pricePerCredit: 150 },  // 300
      { name: "Second", creditHours: 3, pricePerCredit: 100 }, // 300
      { name: "Third", creditHours: 1, pricePerCredit: 200 }   // 200
    ];
    expect(findMostExpensiveCourse(courses)).toEqual(courses[0]);
  });

  // 20. Non-array courses argument rejected
  test("rejects non-array courses input", () => {
    expect(() => calculateTuition(null)).toThrow(TypeError);
    expect(() => findMostExpensiveCourse(null)).toThrow(TypeError);
  });
});

