------------------------------Create DataBase---------------
create database employee_tracker;
use employee_tracker;

------------------------------Department Table--------------
create table department(
id int not null auto_increment,
name varchar(30) not null,
primary key (id)
);


--Insert data to Department Table-- 
insert into department (name)
values ('Engineering'),('Sales'),('Finance'),('Legal');
select * from department;

-------------------------------Role Table------------------
create table role(
id int not null auto_increment,
title varchar(30) not null, 
salary decimal not null,
department_id INT,
primary key (id),
foreign key (department_id) references department(id)
);


--Insert data to Role Table--
insert into role (title, salary, department_id)
values ('Lead Engineer',150000,1), 
('Software Engineer', 120000, 1),
('Sales Lead', 100000, 2),
('Salesperson', 80000, 2),
('Accountant', 125000, 3),
('Leagal Team Lead', 250000, 4),
('Lawyer', 190000, 4);
select * from role;


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


--Insert data to Employee Table--
insert into employee (first_name, last_name, role_id, manager_id)
values ('Ashley', 'Rodriguez', 1, null),
('Kevin', 'Tupik', 2, 1),
('John', 'Doe', 3, 1),
('Mike', 'Chad', 4, 3),
('Malia', 'Brown', 5, null),
('Sarah', 'Lourd', 6, null),
('Tom', 'Allen', 7, 6);

select * from employee;





