// For MySQL database
const mysql = require('mysql'),
// For NPM inquirer so that we can run prompts
const inquirer = require("inquirer"),
// Ask TA or instructor on what this does. Do I need to do an npm install?
const cTable = require("console.table")

const connection = mysql.createConnection({
    // use local host
    host: 'localhost',

    // Use port 3306
    port: 3306,

    // Will be using root user
    user: 'root',

    // When testing make sure to use your password. Make sure to delete password when you do a git push or pull. Talk to TA and instructor about this
    password: '',
    database: 'Employee_DB',

});
    //When there is an error in connection  
connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

    // This will start inquirer and give you list of what your want to lookup, add, remove, or update
const runSearch = () => {
    inquirer.prompt ({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices:[
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager'
        ],

    })
    .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewAllEmployees();
            break;
  
          case 'View All Employees by Department':
            viewEmployeesByDepartment();
            break;
  
          case 'View All Employees by Manager':
            viewAllEmployeesByManager();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;
  
          case 'Update Employee Role':
            updateEmployeeRole();
            break;

          case 'Update Employee Manager':
            updateEmployeeManager();
            break;  

          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

// This variable is to view all employees. Inside this variable, we have a function wherewe want to query the data from EmployeeDB.
// If we type something in wrong, then we get an error 
const viewAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query = (query, (err, res) => {
        if (err) throw err;
        console.table (res);
        runSearch();
    });
};

// This variable to view all employees by department (engineering, sales, legal, etc)
// choose which department and all employees from that department will show
const viewEmployeesByDepartment = () => {
    let query = 'SELECT department.name, employee.id, employee.first_name, employee.last_name FROM employee';
    query += "LEFT JOIN roles on employee.role_id = roles.id";
    query += "LEFT JOIN department on roles.department_id = department.id";
    query += "WHERE department.id = 1";
    connection.query = (query, (err, res) => {
        console.table ("Employees by Department");
        runSearch()
    })
};

// This variable to pick a manager.
// When you pick a manager, this will show all the manager's employees
const viewAllEmployeesByManager = () => {
    const query = "SELECT manager.name, employee.id, employee.first_name, employee.lastname FROM employee";
    query += "LEFT JOIN roles on employee.role_id =roles.id";
    query += "LEFT JOIN employee on roles.manager_id = manager.id.";
    query =+ "Where manager.id = 1";
    connection.query = (query, (err, res) => {
        console.table ("Employees by Manager");
        runSearch()
    })
    
};

const addEmployee = () => {
    inquirer.prompt ({
        name: "First name of new employee",
        type: "input",
        message: "What is the first name of the employee?",
    },
    {
        name: "Second name of the new employee",
        type: "input",
        message: "What is the last name of the new employee?",
        
    },
    {
        name: "Role of the new employee",
        type: "input",
        message: "What is the role of the new employee",
    },
    {
        name: "Manager of the new employee",
        type: "input",
        message: "Who is the employee's manager?",
    })
    .then
}


