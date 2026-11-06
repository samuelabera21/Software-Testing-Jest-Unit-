import { processPayment } from "../../src/14-payment.js";

function roundToTwo(value) {
  return Number(Math.round(value + "e2") + "e-2");
}

// Mutants representing typical mutation operators in StrykerJS
const paymentMutants = {
  // M1: Boundary operator (<= 0 mutated to < 0)
  m1_amountBoundary: (amount, method, isInternational) => {
    if (amount < 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (isInternational) fee += amount * 0.015;
    return roundToTwo(amount + fee);
  },

  // M2: Card fee multiplier arithmetic (0.025 mutated to 0.020)
  m2_cardFeeRate: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.020 : 10;
    if (isInternational) fee += amount * 0.015;
    return roundToTwo(amount + fee);
  },

  // M3: Bank flat fee mutated (10 mutated to 0)
  m3_bankFlatFee: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 0;
    if (isInternational) fee += amount * 0.015;
    return roundToTwo(amount + fee);
  },

  // M4: International condition negation (isInternational mutated to !isInternational)
  m4_intlNegated: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (!isInternational) fee += amount * 0.015;
    return roundToTwo(amount + fee);
  },

  // M5: International fee assignment instead of accumulation (+= mutated to =)
  m5_intlAssignment: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (isInternational) fee = amount * 0.015;
    return roundToTwo(amount + fee);
  },

  // M6: International fee multiplier arithmetic (0.015 mutated to 0.025)
  m6_intlRate: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (isInternational) fee += amount * 0.025;
    return roundToTwo(amount + fee);
  },

  // M7: Total payment arithmetic (+ fee mutated to - fee)
  m7_totalSubtraction: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (isInternational) fee += amount * 0.015;
    return roundToTwo(amount - fee);
  },

  // M8: Unsupported payment method error removed (mutated to allow fallback)
  m8_methodBypass: (amount, method, isInternational) => {
    if (amount <= 0) throw new RangeError("Amount must be greater than zero");
    let fee = method === "card" ? amount * 0.025 : 10;
    if (isInternational) fee += amount * 0.015;
    return roundToTwo(amount + fee);
  }
};

describe("Question 14: Mutation Score Improvement Project", () => {
  // Baseline tests confirming processPayment works as expected
  describe("Baseline payment functionality", () => {
    test("calculates card payment domestic", () => {
      expect(processPayment(100, "card", false)).toBe(102.50);
    });

    test("calculates bank payment domestic", () => {
      expect(processPayment(100, "bank", false)).toBe(110.00);
    });

    test("calculates card payment international", () => {
      expect(processPayment(100, "card", true)).toBe(104.00);
    });

    test("calculates bank payment international", () => {
      expect(processPayment(100, "bank", true)).toBe(111.50);
    });
  });

  // Type checking and validation
  describe("Type checking and validation", () => {
    test("rejects non-numeric amount", () => {
      expect(() => processPayment("100", "card", false)).toThrow(TypeError);
    });

    test("rejects non-string method", () => {
      expect(() => processPayment(100, 123, false)).toThrow(TypeError);
    });

    test("rejects non-boolean isInternational", () => {
      expect(() => processPayment(100, "card", "true")).toThrow(TypeError);
    });
  });

  // Task 3: At least eight targeted tests killing mutants
  describe("Targeted tests killing arithmetic, conditional, and method mutants", () => {
    test("Kills M1 (amount <= 0 boundary mutant) by testing amount exactly 0", () => {
      expect(() => processPayment(0, "card", false)).toThrow(RangeError);
      expect(() => paymentMutants.m1_amountBoundary(0, "card", false)).not.toThrow();
    });

    test("Kills M2 (card fee multiplier mutant) with exact fee expectation", () => {
      const orig = processPayment(200, "card", false);
      const mut = paymentMutants.m2_cardFeeRate(200, "card", false);
      expect(orig).toBe(205.00);
      expect(mut).toBe(204.00);
      expect(orig).not.toBe(mut);
    });

    test("Kills M3 (bank flat fee mutant) verifying 10 flat charge", () => {
      const orig = processPayment(50, "bank", false);
      const mut = paymentMutants.m3_bankFlatFee(50, "bank", false);
      expect(orig).toBe(60.00);
      expect(mut).toBe(50.00);
      expect(orig).not.toBe(mut);
    });

    test("Kills M4 (isInternational condition negation) by checking international = false", () => {
      const orig = processPayment(100, "card", false);
      const mut = paymentMutants.m4_intlNegated(100, "card", false);
      expect(orig).toBe(102.50);
      expect(mut).toBe(104.00);
      expect(orig).not.toBe(mut);
    });

    test("Kills M5 (intl fee assignment mutant) on bank international payment", () => {
      const orig = processPayment(100, "bank", true);
      const mut = paymentMutants.m5_intlAssignment(100, "bank", true);
      expect(orig).toBe(111.50);
      expect(mut).toBe(101.50);
      expect(orig).not.toBe(mut);
    });

    test("Kills M6 (intl fee multiplier mutant) with precision assertion", () => {
      const orig = processPayment(1000, "card", true);
      const mut = paymentMutants.m6_intlRate(1000, "card", true);
      expect(orig).toBe(1040.00);
      expect(mut).toBe(1050.00);
      expect(orig).not.toBe(mut);
    });

    test("Kills M7 (total calculation arithmetic mutant) verifying total exceeds principal", () => {
      const orig = processPayment(100, "card", false);
      const mut = paymentMutants.m7_totalSubtraction(100, "card", false);
      expect(orig).toBe(102.50);
      expect(mut).toBe(97.50);
      expect(orig).not.toBe(mut);
    });

    test("Kills M8 (method bypass mutant) by attempting unsupported method", () => {
      expect(() => processPayment(100, "crypto", false)).toThrow("Unsupported payment method");
      expect(() => paymentMutants.m8_methodBypass(100, "crypto", false)).not.toThrow();
    });
  });
});
