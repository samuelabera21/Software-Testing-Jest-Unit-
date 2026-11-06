
import { GradeBook } from "../../src/02-grading.js";

describe("GradeBook", () => {

  // 1. Empty gradebook
  test("starts with an empty score list", () => {
    const book = new GradeBook(101);

    expect(book.scores).toEqual([]);
  });

  // 2. Empty average
  test("returns 0 for an empty gradebook", () => {
    const book = new GradeBook(101);

    expect(book.getAverage()).toBe(0);
  });

  // 3. Empty highest score
  test("returns null for an empty gradebook", () => {
    const book = new GradeBook(101);

    expect(book.getHighestScore()).toBeNull();
  });

  // 4. Single score
  test("calculates average for a single score", () => {
    const book = new GradeBook(101);
    book.addScore(80);

    expect(book.getAverage()).toBe(80);
  });

  // 5. Multiple scores
  test("calculates average for multiple scores", () => {
    const book = new GradeBook(101);

    book.addScore(80);
    book.addScore(90);
    book.addScore(70);

    expect(book.getAverage()).toBe(80);
  });

  // 6. Highest score
  test("returns the highest score", () => {
    const book = new GradeBook(101);

    book.addScore(60);
    book.addScore(95);
    book.addScore(75);

    expect(book.getHighestScore()).toBe(95);
  });

  // 7. Duplicate scores
  test("handles duplicate scores", () => {
    const book = new GradeBook(101);

    book.addScore(80);
    book.addScore(80);
    book.addScore(90);

    expect(book.getAverage()).toBe(250 / 3);
  });

  // 8. Score zero
  test("accepts score 0", () => {
    const book = new GradeBook(101);

    book.addScore(0);

    expect(book.getAverage()).toBe(0);
  });

  // 9. Score 100
  test("accepts score 100", () => {
    const book = new GradeBook(101);

    book.addScore(100);

    expect(book.getHighestScore()).toBe(100);
  });

  // 10. Reject string score
  test("rejects a string score", () => {
    const book = new GradeBook(101);

    expect(() => book.addScore("80")).toThrow(TypeError);
  });

  // 11. Reject negative score
  test("rejects a negative score", () => {
    const book = new GradeBook(101);

    expect(() => book.addScore(-1)).toThrow(RangeError);
  });

  // 12. Reject score above 100
  test("rejects a score above 100", () => {
    const book = new GradeBook(101);

    expect(() => book.addScore(101)).toThrow(RangeError);
  });

  // 13. Reject NaN
  test("rejects NaN", () => {
    const book = new GradeBook(101);

    expect(() => book.addScore(NaN)).toThrow(TypeError);
  });

  // 14. Remove lowest score
  test("removes and returns the lowest score", () => {
    const book = new GradeBook(101);

    book.addScore(40);
    book.addScore(70);
    book.addScore(90);

    expect(book.removeLowestScore()).toBe(40);
    expect(book.scores).toEqual([70, 90]);
  });

  // 15. Remove lowest score when tied
  test("removes only one occurrence of the lowest score", () => {
    const book = new GradeBook(101);

    book.addScore(40);
    book.addScore(40);
    book.addScore(80);

    expect(book.removeLowestScore()).toBe(40);
    expect(book.scores).toEqual([40, 80]);
  });

  // 16. Remove from a single-score gradebook
  test("removes the only score", () => {
    const book = new GradeBook(101);

    book.addScore(75);

    expect(book.removeLowestScore()).toBe(75);
    expect(book.scores).toEqual([]);
  });

  // 17. Remove from an empty gradebook
  test("returns null when removing from an empty gradebook", () => {
    const book = new GradeBook(101);

    expect(book.removeLowestScore()).toBeNull();
  });

  // 18. Passing boundary: 49.99
  test("49.99 is not passing", () => {
    expect(GradeBook.isPassing(49.99)).toBe(false);
  });

  // 19. Passing boundary: 50
  test("50 is passing", () => {
    expect(GradeBook.isPassing(50)).toBe(true);
  });

  // 20. Passing boundary: 50.01
  test("50.01 is passing", () => {
    expect(GradeBook.isPassing(50.01)).toBe(true);
  });

  // 21. Independent GradeBook instances
  test("keeps scores independent between students", () => {
    const student1 = new GradeBook(101);
    const student2 = new GradeBook(102);

    student1.addScore(90);
    student2.addScore(60);

    expect(student1.getAverage()).toBe(90);
    expect(student2.getAverage()).toBe(60);
  });

});
