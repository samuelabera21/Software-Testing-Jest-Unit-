import { jest } from "@jest/globals";
import { EnrollmentManager } from "../../src/04-enrollment.js";

describe("EnrollmentManager", () => {
  let notifier;
  let manager;

  beforeEach(() => {
    notifier = {
      send: jest.fn()
    };
    manager = new EnrollmentManager(notifier);
  });

  // 1. Mock notifier.send; verify enrollment record, notification text, call args, and call count
  test("enrolls a student and sends notification with correct arguments and call count", () => {
    const record = manager.enroll("S101", "CS101");

    expect(record).toEqual({ studentId: "S101", courseId: "CS101" });
    expect(notifier.send).toHaveBeenCalledTimes(1);
    expect(notifier.send).toHaveBeenCalledWith("S101", "Enrolled in course CS101");
    expect(manager.getEnrollments("S101")).toEqual([{ studentId: "S101", courseId: "CS101" }]);
  });

  // 2. Reject duplicate studentId/courseId pairs
  test("rejects duplicate studentId/courseId pair without creating duplicate or re-notifying", () => {
    manager.enroll("S101", "CS101");
    expect(notifier.send).toHaveBeenCalledTimes(1);

    expect(() => manager.enroll("S101", "CS101")).toThrow("Already enrolled");
    expect(notifier.send).toHaveBeenCalledTimes(1);
    expect(manager.getEnrollments("S101")).toHaveLength(1);
  });

  // 3. Two different students sharing a course is permitted
  test("allows two different students to enroll in the same course", () => {
    manager.enroll("S101", "CS101");
    manager.enroll("S102", "CS101");

    expect(notifier.send).toHaveBeenCalledTimes(2);
    expect(manager.getEnrollments("S101")).toHaveLength(1);
    expect(manager.getEnrollments("S102")).toHaveLength(1);
  });

  // 4. One student enrolling in multiple different courses
  test("allows a student to enroll in multiple distinct courses", () => {
    manager.enroll("S101", "CS101");
    manager.enroll("S101", "MATH201");

    expect(notifier.send).toHaveBeenCalledTimes(2);
    expect(manager.getEnrollments("S101")).toHaveLength(2);
  });

  // 5. Rollback on notification failure
  test("rolls back enrollment and rethrows when notifier throws an error", () => {
    notifier.send.mockImplementation(() => {
      throw new Error("Notification service down");
    });

    expect(() => manager.enroll("S101", "CS101")).toThrow("Notification service down");
    // State must be rolled back: enrollment must not exist
    expect(manager.getEnrollments("S101")).toEqual([]);
  });

  // 6. unenroll removes matching enrollment and returns true
  test("unenroll returns true and removes enrollment when match is found", () => {
    manager.enroll("S101", "CS101");
    manager.enroll("S101", "CS102");

    const result = manager.unenroll("S101", "CS101");
    expect(result).toBe(true);
    expect(manager.getEnrollments("S101")).toEqual([{ studentId: "S101", courseId: "CS102" }]);
  });

  // 7. unenroll returns false when no matching enrollment exists
  test("unenroll returns false when enrollment does not exist", () => {
    manager.enroll("S101", "CS101");
    const result = manager.unenroll("S101", "MATH101");
    expect(result).toBe(false);
    expect(manager.getEnrollments("S101")).toHaveLength(1);
  });

  // 8. unenroll returns false for non-existent student
  test("unenroll returns false for an unknown student", () => {
    const result = manager.unenroll("Unknown", "CS101");
    expect(result).toBe(false);
  });

  // 9. Defensive copies from getEnrollments()
  test("returns defensive copies from getEnrollments to prevent external mutation", () => {
    manager.enroll("S101", "CS101");
    const list = manager.getEnrollments("S101");
    list.push({ studentId: "S101", courseId: "HACKED" });
    if (list[0]) {
      list[0].courseId = "MUTATED";
    }

    const freshList = manager.getEnrollments("S101");
    expect(freshList).toHaveLength(1);
    expect(freshList[0]).toEqual({ studentId: "S101", courseId: "CS101" });
  });

  // 10. Instance test isolation
  test("maintains isolated state between different EnrollmentManager instances", () => {
    const manager2 = new EnrollmentManager(notifier);
    manager.enroll("S101", "CS101");

    expect(manager2.getEnrollments("S101")).toEqual([]);
  });
});

