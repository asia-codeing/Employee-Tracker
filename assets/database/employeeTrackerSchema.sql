------------------------------Create DataBase---------------
create database employee_tracker;
use employee_tracker;

------------------------------Department Table--------------
create table department(
id int not null auto_increment,
name varchar(30) not null,
primary key (id)
);


-------------------------------Role Table------------------
create table role(
id int not null auto_increment,
title varchar(30) not null, 
salary decimal not null,
department_id INT,
primary key (id),
foreign key (department_id) references department(id)
);


------------------------------Employee Table-------------
create table employee(
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int, 
manager_id int,
primary key (id),
foreign key (manager_id) references  employee(id),
foreign key (role_id) references  role(id)
);


------------------View All Employees Query--------------------
select employee.id,employee.first_name, employee.last_name, role.title, department.name department, role.salary, 
concat(e.first_name,' ',e.last_name) as "manager"
from department
inner join role
on role.department_id = department.id
inner join employee
on role.id = employee.role_id
left join employee e
on employee.manager_id =  e.id ;


