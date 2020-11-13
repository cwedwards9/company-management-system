const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
    const obj = new Employee();
    expect(typeof(obj)).toBe("object");
});

test("Can set first_name via constructor arguments", () => {
    let testVal = "Bob";
    const obj = new Employee(testVal);
    expect(obj.first_name).toBe(testVal);
});

test("Can set last_name via constructor arguments", () => {
    let testVal = "Johnson";
    const obj = new Employee("Bob", testVal);
    expect(obj.last_name).toBe(testVal);
});

test("can set role_id via constructor arguments", () => {
    let testVal = 1;
    const obj = new Employee("Bob", "Johnson", testVal);
    expect(obj.role_id).toBe(testVal);
});

test("Can set manager_id via constructor arguments", () => {
    let testVal = 5;
    const obj = new Employee("Bob", "Johnson", 1, testVal);
    expect(obj.manager_id).toBe(testVal);
});