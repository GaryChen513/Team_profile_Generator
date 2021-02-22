const Lib = require("../lib/Employees");
const Intern = Lib.Intern;

describe("Intern", () => {
  it("Can set school in constructor arguments", () => {
    const i = new Intern("Gary", 1, "example@gmail.com","Uni Adelaide");
    expect(i.school).toBe("Uni Adelaide");
  });

  describe("getSchool", () => {
    it("Can get school via getSchool()", () =>{
      const i = new Intern("Gary", 1, "example@gmail.com","Uni Adelaide");
      expect(i.getSchool()).toBe("Uni Adelaide");
    });
  });

  describe("getRole", () => {
    it("Can get role via getRole()", () => {
      const i = new Intern();
      expect(i.getRole()).toBe("Intern")
    });
  });
  
});

