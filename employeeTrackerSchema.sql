create database employee_tracker;
use employee_tracker;

create table employee(
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT,
PRIMARY KEY (id),
foreign key (manager_id) references  employee(id),
foreign key (role_id) references  role(id)
);


create table role(
id INT AUTO_INCREMENT,
title varchar(30), 
salary decimal,
department_id INT,
primary key (id),
foreign key (department_id) references department(id)
);


create table department(
id INT AUTO_INCREMENT,
name VARCHAR(30),
primary key (id)
);