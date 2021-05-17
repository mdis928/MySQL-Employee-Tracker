// For MySQL database
const mysql = require('mysql'),
// For NPM inquirer so that we can run prompts
const inquirer = require("inquirer"),
// These two requires will work together so that we can create an interactive employee DB

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

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
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
            searchAllEmployees();
            break;
  
          case 'View All Employees by Department':
            searchAllEmployeeByDepartment();
            break;
  
          case 'View All Employees by Manager':
            searchAllEmployeesByManager();
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
