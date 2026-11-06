import { jest } from "@jest/globals";
import { StudentRepository } from "../../src/05-studentRepository.js";

function createStudentFixture(overrides = {}) {
  return {
    id: 1,
    name: "Abebe Kebede",
    department: "Computer Science",
    year: 3,
    ...overrides
  };
}

describe("StudentRepository Isolated Suite", () => {
  let repo;

  beforeEach(() => {
    repo = new StudentRepository();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("add() and duplicate rejection", () => {
    test("adds a new student and increments count", () => {
      const student = createStudentFixture({ id: 101 });
      repo.add(student);
      expect(repo.count()).toBe(1);
    });

    test("starts each test with a clean empty repository", () => {
      // Proves isolation from previous test
      expect(repo.count()).toBe(0);
    });

    test("rejects adding a student with duplicate ID", () => {
      const student1 = createStudentFixture({ id: 101 });
      const student2 = createStudentFixture({ id: 101, name: "Duplicate" });

      repo.add(student1);
      expect(() => repo.add(student2)).toThrow("Duplicate student ID");
    });

    test("rejects adding a student without an ID", () => {
      expect(() => repo.add(null)).toThrow(TypeError);
      expect(() => repo.add({})).toThrow(TypeError);
    });
  });

  describe("findById() queries", () => {
    test("finds an existing student by ID", () => {
      const student = createStudentFixture({ id: 201, name: "Chala" });
      repo.add(student);

      const found = repo.findById(201);
      expect(found).toEqual(student);
    });

    test("returns undefined when ID does not exist", () => {
      expect(repo.findById(999)).toBeUndefined();
    });
  });

  describe("remove() and count()", () => {
    test("removes student by ID and updates count", () => {
      const student = createStudentFixture({ id: 301 });
      repo.add(student);
      expect(repo.count()).toBe(1);

      repo.remove(301);
      expect(repo.count()).toBe(0);
      expect(repo.findById(301)).toBeUndefined();
    });

    test("removing non-existent ID does not affect records", () => {
      const student = createStudentFixture({ id: 302 });
      repo.add(student);
      repo.remove(999);
      expect(repo.count()).toBe(1);
    });
  });

  describe("Mock and spy restoration", () => {
    test("tracks calls to findById using a spy", () => {
      const spy = jest.spyOn(repo, "findById");
      repo.findById(123);
      expect(spy).toHaveBeenCalledWith(123);
    });

    test("confirms previous spy was restored after test", () => {
      // By calling findById without spy error
      expect(repo.findById(123)).toBeUndefined();
    });
  });
});

