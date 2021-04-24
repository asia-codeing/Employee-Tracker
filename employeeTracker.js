const inquirer = require('inquirer');
const mysql = require('mysql');
//Create the connection to the database
const db = mysql.createConnection({
multipleStatements: true,
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
        'View All Employees By Manager',
        'View All Employees By Department',
        'View Departments',
        'View Roles',
        'View Total Utilized Budget',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Update Employee Role',
        'Update Employee Manager',
        'Remove Department',
        'Remove Role',
        'Remove Employee'
    ],
})
.then((answer) => {
    switch (answer.action) {
        case 'View All Employees' :
            //function
            viewAllEmployees();
            break;
        case 'View All Employees By Manager' :
            //function
            viewByManager();
            break;
        case 'View All Employees By Department' :
            //function
            viewByDepartment();
            break;
        case 'View Departments' :
            //function
            viewDepartments(); 
            break;
        case 'View Roles' :
            //function
            viewRoles();
            break;
        case 'View Total Utilized Budget' :
            //function
            viewBudget();
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
        case 'Update Employee Role' :
            //function
            updateRole();
            break;    
        case 'Update Employee Role' :
            //function
            updateRole();
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
        case 'Remove Department' :
            //function
            removeDepartment();
            break;    
        case 'Remove Role' :
            //function
            removeRole();
            break;
        case 'Remove Employee':
            //function
            removeEmployee();
            break;    
        default:
            console.log(`Invalid Action: ${answer.action}`);
            break;
    }
});

}

//===============================View Functions========================

const viewAllEmployees = () => {
    let query = ('select employee.id,employee.first_name, employee.last_name, role.title, department.name department, role.salary,concat(e.first_name," ",e.last_name) as manager from department inner join role on role.department_id = department.id inner join employee on role.id = employee.role_id left join employee e on employee.manager_id =  e.id ;')
db.query(query, (err, res) => {
    if(err) throw err;
    console.table(res);
    startTracker();
  })
}

const viewByManager = () => {

    
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

const  viewBudget = () => {
    let query = ('select department.name Department_Name, sum(role.salary) Total_Utilized_Budget from department inner join role on role.department_id = department.id group by department.name;')
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startTracker();
      })
}


//=================================Add Functions====================

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
        db.query('insert into role (title, salary, department_id) values ?',[
            {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
            }
        ],
        (err) => {
            if(err) throw err;
            
            console.log('New Role Created!');
            startTracker();
        }
        )
    } )
}


const addEmployee = () => {
    const query = ('select title from role; select concat(employee.first_name, employee.last_name) as fullName from employee inner join role on role.id = employee.role_id where role.title like "%Lead%"');

    db.query(query, (err, results) => {
        if (err) throw err;

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
            name: 'role',
            choices() {
                const choiceArray = [];
                results[0].forEach(({ title }) => {
                    choiceArray.push(title);
                });
            return choiceArray;
          },
            message: "Select the Job Title:"
        },
        {
            type:'list',
            name: 'manager',
            choices() {
                const choiceArray = [];
                results[1].forEach(({ fullName }) => {
                  choiceArray.push(fullName);
                });
            return choiceArray;
              },
            message: "Select Manager Name:"
        }

    ]).then((answer) => {
        db.query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
            (SELECT id FROM role WHERE title = ? ), 
            (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ? ) AS manager))`, [answer.firstName, answer.lastName, answer.role, answer.manager]
        )
        startTracker();
    })
 });
}

//=============================Update Functions====================

const updateRole = () => {
  const query = ('select concat(employee.first_name, employee.last_name) as fullName from employee inner join role on role.id = employee.role_id; select title from role');
  db.query(query, (err, results) => {
      if(err) throw err;

      inquirer.prompt([
          {
              type: 'list',
              name: 'employeeName',
              choices() {
                const choiceArray = [];
                results[0].forEach(({ fullName }) => {
                  choiceArray.push(fullName);
                });
            return choiceArray;
              },
              message: 'Select Employee name to update role:'

          },
          {
            type:'list',
            name: 'newRole',
            choices() {
                const choiceArray = [];
                results[1].forEach(({ title }) => {
                    choiceArray.push(title);
                });
            return choiceArray;
          },
            message: "Select the Job Title:" 
          }
      ])
      .then((answer) => {
          db.query(`UPDATE employee 
          SET role_id = (SELECT id FROM role WHERE title = ? ) 
          WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?) AS fullName)`,
            [
                {
                    updated:answer.newRole,
                }, 
                {
                    employee:answer.employeeName,
                }
                
            ], (err, results) => {
                    if (err) throw err;
                    console.log(results + 'Role Updated!');
                    startTracker();
                });
        });
    });

}
//===========================Remove Functions===================

const removeDepartment = () => {
    query = ('select * from department');
    db.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeDepartment',
                type: 'list',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ name }) => {
                        choiceArray.push(name);
                    });
                return choiceArray;
              },
                message: 'Select anDepartment to remove:'
            }
        ]).then((answer) => {
            db.query(`delete from department where ? `, 
            { 
                name: answer.removeDepartment
            },
            (err, results) => {
                if (err) throw err;
                console.log(results + 'Department Removed');
                startTracker();
            });

        })

    })

}

const removeRole = () => {
    query = ('select * from role');
    db.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ title }) => {
                        choiceArray.push(title);
                    });
                return choiceArray;
              },
                message: 'Select a Role to remove:'
            }
        ]).then((answer) => {
            db.query(`delete from role where ? `, { title: answer.removeRole},
            (err, results) => {
                if (err) throw err;
                console.log(results + 'Role Removed');
                startTracker();
            });
        })

    })

}


const removeEmployee = () => {
    const query =('select employee.id,employee.first_name, employee.last_name, role.title, department.name department, role.salary,concat(e.first_name," ",e.last_name) as manager from department inner join role on role.department_id = department.id inner join employee on role.id = employee.role_id left join employee e on employee.manager_id =  e.id ;')
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table(results)
        inquirer.prompt([
            {
                name: 'IDtoRemove',
                type: 'input',
                message: 'Enter the ID of the Employee to remove:'
            }
        ]).then((answer) => {
            db.query(`DELETE FROM employee where ?`, { id: answer.IDtoRemove })
            startTracker();
        })
    })
}


// const removeEmployee = () => {
//     query = ('select id, concat(first_name," ",last_name) as employee_name from employee;');
//     db.query(query, (err, results) => {
//         if (err) throw err;

//         inquirer.prompt([
//             {
//                 name: 'removeEmployee',
//                 type: 'list',
//                 choices() {
//                     const choiceArray = [];
//                     results.forEach(({ employee_name }) => {
//                         choiceArray.push(employee_name);
//                     });
//                 return choiceArray;
//               },
//                 message: 'Select a employee name to remove:'
//             }
//         ]).then((answer) => {
//             db.query(`delete from employee where (concat(first_name," ",last_name) as employee_name from employee) = ${answer.removeEmployee}`,(err, results) => {
//                 if (err) throw err;
//                 console.log(results + 'Employee Removed');
//                 startTracker();
//             });
//         })

//     })

// }


