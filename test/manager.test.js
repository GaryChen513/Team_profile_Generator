const Lib = require("../lib/Employees");
const Engineer = Lib.Engineer;

describe("Engineer", () => {
  it("Can set github account name via constructor arguments", () => {
    const e = new Engineer("Gary", 1, "example@gmail.com", "gitHubUser");
    expect(e.github).toBe("gitHubUser");
  })

  describe("getGithub", () => {
    it("Can get Giyhub account name via getGithub()", () => {
      const e = new Engineer("Gary", 1, "example@gmail.com", "gitHubUser")
      expect(e.getGithub()).toBe("gitHubUser")
    })
  })

  describe("getRole", () => {
    it("Can get role via getRole()", () => {
      const e = new Engineer();
      expect(e.getRole()).toBe("Engineer");
    });
  });
});