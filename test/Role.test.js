const Role = require("../lib/Role");

test("Can instantiate Role instance", () => {
    const obj = new Role();
    expect(typeof(obj)).toBe("object");
});

test("Can set title via constructor arguments", () => {
    let testVal = "Web Developer";
    const obj = new Role(testVal);
    expect(obj.title).toBe(testVal);
});

test("Can set salary via constructor arguments", () => {
    let testVal = 65000;
    const obj = new Role("Web Developer", testVal);
    expect(obj.salary).toBe(testVal);
});

test("Can set department_id via constructor arguments", () => {
    let testVal = 3;
    const obj = new Role("Web Developer", 65000, testVal);
    expect(obj.department_id).toBe(testVal);
});