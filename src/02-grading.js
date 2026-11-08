export class GradeBook {
  constructor(studentId) {
    this.studentId = studentId;
    this.scores = [];
  }

  // Add and validate a score
  addScore(score) {
    if (typeof score !== "number" || !Number.isFinite(score)) {
      throw new TypeError("Score must be a finite number");
    }

    if (score < 0 || score > 100) {
      throw new RangeError("Score must be between 0 and 100");
    }

    this.scores.push(score);
  }

  // Calculate average
  getAverage() {
    if (this.scores.length === 0) return 0;

    const total = this.scores.reduce(
      (sum, score) => sum + score,
      0
    );

    return total / this.scores.length;
  }

  // Return highest score
  getHighestScore() {
    if (this.scores.length === 0) return null;

    return Math.max(...this.scores);
  }

  // Remove one occurrence of the lowest score
  removeLowestScore() {
    if (this.scores.length === 0) return null;

    const lowest = Math.min(...this.scores);
    const index = this.scores.indexOf(lowest);

    this.scores.splice(index, 1);

    return lowest;
  }

  // Check whether a student passes
  static isPassing(average) {
    return average >= 50;
  }
}
