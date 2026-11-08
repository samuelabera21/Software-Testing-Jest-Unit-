function roundToTwo(value) {
  return Number(Math.round(value + "e2") + "e-2");
}

export function processPayment(amount, method, isInternational) {
  // Validate amount type
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    throw new TypeError("Amount must be a finite number");
  }

  // Validate amount range
  if (amount <= 0) {
    throw new RangeError("Amount must be greater than zero");
  }

  // Validate method
  if (typeof method !== "string") {
    throw new TypeError("Payment method must be a string");
  }

  if (method !== "card" && method !== "bank") {
    throw new Error("Unsupported payment method");
  }

  // Validate isInternational
  if (typeof isInternational !== "boolean") {
    throw new TypeError("isInternational must be a Boolean");
  }

  let fee = 0;
  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  }

  if (isInternational) {
    fee += amount * 0.015;
  }

  return roundToTwo(amount + fee);
}
