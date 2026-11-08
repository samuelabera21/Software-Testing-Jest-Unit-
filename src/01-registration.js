export function registerStudent(student) {
  // 1. Validate student object
  if (
    student === null ||
    typeof student !== "object" ||
    Array.isArray(student)
  ) {
    throw new TypeError("Invalid student object");
  }

  // 2. Validate student ID
  if (typeof student.id !== "number") {
    throw new TypeError("Student ID must be a number");
  }

  if (!Number.isSafeInteger(student.id) || student.id <= 0) {
    throw new RangeError("Student ID must be a positive safe integer");
  }

  // 3. Validate student name
  if (typeof student.name !== "string") {
    throw new TypeError("Student name must be a string");
  }

  if (student.name.trim() === "") {
    throw new Error("Student name is required");
  }

  // 4. Validate age
  if (typeof student.age !== "number") {
    throw new TypeError("Student age must be a number");
  }

  if (
    !Number.isInteger(student.age) ||
    student.age < 18 ||
    student.age > 120
  ) {
    throw new RangeError("Student age must be an integer from 18 to 120");
  }

  // 5. Validate email
  if (typeof student.email !== "string") {
    throw new TypeError("Student email must be a string");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(student.email)) {
    throw new TypeError("Invalid email");
  }

  // 6. Return registered student
  return {
    id: student.id,
    name: student.name.trim(),
    age: student.age,
    email: student.email.toLowerCase(),
    status: "Registered"
  };
}
