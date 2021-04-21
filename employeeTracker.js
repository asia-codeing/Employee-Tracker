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
            addEmployee(); 
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
const roleArr = [];
const selectRole = () => {
    let query = ('select id, title from role;')
    db.query(query, (err, res) => {
        if(err) throw err;
       // console.table(res);
       for (let i = 0; i < res.length; i++){
           roleArr.push(res[1].title)
       }
    })
}
const managersArr = []
const selectManager = () => {
    let query = ('select id, concat(first_name," ",last_name) as manager from employee where manager_id is null;');
    db.query(query, (err, res) => {
        if(err) throw err;
       // console.table(res);
       for (let i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
       }
    })
}


const addEmployee = () => {
    inquirer.prompt([
        {
            type:'input',
            name: 'firstName',
            message: "What is the employee's First Name?"
        },
        {
            type:'input',
            name: 'lastName',
            message: "What is the employee's Last Name?"
        },
        {
            type:'list',
            name: 'roles',
            choices: selectRole(),
            message: "Select the Job Title:"
        },
        {
            type:'list',
            name: 'manager',
            choices: selectManager(),
            message: "Select Manager Name:"
        }

]).then((answer) => {
const query = (" insert into employee set ? ",
db.query(query,
{
    first_name: answer.firstName,
    last_name: answer.lastName,
    role_id: answer.roles,
    manager_id: answer.manager

}, (err, res)=> {
    if (err) throw err;
    console.table(res);

}
))

})

}