import { evaluateAdmission } from "../../src/10-admission.js";

describe("Admission System Coverage Improvement", () => {
  // Baseline tests (Task 1)
  describe("Initial successful-admission tests", () => {
    test("accepts domestic applicant with scholarship (score >= 90)", () => {
      const applicant = {
        age: 20,
        score: 95,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: true
      });
    });

    test("accepts domestic applicant without scholarship (score < 90)", () => {
      const applicant = {
        age: 20,
        score: 80,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });
  });

  // Task 2 & 3: Comprehensive branch and boundary tests targeting 100% coverage
  describe("Boundary and full branch coverage tests", () => {
    const baseApplicant = {
      age: 20,
      score: 80,
      hasCertificate: true,
      applicationFeePaid: true,
      isInternational: false
    };

    // Age boundaries (17 vs 18)
    test("rejects underage applicant at boundary age 17", () => {
      const result = evaluateAdmission({ ...baseApplicant, age: 17 });
      expect(result).toEqual({ status: "Rejected", reason: "Underage" });
    });

    test("accepts applicant at exact boundary age 18", () => {
      const result = evaluateAdmission({ ...baseApplicant, age: 18 });
      expect(result).toEqual({ status: "Accepted", scholarship: false });
    });

    // Score boundaries for rejection (59 vs 60)
    test("rejects applicant with score 59 as Low Score", () => {
      const result = evaluateAdmission({ ...baseApplicant, score: 59 });
      expect(result).toEqual({ status: "Rejected", reason: "Low Score" });
    });

    test("proceeds when applicant score is exactly 60", () => {
      const result = evaluateAdmission({ ...baseApplicant, score: 60 });
      expect(result).toEqual({ status: "Accepted", scholarship: false });
    });

    // Missing certificate
    test("returns Pending with Missing Certificate when hasCertificate is false", () => {
      const result = evaluateAdmission({ ...baseApplicant, hasCertificate: false });
      expect(result).toEqual({ status: "Pending", reason: "Missing Certificate" });
    });

    // Application fee not paid
    test("returns Pending with Payment Required when applicationFeePaid is false", () => {
      const result = evaluateAdmission({ ...baseApplicant, applicationFeePaid: false });
      expect(result).toEqual({ status: "Pending", reason: "Payment Required" });
    });

    // International review boundaries (isInternational && score < 75)
    test("returns International Review for international applicant with score 74", () => {
      const result = evaluateAdmission({
        ...baseApplicant,
        isInternational: true,
        score: 74
      });
      expect(result).toEqual({ status: "Pending", reason: "International Review" });
    });

    test("does not trigger International Review for international applicant with score 75", () => {
      const result = evaluateAdmission({
        ...baseApplicant,
        isInternational: true,
        score: 75
      });
      expect(result).toEqual({ status: "Accepted", scholarship: false });
    });

    test("does not trigger International Review for domestic applicant with score 74", () => {
      const result = evaluateAdmission({
        ...baseApplicant,
        isInternational: false,
        score: 74
      });
      expect(result).toEqual({ status: "Accepted", scholarship: false });
    });

    // Scholarship score boundaries (89 vs 90)
    test("boundary score 89 receives no scholarship", () => {
      const result = evaluateAdmission({ ...baseApplicant, score: 89 });
      expect(result).toEqual({ status: "Accepted", scholarship: false });
    });

    test("boundary score 90 receives scholarship", () => {
      const result = evaluateAdmission({ ...baseApplicant, score: 90 });
      expect(result).toEqual({ status: "Accepted", scholarship: true });
    });
  });
});
