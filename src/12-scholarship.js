export function evaluateScholarship(student) {
  if (!student || typeof student !== "object" || Array.isArray(student)) {
    throw new TypeError("Student must be a valid object");
  }

  const { average, attendance, credits, disciplinaryAction } = student;

  // Validate average
  if (typeof average !== "number" || !Number.isFinite(average)) {
    throw new TypeError("Average must be a finite number");
  }
  if (average < 0 || average > 100) {
    throw new RangeError("Average must be between 0 and 100");
  }

  // Validate attendance
  if (typeof attendance !== "number" || !Number.isFinite(attendance)) {
    throw new TypeError("Attendance must be a finite number");
  }
  if (attendance < 0 || attendance > 100) {
    throw new RangeError("Attendance must be between 0 and 100");
  }

  // Validate credits
  if (typeof credits !== "number" || !Number.isFinite(credits)) {
    throw new TypeError("Credits must be a number");
  }
  if (!Number.isInteger(credits) || credits < 0) {
    throw new RangeError("Credits must be a nonnegative integer");
  }

  // Validate disciplinaryAction
  if (typeof disciplinaryAction !== "boolean") {
    throw new TypeError("disciplinaryAction must be a Boolean");
  }

  // Decision logic
  if (disciplinaryAction) {
    return "Rejected";
  }

  if (average >= 90 && attendance >= 95 && credits >= 15) {
    return "Full Scholarship";
  }

  if (average >= 80 && attendance >= 85 && credits >= 12) {
    return "Partial Scholarship";
  }

  return "Not Eligible";
}
