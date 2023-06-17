INSERT INTO department (department_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');


INSERT INTO role (title, salary, department_id)
VALUES  ('Engineer', 1500000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Michael', 'Manhxaythavong', 1, 1),
        ('Colton', 'Smith', 1, 1),
        ('Nathan', 'Henderson', 3,1);