--Insert data to Department Table-- 
insert into department (name)
values 
('Engineering'),
('Sales'),
('Finance'),
('Legal');
select * from department;

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

