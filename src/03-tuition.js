// Helper function to round monetary values to two decimal places
function roundToTwo(value) {
  return Number(Math.round(value + "e2") + "e-2");
}

export function calculateTuition(courses, scholarshipRate = 0) {
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  if (scholarshipRate === null || typeof scholarshipRate !== "number" || !Number.isFinite(scholarshipRate)) {
    throw new TypeError("Scholarship rate must be a finite number");
  }

  if (scholarshipRate < 0 || scholarshipRate > 1) {
    throw new RangeError("Scholarship rate must be between 0 and 1");
  }

  for (const course of courses) {
    if (typeof course.creditHours !== "number") {
      throw new TypeError("Credit hours must be a number");
    }
    if (!Number.isInteger(course.creditHours) || course.creditHours < 0) {
      throw new RangeError("Credit hours must be a nonnegative integer");
    }
    if (typeof course.pricePerCredit !== "number" || !Number.isFinite(course.pricePerCredit)) {
      throw new TypeError("Price per credit must be a finite number");
    }
    if (course.pricePerCredit < 0) {
      throw new RangeError("Price per credit must be nonnegative");
    }
  }

  const rawSubtotal = courses.reduce(
    (sum, course) => sum + course.creditHours * course.pricePerCredit,
    0
  );

  const subtotal = roundToTwo(rawSubtotal);
  const discount = roundToTwo(subtotal * scholarshipRate);
  const payable = roundToTwo(subtotal - discount);

  return { subtotal, discount, payable };
}

export function findMostExpensiveCourse(courses) {
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  if (courses.length === 0) {
    return null;
  }

  let mostExpensive = courses[0];
  let highestCost = courses[0].creditHours * courses[0].pricePerCredit;

  for (let i = 1; i < courses.length; i++) {
    const cost = courses[i].creditHours * courses[i].pricePerCredit;
    if (cost > highestCost) {
      highestCost = cost;
      mostExpensive = courses[i];
    }
  }

  return mostExpensive;
}
