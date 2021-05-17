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

})
