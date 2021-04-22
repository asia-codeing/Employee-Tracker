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
        'View Departments',
        'View Roles',
        'Add Department',
        'Add Role',
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
            viewAllEmployees();
            break;
        case 'View Departments' :
            //function
            viewDepartments(); 
            break;
        case 'View Roles' :
            //function
            viewRoles();
            break;
        case 'Add Department' :
            //function
            addDepartment();
            break;    
        case 'Add Role' :
            //function
            addRole();
            break;
        case 'Add Employee' :
            //function
            addEmployee();
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
const viewAllEmployees = () => {

    let query = ('select employee.id,employee.first_name, employee.last_name, role.title, department.name department, role.salary,concat(e.first_name," ",e.last_name) as manager from department inner join role on role.department_id = department.id inner join employee on role.id = employee.role_id left join employee e on employee.manager_id =  e.id ;')
db.query(query, (err, res) => {
    if(err) throw err;
    console.table(res);
    startTracker();
  })
}

const viewDepartments = () => {
    let query = ('select * from department;')
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startTracker();
      })
}

const viewRoles = () => {
    let query = ('select * from role;')
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startTracker();
      })
}
const addDepartment = () => {

    inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter new department name:'
    }).then((answer) => {
        db.query('insert into department set ?',
        
        {
            name: answer.departmentName
        },
        (err) => {
            if(err) throw err;
            
            console.log('New Department Created!');
            startTracker();
        }
        )
    } )
}

const addRole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new job title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Set salary for new job title:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department id :'
        }

]).then((answer) => {
        db.query('insert into department set ?',
        
        {
            title: answer.title,
            salary: answer.salary,
            id: answer.departmentId
        },
        (err) => {
            if(err) throw err;
            
            console.log('New Role Created!');
            startTracker();
        }
        )
    } )
}



const addEmployee = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter employee last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role id :'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager id :'
        }

]).then((answer) => {
        db.query('insert into department set ?',
        
        {
           fName: answer.firstname,
            lName: answer.lastname,
            roleId: answer.role_id,
            managerId: answer.manager_id
        },
        (err) => {
            if(err) throw err;
            
            console.log('New Employee Added!');
            startTracker();
        }
        )
    } )
}




// const roleArr = [];
// const managersArr = []

// const addEmployee = () => {
    
//     inquirer.prompt([
//         {
//             type:'input',
//             name: 'firstName',
//             message: "What is the employee's First Name?"
//         },
//         {
//             type:'input',
//             name: 'lastName',
//             message: "What is the employee's Last Name?"
//         },
//         {
//             type:'list',
//             name: 'role',
//             choices:function () {
//                 let query = ('select id, title from role;')
//             db.query(query, (err, res) => {
//                 if(err) throw err;
//             // console.table(res);
//             for (let i = 0; i < res.length; i++){
//                 roleArr.push(res[1].title)
//             }
//             })
//             },
//             message: "Select the Job Title:"
//         },
//         {
//             type:'list',
//             name: 'manager',
//             choices: function () {
//                 let query = ('select id, concat(first_name," ",last_name) as manager from employee where manager_id is null;');
//                     db.query(query, (err, res) => {
//                         if(err) throw err;
//                        // console.table(res);
//                        for (let i = 0; i < res.length; i++) {
//                         managersArr.push(res[i].first_name);
//                        }
//                     })
//             },
//             message: "Select Manager Name:"
//         }

//     ]).then((answer) => {
//         db.query(
//             `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?`, 
           
//             [answer.firstName, answer.lastName, answer.role, answer.manager]
//         )
//         startTracker();
//     })
// }

