
import { registerStudent } from "../../src/01-registration.js";

describe("Student Registration", () => {
  const validStudent = {
    id: 101,
    name: " Samuel Abera ",
    age: 22,
    email: "SAMUEL@example.com"
  };

  // 1. Valid registration
  test("registers a valid student successfully", () => {
    const result = registerStudent(validStudent);

    expect(result).toEqual({
      id: 101,
      name: "Samuel Abera",
      age: 22,
      email: "samuel@example.com",
      status: "Registered"
    });
  });

  // 2. Age boundary: 18
  test("accepts a student who is exactly 18", () => {
    expect(registerStudent({ ...validStudent, age: 18 }).age).toBe(18);
  });

  // 3. Age boundary: 120
  test("accepts a student who is exactly 120", () => {
    expect(registerStudent({ ...validStudent, age: 120 }).age).toBe(120);
  });

  // 4. Age below minimum
  test("rejects a student younger than 18", () => {
    expect(() =>
      registerStudent({ ...validStudent, age: 17 })
    ).toThrow(RangeError);
  });

  // 5. Age above maximum
  test("rejects a student older than 120", () => {
    expect(() =>
      registerStudent({ ...validStudent, age: 121 })
    ).toThrow(RangeError);
  });

  // 6. Fractional age
  test("rejects a fractional age", () => {
    expect(() =>
      registerStudent({ ...validStudent, age: 20.5 })
    ).toThrow(RangeError);
  });

  // 7. Blank name
  test("rejects an empty name", () => {
    expect(() =>
      registerStudent({ ...validStudent, name: "" })
    ).toThrow("Student name is required");
  });

  // 8. Whitespace-only name
  test("rejects a whitespace-only name", () => {
    expect(() =>
      registerStudent({ ...validStudent, name: "   " })
    ).toThrow("Student name is required");
  });

  // 9. Incorrect name type
  test("rejects a numeric name", () => {
    expect(() =>
      registerStudent({ ...validStudent, name: 123 })
    ).toThrow(TypeError);
  });

  // 10. Malformed email
  test("rejects an email without a valid domain", () => {
    expect(() =>
      registerStudent({ ...validStudent, email: "samuel@" })
    ).toThrow("Invalid email");
  });

  // 11. Incorrect email type
  test("rejects a numeric email", () => {
    expect(() =>
      registerStudent({ ...validStudent, email: 123 })
    ).toThrow(TypeError);
  });

  // 12. Missing ID
  test("rejects a student without an ID", () => {
    const { id, ...student } = validStudent;

    expect(() => registerStudent(student)).toThrow(TypeError);
  });

  // 13. Invalid ID
  test("rejects a negative student ID", () => {
    expect(() =>
      registerStudent({ ...validStudent, id: -5 })
    ).toThrow(RangeError);
  });

  // 14. Missing email
  test("rejects a student without an email", () => {
    const { email, ...student } = validStudent;

    expect(() => registerStudent(student)).toThrow(TypeError);
  });

  // 15. Missing student object
  test("rejects an undefined student object", () => {
    expect(() => registerStudent(undefined)).toThrow(TypeError);
  });

  // 16. Input immutability
  test("does not modify the original student object", () => {
    const student = {
      ...validStudent,
      name: " Samuel Abera "
    };

    const originalStudent = structuredClone(student);

    registerStudent(student);

    expect(student).toStrictEqual(originalStudent);
  });

  // 17. toEqual() versus toStrictEqual()
  test("demonstrates toEqual and toStrictEqual with nested data", () => {
    const actual = {
      profile: {
        name: "Samuel",
        nickname: undefined
      },
      academic: {
        scores: [85, 90]
      }
    };

    const expected = {
      profile: {
        name: "Samuel"
      },
      academic: {
        scores: [85, 90]
      }
    };

    expect(actual).toEqual(expected);
    expect(actual).not.toStrictEqual(expected);
  });

  
  // 18. String ID
  test("rejects a string student ID", () => {
    expect(() =>
      registerStudent({ ...validStudent, id: "101" })
    ).toThrow(TypeError);
  });

  // 19. Fractional ID
  test("rejects a fractional student ID", () => {
    expect(() =>
      registerStudent({ ...validStudent, id: 10.5 })
    ).toThrow(RangeError);
  });

  // 20. Unsafe integer ID
  test("rejects an unsafe integer student ID", () => {
    expect(() =>
      registerStudent({
        ...validStudent,
        id: Number.MAX_SAFE_INTEGER + 1
      })
    ).toThrow(RangeError);
  });

  // 21. Incorrect age type
  test("rejects a string age", () => {
    expect(() =>
      registerStudent({ ...validStudent, age: "22" })
    ).toThrow(TypeError);
  });

  // 22. Missing name
  test("rejects a student without a name", () => {
    const { name, ...student } = validStudent;

    expect(() => registerStudent(student)).toThrow(TypeError);
  });

});
