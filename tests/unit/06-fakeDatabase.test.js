import { jest } from "@jest/globals";
import { FakeDatabase } from "../../src/06-fakeDatabase.js";

describe("FakeDatabase Lifecycle and Isolation", () => {
  let db;
  const hookLog = [];

  beforeAll(() => {
    hookLog.push("outer:beforeAll");
    db = new FakeDatabase();
    db.connect();
  });

  beforeEach(() => {
    hookLog.push("outer:beforeEach");
    db.clear();
  });

  afterEach(() => {
    hookLog.push("outer:afterEach");
  });

  afterAll(() => {
    hookLog.push("outer:afterAll");
    db.disconnect();
  });

  // Task 2: Successful insert when connected
  test("inserts records successfully when connected", () => {
    db.insert({ id: 1, name: "Database Systems" });
    expect(db.records).toHaveLength(1);
    expect(db.records[0]).toEqual({ id: 1, name: "Database Systems" });
  });

  // Task 2: No record leakage between tests
  test("verifies no record leakage from previous tests", () => {
    expect(db.records).toHaveLength(0);
  });

  // Task 2: Rejection when disconnected
  test("rejects insert when database is disconnected", () => {
    const disconnectedDb = new FakeDatabase();
    expect(() => disconnectedDb.insert({ id: 2 })).toThrow("Database not connected");
  });

  // Task 4: Verify cleanup using disconnect() spy and an intentionally rejected operation caught with toThrow()
  test("verifies disconnect spy on cleanup and handles rejected operation with toThrow", () => {
    const tempDb = new FakeDatabase();
    const disconnectSpy = jest.spyOn(tempDb, "disconnect");

    tempDb.connect();
    expect(tempDb.connected).toBe(true);

    // Intentionally rejected operation caught with toThrow()
    tempDb.disconnect();
    expect(() => tempDb.insert({ id: 99 })).toThrow("Database not connected");

    // Verify cleanup
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    expect(tempDb.connected).toBe(false);
  });

  // Task 3: Nested describe() with scoped hooks and event log
  describe("Scoped Nested Context", () => {
    beforeAll(() => {
      hookLog.push("inner:beforeAll");
    });

    beforeEach(() => {
      hookLog.push("inner:beforeEach");
    });

    test("executes inside nested describe and tracks hook sequence", () => {
      hookLog.push("inner:test");
      expect(db.connected).toBe(true);

      // Verify sequence up to this point
      expect(hookLog).toContain("outer:beforeAll");
      expect(hookLog).toContain("inner:beforeAll");
      expect(hookLog).toContain("outer:beforeEach");
      expect(hookLog).toContain("inner:beforeEach");
      expect(hookLog).toContain("inner:test");

      // Verify outer beforeAll executed before inner beforeAll
      const outerBeforeAllIdx = hookLog.indexOf("outer:beforeAll");
      const innerBeforeAllIdx = hookLog.indexOf("inner:beforeAll");
      expect(outerBeforeAllIdx).toBeLessThan(innerBeforeAllIdx);

      // Verify outer beforeEach executed before inner beforeEach
      const lastOuterBeforeEachIdx = hookLog.lastIndexOf("outer:beforeEach");
      const lastInnerBeforeEachIdx = hookLog.lastIndexOf("inner:beforeEach");
      expect(lastOuterBeforeEachIdx).toBeLessThan(lastInnerBeforeEachIdx);
    });

    afterEach(() => {
      hookLog.push("inner:afterEach");
    });

    afterAll(() => {
      hookLog.push("inner:afterAll");
    });
  });
});

