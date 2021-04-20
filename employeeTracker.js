const inquirer = require('inquirer');
const mysql = require('mysql');
//Create the connection to the database
const db = mysql.createConnection({
host:'localhost',
port: 3306,
user: 'root',
password: 'password',
database: 'employee_tracker'
})