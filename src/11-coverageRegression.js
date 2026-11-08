export function calculateAcademicStanding(gpa, creditsCompleted) {
  if (gpa >= 3.5 && creditsCompleted >= 30) {
    return "Dean's List";
  } else if (gpa >= 2.0) {
    return "Good Standing";
  } else if (gpa >= 1.5) {
    return "Academic Warning";
  } else {
    return "Academic Probation";
  }
}

