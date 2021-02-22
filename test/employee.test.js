const Lib = require("../lib/Employees");
const Employee = Lib.Employee;


describe("Employee", () => {
  it("Can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof e).toBe("object");
  });

  it("Can set name via constructor arguments", () => {
    const e = new Employee("Gary");
    expect(e.name).toBe("Gary");
  });

  it("Can set Id via constructor arguments", () => {
    const e = new Employee("Gary", 1);
    expect(e.id).toBe(1);
  });

  it("Can set email via constructor arguments", () => {
    const e = new Employee("Gary", 1, "example@gmail.com");
    expect(e.email).toBe("example@gmail.com");
  });

  describe("getName", () => {
    it("Can get employee's name via getName()", () => {
      const e = new Employee("Gary");
      expect(e.getName()).toBe("Gary");
    });
  });

  describe("getId", () => {
    it("Can get employee's id via getId()", () => {
      const e = new Employee("Gary", 1);
      expect(e.getId()).toBe(1);
    });
  });

  describe("getEmail", () => {
    it("Can get employee's Email via getEmail()", () => {
      const e = new Employee("Gary", 1, "example@gmail.com");
      expect(e.getEmail()).toBe("example@gmail.com");
    });
  });

  describe("getRole", () => {
    it("Can get employee's role via getRole()", () => {
      const e = new Employee();
      expect(e.getRole()).toBe("Employee")
    })
  })
});