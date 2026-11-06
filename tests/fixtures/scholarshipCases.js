// 20+ object-based test cases covering all 4 outcomes and threshold boundaries
export const scholarshipCases = [
  // Full Scholarship cases (average >= 90, attendance >= 95, credits >= 15, disciplinaryAction = false)
  {
    description: "exact minimum thresholds for Full Scholarship",
    student: { average: 90, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "maximum values well above Full Scholarship threshold",
    student: { average: 100, attendance: 100, credits: 24, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "comfortably above Full Scholarship threshold",
    student: { average: 95, attendance: 98, credits: 18, disciplinaryAction: false },
    expected: "Full Scholarship"
  },

  // Single-condition failures for Full Scholarship that drop to Partial Scholarship
  {
    description: "average 89 (just below full average 90) but meets partial",
    student: { average: 89, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "attendance 94 (just below full attendance 95) but meets partial",
    student: { average: 92, attendance: 94, credits: 16, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "credits 14 (just below full credits 15) but meets partial",
    student: { average: 93, attendance: 96, credits: 14, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },

  // Partial Scholarship threshold cases (average >= 80, attendance >= 85, credits >= 12)
  {
    description: "exact minimum thresholds for Partial Scholarship",
    student: { average: 80, attendance: 85, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "comfortably above Partial Scholarship threshold",
    student: { average: 85, attendance: 90, credits: 13, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },

  // Single-condition failures for Partial Scholarship that drop to Not Eligible
  {
    description: "average 79.9 (below partial average 80) -> Not Eligible",
    student: { average: 79.9, attendance: 90, credits: 14, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "attendance 84.9 (below partial attendance 85) -> Not Eligible",
    student: { average: 85, attendance: 84.9, credits: 14, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "credits 11 (below partial credits 12) -> Not Eligible",
    student: { average: 85, attendance: 90, credits: 11, disciplinaryAction: false },
    expected: "Not Eligible"
  },

  // Not Eligible cases (multiple failures or zeroes)
  {
    description: "average below 80, attendance below 85, credits below 12",
    student: { average: 70, attendance: 75, credits: 10, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "minimum zero values with no disciplinary action",
    student: { average: 0, attendance: 0, credits: 0, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "high average but low attendance and low credits",
    student: { average: 95, attendance: 60, credits: 6, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "high attendance and credits but failing average",
    student: { average: 50, attendance: 98, credits: 20, disciplinaryAction: false },
    expected: "Not Eligible"
  },

  // Disciplinary Action = true overrides (always "Rejected")
  {
    description: "disciplinaryAction = true with full scholarship qualifications",
    student: { average: 98, attendance: 98, credits: 18, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "disciplinaryAction = true at exact full scholarship boundary",
    student: { average: 90, attendance: 95, credits: 15, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "disciplinaryAction = true with partial scholarship qualifications",
    student: { average: 85, attendance: 88, credits: 14, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "disciplinaryAction = true at exact partial scholarship boundary",
    student: { average: 80, attendance: 85, credits: 12, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "disciplinaryAction = true with not eligible qualifications",
    student: { average: 60, attendance: 50, credits: 8, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "disciplinaryAction = true with 0 values",
    student: { average: 0, attendance: 0, credits: 0, disciplinaryAction: true },
    expected: "Rejected"
  }
];

