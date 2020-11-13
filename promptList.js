const query = require("./config/queries");
const connection = require("./config/connection");

//Get list of roles from db to add to prompt list
const rolesArray = [];
const q1 = query.getRolesList();
connection.query(q1, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        rolesArray.push(result[i].title);
    }
});


// Get list of managers from db to add to prompt list
const managersArray = [];
const q2 = query.getManagersList();
connection.query(q2, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        managersArray.push(result[i].manager);
    }
});


// Get list of departments from db to add to prompt list
const deptArray = [];
const q3 = query.viewAllDepts();
connection.query(q3, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        deptArray.push(result[i].name);
    }
});


const promptList = [
    // Prompt 0. - Prompting user to perform a certain function
    {
        type: "list",
        message: "What would you like to do?",
        name: "mainFunctions",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Role",
            "I am finished"
        ]
    },
    // Prompt 1. - Prompting user for data to create a new employee
    [
        {
            type: "input",
            message: "What is the new employee's first name?",
            name: "newEmployeeFirstName"
        },
        {
            type: "input",
            message: "What is the new employee's last name?",
            name: "newEmployeeLastName"
        },
        {
            type: "list",
            message: "What is the new employee's role?",
            name: "newEmployeeRole",
            choices: rolesArray
        },
        {
            type: "list",
            message: "Who is the new employee's manager?",
            name: "newEmployeeManager",
            choices: managersArray
        }
    ],
    // Prompt 2. - Prompting user for data to create a new role
    [
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "newRoleTitle"
        },
        {
            type: "input",
            message: "What is the salary for the new role?",
            name: "newRoleSalary"
        },
        {
            type: "list",
            message: "What department does the new role fall under?",
            name: "newRoleDept",
            choices: deptArray
        }
    ],
    // Prompt 3. - Prompting a user for data to create a new department
    {
        type: "input",
        message: "What is the name of the new department?",
        name: "newDepartment"
    },
    // Prompt 4. - Prompting a user to update a role
    [
        {
            type: "list",
            message: "What is the title of role you want to update?",
            name: "updateRole",
            choices: rolesArray
        },
        {
            type: "list",
            message: "What column do you want to update in this role?",
            name: "columnUpdate",
            choices: ["title", "salary", "department_id"]
        },
        {
            type: "input",
            message: "What do you want the new value to be?",
            name: "newValue"
        }
        
    ]

    
];

module.exports = promptList;