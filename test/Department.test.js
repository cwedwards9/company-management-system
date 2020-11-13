const Department = require("../lib/Department");

test("Can instantiate Department instance", () => {
    const obj = new Department();
    expect(typeof(obj)).toBe("object");
});

test("Can set name via constructor arguments", () => {
    let testVal = "Marketing";
    const obj = new Department(testVal);
    expect(obj.name).toBe(testVal);
});
