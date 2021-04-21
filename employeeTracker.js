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

db.connect((err) =>{
    if (err) throw err;
    //The starting function go here
    startTracker();

});

const startTracker = () => {
 inquirer.prompt({

    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Employees By Department',
        'View All Employees By Manager',
        'Update Employee Manager',
        'Remove Employee'
    ],
})
.then((answer) => {
    switch (answer.action) {
        case 'View All Employees' :
            //function
            allEmployees();
            break;
        case 'Add Employee' :
            //function
            break;
        case 'Update Employee Role' :
            //function
            break;
        case 'View All Employees By Department' :
            //function
            break;     
        case 'View All Employees By Manager' :
            //function
            break;
        case 'Update Employee Manager' :
            //function
            break;
        case 'Remove Employee' :
            //function
            break;
        default:
            console.log(`Invalid Action: ${answer.action}`);
            break;
    }
});

}
const allEmployees = () => {

    let query = ('select employee.id,employee.first_name, employee.last_name, role.title, department.name department, role.salary,concat(e.first_name," ",e.last_name) as manager from department inner join role on role.department_id = department.id inner join employee on role.id = employee.role_id left join employee e on employee.manager_id =  e.id ;')
db.query(query, (err, res) => {
    if(err) throw err;
    console.table(res);
    startTracker();

})
}
