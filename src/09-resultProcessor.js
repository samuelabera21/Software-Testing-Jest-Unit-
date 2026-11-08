export function processResult(scores) {
  if (!Array.isArray(scores)) {
    throw new TypeError("Scores must be an array");
  }

  for (const score of scores) {
    if (typeof score !== "number" || !Number.isFinite(score)) {
      throw new TypeError("Each score must be a finite number");
    }
    if (score < 0 || score > 100) {
      throw new RangeError("Each score must be between 0 and 100");
    }
  }

  if (scores.length === 0) {
    return { average: 0, status: "No Scores" };
  }

  const sum = scores.reduce((total, score) => total + score, 0);
  const average = sum / scores.length;

  return {
    average,
    status: average >= 50 ? "Pass" : "Fail"
  };
}
