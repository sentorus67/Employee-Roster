INSERT INTO department(dep_name)
VALUES
    ('1:Sales'),
    ('2:Finance'),
    ('3:Engineering'),
    ('4:Sales Clerk'),
    ('5:Legal'),
    ('6:Miscellaneus');

INSERT INTO roles(title,salary,department)
VALUES
    ('District Manager', 26000.00,1),
    ('Accountent',86000.00,2),
    ('Customer Support',34000.00,4),
    ('Task Handler',128000.23,5),
    ('cashier',24.12,4),
    ('infrasturctal architect',50000.00,3);
    

INSERT INTO employee(first_name,last_name,role_id,manager_id)
    VALUES
    ('Ronaldo','Guiterez',1,1), 
    ('Bennet','Hillenburg',5,1),
    ('Collin','Hung',6,1),
    ('Jennifer','Frottenmire',6,3),
    ('Amelia','Langafar',2,1),
    ('Tanya','Murtins',3,2),
    ('Rebecca','Santiago',5,2),
    ('Gregory','Munk',4,3);