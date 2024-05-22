drop database if exists bowner_db;

create database bowner_db;

\c bowner_db;

create table department(
    id SERIAL PRIMARY KEY,
    dep_name Text NOT NULL
);

create table roles(
    id SERIAL PRIMARY KEY,
    title Text Not NULL,
    salary Decimal Not null,
    department Integer NOT NULL,
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

create table employee(
 id SERIAL PRIMARY KEY,
 first_name Text Not NULL,
 last_name Text Not NULL,
 role_id Integer,
 manager_id Integer,
 FOREIGN KEY (role_id)
 REFERENCES roles(id)
 ON DELETE SET NULL,
 FOREIGN KEY (manager_id)
 REFERENCES employee(id)
 ON DELETE SET NULL
);