const Lib = require("../lib/Employees");
const Manager = Lib.Manager;

describe("Manager", () => {
  it("Can set officeNumber via constructor arguments", () => {
    const m = new Manager("Gary", 1, "example@gmail.com", 100);
    expect(m.officeNumber).toBe(100);
  })

  describe("getRole", () => {
    it("Can get role via getRole()", () => {
      const m = new Manager();
      expect(m.getRole()).toBe("Manager");
    });
  });
});