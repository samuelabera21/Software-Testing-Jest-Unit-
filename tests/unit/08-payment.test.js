import { processPayment } from "../../src/08-payment.js";

describe("Tuition Payment Rules and Data Combinations", () => {
  // Task 1: describe.each() for payment methods and test.each() for domestic/international
  describe.each([
    {
      method: "card",
      cases: [
        { desc: "standard amount domestic", amount: 100, isInternational: false, expected: 102.50 },
        { desc: "standard amount international", amount: 100, isInternational: true, expected: 104.00 },
        { desc: "decimal amount domestic", amount: 100.55, isInternational: false, expected: 103.06 },
        { desc: "decimal amount international", amount: 100.55, isInternational: true, expected: 104.57 },
        { desc: "large amount domestic", amount: 100000, isInternational: false, expected: 102500.00 },
        { desc: "large amount international", amount: 100000, isInternational: true, expected: 104000.00 }
      ]
    },
    {
      method: "bank",
      cases: [
        { desc: "standard amount domestic", amount: 100, isInternational: false, expected: 110.00 },
        { desc: "standard amount international", amount: 100, isInternational: true, expected: 111.50 },
        { desc: "decimal amount domestic", amount: 100.55, isInternational: false, expected: 110.55 },
        { desc: "decimal amount international", amount: 100.55, isInternational: true, expected: 112.06 },
        { desc: "large amount domestic", amount: 100000, isInternational: false, expected: 100010.00 },
        { desc: "large amount international", amount: 100000, isInternational: true, expected: 101510.00 }
      ]
    }
  ])("Payment method: $method", ({ method, cases }) => {
    test.each(cases)("$desc (amount: $amount, intl: $isInternational) -> $expected", ({ amount, isInternational, expected }) => {
      const total = processPayment(amount, method, isInternational);
      expect(total).toBe(expected);
    });
  });

  // Task 2 & 3: Invalid amounts, missing arguments, unsupported methods, exact type validation
  describe("Invalid inputs, boundaries, and validation errors", () => {
    test("rejects amount 0 with exact message", () => {
      expect(() => processPayment(0, "card", false)).toThrow("Amount must be greater than zero");
    });

    test("rejects negative amount with exact message", () => {
      expect(() => processPayment(-50, "bank", false)).toThrow("Amount must be greater than zero");
    });

    test("rejects non-numeric string amount with exact message", () => {
      expect(() => processPayment("100", "card", false)).toThrow("Amount must be a finite number");
    });

    test("rejects NaN amount with exact message", () => {
      expect(() => processPayment(NaN, "card", false)).toThrow("Amount must be a finite number");
    });

    test("rejects Infinity amount with exact message", () => {
      expect(() => processPayment(Infinity, "bank", false)).toThrow("Amount must be a finite number");
    });

    test("rejects unsupported payment method with exact message", () => {
      expect(() => processPayment(100, "crypto", false)).toThrow("Unsupported payment method");
    });

    test("rejects non-string payment method with exact message", () => {
      expect(() => processPayment(100, 123, false)).toThrow("Payment method must be a string");
    });

    test("rejects non-boolean isInternational with exact message", () => {
      expect(() => processPayment(100, "card", "true")).toThrow("isInternational must be a Boolean");
    });

    test("rejects missing arguments (undefined)", () => {
      expect(() => processPayment()).toThrow(TypeError);
      expect(() => processPayment(100)).toThrow(TypeError);
      expect(() => processPayment(100, "card")).toThrow(TypeError);
    });
  });
});
