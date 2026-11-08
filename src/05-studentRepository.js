export class StudentRepository {
  constructor() {
    this.students = [];
  }

  add(student) {
    if (!student || student.id === undefined) {
      throw new TypeError("Student must have an ID");
    }

    const existing = this.findById(student.id);
    if (existing) {
      throw new Error(`Duplicate student ID: ${student.id}`);
    }

    this.students.push(student);
    return student;
  }

  findById(id) {
    return this.students.find(s => s.id === id);
  }

  remove(id) {
    this.students = this.students.filter(s => s.id !== id);
  }

  count() {
    return this.students.length;
  }
}
