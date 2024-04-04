# MySQL

## MySQL介绍

### 环境配置
* `G:`
* `cd G:\NiHon-IT-Training-Plan\MySQL`
* `docker compose -f './docker compose.yaml' up -d`
```
[+] Running 11/11
✔ mysql 10 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                          24.7s 
✔ 558b7d69a2e5 Pull complete                                                                  4.7s 
✔ b85878fb9bb2 Pull complete                                                                  1.6s 
✔ d16f3fd26a82 Pull complete                                                                  4.1s 
✔ afd51b5329cb Pull complete                                                                  3.2s 
✔ 374d2f7f3267 Pull complete                                                                  4.5s 
✔ 4ea1bb2c9574 Pull complete                                                                  9.5s 
✔ 1c9054053605 Pull complete                                                                  6.0s 
✔ d79cd2da03be Pull complete                                                                 14.9s 
✔ e3a1aa788d17 Pull complete                                                                  7.5s 
[+] Running 2/2
✔ Network mysql_default    Created                                                              0.0s 
✔ Container mysql-mysql-1  Started                                                              0.2s
```
* `docker ps`
```
CONTAINER ID   IMAGE          COMMAND                   CREATED              STATUS              PORTS                               NAMES
c6471e03b8f8   mysql:latest   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1
```
* `docker exec -it c6471e03b8f8 bash`
```
bash-4.4# ...
```
* `mysql -V`
```
mysql  Ver 8.3.0 for Linux on x86_64 (MySQL Community Server - GPL)
```

### 数据库连接
* `mysql -u root -p`
```
Enter password: 12345678
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.3.0 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> ...
```
* `select version();`
```
+-----------+
| version() |
+-----------+
| 8.3.0     |
+-----------+
1 row in set (0.00 sec)
```
* `show databases;`
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| root               |
| sys                |
+--------------------+
5 rows in set (0.01 sec)
```

### 数据库创建
* `create database mydatabase;`
```
Query OK, 1 row affected (0.00 sec)
```
* `show databases;`
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mydatabase         |
| mysql              |
| performance_schema |
| root               |
| sys                |
+--------------------+
6 rows in set (0.00 sec)
```
* `drop database mydatabase;`
```
Query OK, 0 rows affected (0.00 sec)
```
* `show databases;`
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| root               |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```
* `create database mydatabase;`
```
Query OK, 1 row affected (0.01 sec)
```

### 数据表创建
* `use mydatabase;`
```
Database changed
```
* `create table customers (id int primary key, name varchar(255), email varchar(255));`
```
Query OK, 0 rows affected (0.01 sec)
```
* `desc customers;`
```
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | int          | NO   | PRI | NULL    |       |
| name  | varchar(255) | YES  |     | NULL    |       |
| email | varchar(255) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```
* `drop table customers;`
```
Query OK, 0 rows affected (0.01 sec)
```

### 数据插入
```sql
create table customers (
-> id int primary key,
-> name varchar(255),
-> email varchar(255)
-> );
```
```
Query OK, 0 rows affected (0.01 sec)
```
```sql
INSERT INTO customers (id, name, email)
-> VALUES (1, 'JOHN', 'john@test.com');
```
```
Query OK, 1 row affected (0.00 sec)
```
```sql
INSERT INTO customers (id, name, email) VALUES (1, 'JOHN2', 'john2@test.com');
```
```
ERROR 1062 (23000): Duplicate entry '1' for key 'customers.PRIMARY'
```
```sql
INSERT INTO customers (id, name, email) VALUES (2, 'JOHN', 'john@test.com');
```
```
Query OK, 1 row affected (0.00 sec)
```
```sql
INSERT INTO customers (id, name, email) VALUES (null, 'JOHN2', 'john2@test.com');
```
```
ERROR 1048 (23000): Column 'id' cannot be null
```

### 数据查询
```sql
SELECT * FROM customers;
```
```
+----+------+---------------+
| id | name | email         |
+----+------+---------------+
|  1 | JOHN | john@test.com |
|  2 | JOHN | john@test.com |
+----+------+---------------+
2 rows in set (0.00 sec)
```
```sql
SELECT name, email FROM customers;
```
```
+------+---------------+
| name | email         |
+------+---------------+
| JOHN | john@test.com |
| JOHN | john@test.com |
+------+---------------+
2 rows in set (0.00 sec)
```
```sql
SELECT name, email FROM customers WHERE id = 1;
```
```
+------+---------------+
| name | email         |
+------+---------------+
| JOHN | john@test.com |
+------+---------------+
1 row in set (0.00 sec)
```

### 数据更新
```sql
UPDATE customers SET email = 'test@test.com' WHERE name = 'John';
```
```
Query OK, 2 rows affected (0.01 sec)
Rows matched: 2  Changed: 2  Warnings: 0
```

### 数据删除
```sql
DELETE FROM customers WHERE name = 'John';
```
```
Query OK, 2 rows affected (0.00 sec)
```

### 事务
```sql
CREATE TABLE accounts (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  balance DECIMAL(10,2)
);
```
```
Query OK, 0 rows affected (0.01 sec)
```
```sql
DESC accounts;
```
```
+---------+---------------+------+-----+---------+-------+
| Field   | Type          | Null | Key | Default | Extra |
+---------+---------------+------+-----+---------+-------+
| id      | int           | NO   | PRI | NULL    |       |
| name    | varchar(50)   | YES  |     | NULL    |       |
| balance | decimal(10,2) | YES  |     | NULL    |       |
+---------+---------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```
```sql
INSERT INTO accounts (id, name, balance) VALUES (1, 'name1', '1000');
SELECT * FROM accounts;
```
```
+----+-------+---------+
| id | name  | balance |
+----+-------+---------+
|  1 | name1 | 1000.00 |
+----+-------+---------+
```
```sql
UPDATE accounts SET balance = 100000000 WHERE id = 1;
SELECT * FROM accounts;
```
```
+----+-------+---------+
| id | name  | balance |
+----+-------+---------+
|  1 | name1 | 1000.00 |
+----+-------+---------+
```
```sql
UPDATE accounts SET balance = 10000000 WHERE id = 1;
SELECT * FROM accounts;
```
```
+----+-------+-------------+
| id | name  | balance     |
+----+-------+-------------+
|  1 | name1 | 10000000.00 |
+----+-------+-------------+
```
```sql
INSERT INTO accounts (id, name, balance) VALUES (2, 'name2', '1000');
SELECT * FROM accounts;
```
```
+----+-------+-------------+
| id | name  | balance     |
+----+-------+-------------+
|  1 | name1 | 10000000.00 |
|  2 | name2 |     1000.00 |
+----+-------+-------------+
```
```sql
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SELECT * FROM accounts
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
SELECT * FROM accounts;
```
```
+----+-------+------------+
| id | name  | balance    |
+----+-------+------------+
|  1 | name1 | 9999900.00 |
|  2 | name2 |    1000.00 |
+----+-------+------------+
```
```sql
UPDATE accounts SET balance = 1000;
SELECT * FROM accounts;
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SELECT * FROM accounts;
UPDATE accounts SET balence = balance + 100 WHERE id = 2;
SELECT * FROM accounts;
ROLLBACK;
SELECT * FROM accounts;
```
```
+----+-------+---------+
| id | name  | balance |
+----+-------+---------+
|  1 | name1 | 1000.00 |
|  2 | name2 | 1000.00 |
+----+-------+---------+
```
```sql
UPDATE accounts SET balance = 1000;
SELECT * FROM accounts;
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SELECT * FROM accounts;
UPDATE accounts SET balence = balance + 100 WHERE id = 2;
SELECT * FROM accounts;
COMMIT;
SELECT * FROM accounts;
```
```
+----+-------+---------+
| id | name  | balance |
+----+-------+---------+
|  1 | name1 |  900.00 |
|  2 | name2 | 1000.00 |
+----+-------+---------+
```

## 表设计-表列约束和默认值

### NOT NULL
```sql
CREATE TABLE `mytable` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `age` INT(11) DEFAULT NULL
);
DESC mytable;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   |     | NULL    |       |
| name  | varchar(50) | NO   |     | NULL    |       |
| age   | int         | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO mytable (id, name, age) VALUES (1, 'name1', null);
INSERT INTO mytable (id, name, age) VALUES (null, 'name2', null);
SELECT * FROM mytable;
DROP TABLE mytable;
```
```
Query OK, 1 row affected (0.00 sec)
ERROR 1048 (23000): Column 'id' cannot be null
+----+-------+------+
| id | name  | age  |
+----+-------+------+
|  1 | name1 | NULL |
+----+-------+------+
1 row in set (0.00 sec)
Query OK, 0 rows affected (0.01 sec)
```

### PRIMARY KEY
* 主键是一列或一组列，值不能重复且不能为NULL
```sql
CREATE TABLE `mytable` (
  `id` INT(11) NOT NULL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `age` INT(11) DEFAULT NULL
);
DESC mytable;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(50) | NO   |     | NULL    |       |
| age   | int         | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO mytable (id, name, age) VALUES (1, 'name1', null);
INSERT INTO mytable (id, name, age) VALUES (1, 'name2', null);
SELECT * FROM mytable;
DROP TABLE mytable;
```
```
Query OK, 1 row affected (0.01 sec)
ERROR 1062 (23000): Duplicate entry '1' for key 'mytable.PRIMARY'
+----+-------+------+
| id | name  | age  |
+----+-------+------+
|  1 | name1 | NULL |
+----+-------+------+
1 row in set (0.00 sec)
Query OK, 0 rows affected (0.01 sec)
```

### UNIQUE
* 与主键不同，可以包含NULL值
```sql
CREATE TABLE `mytable` (
  `id` INT(11) NOT NULL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `age` int(50) UNIQUE
);
DESC mytable;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(50) | NO   | UNI | NULL    |       |
| age   | int         | YES  | UNI | NULL    |       |
+-------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO mytable (id, name, age) VALUES (1, 'name1', null);
INSERT INTO mytable (id, name, age) VALUES (2, 'name1', 18);
INSERT INTO mytable (id, name, age) VALUES (2, 'name2', null);
SELECT * FROM mytable;
DROP TABLE mytable;
```
```
Query OK, 1 row affected (0.00 sec)
ERROR 1062 (23000): Duplicate entry 'name1' for key 'mytable.name'
Query OK, 1 row affected (0.00 sec)
+----+-------+------+
| id | name  | age  |
+----+-------+------+
|  1 | name1 | NULL |
|  2 | name2 | NULL |
+----+-------+------+
2 rows in set (0.00 sec)
Query OK, 0 rows affected (0.01 sec)
```

### FOREIGN KEY
* 外键约束，用于实现表之间关系的约束
* 外键是一个指向另一个表中的列的列，确保了两个表之间的数据的一致性
* 它指定的值必须存在于另一个表中的主键或唯一键列中
```sql
CREATE TABLE `customers` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE
);
DESC customers;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `product_name` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`)
);
DESC orders;
```
```
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | int          | NO   | PRI | NULL    |       |
| name  | varchar(255) | YES  |     | NULL    |       |
| email | varchar(255) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| id           | int         | NO   | PRI | NULL    |       |
| product_name | varchar(50) | NO   |     | NULL    |       |
| customer_id  | int         | NO   | MUL | NULL    |       |
+--------------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO customers (id, name, email) VALUES (1, 'name1', 'email1');
INSERT INTO customers (id, name, email) VALUES (2, 'name2', 'email2');
INSERT INTO customers (id, name, email) VALUES (3, 'name3', 'email3');
SELECT * FROM customers;

INSERT INTO orders (id, product_name, customer_id) VALUES (1, 'product_name1', '1');
INSERT INTO orders (id, product_name, customer_id) VALUES (2, 'product_name2', '1');
INSERT INTO orders (id, product_name, customer_id) VALUES (3, 'product_name3', '2');
INSERT INTO orders (id, product_name, customer_id) VALUES (4, 'product_name4', '4');
SELECT * FROM orders;

DROP TABLE customers;
DROP TABLE orders;
DROP TABLE customers;
```
```
Query OK, 1 row affected (0.00 sec)
Query OK, 1 row affected (0.00 sec)
Query OK, 1 row affected (0.00 sec)
+----+-------+--------+
| id | name  | email  |
+----+-------+--------+
|  1 | name1 | email1 |
|  2 | name2 | email2 |
|  3 | name3 | email3 |
+----+-------+--------+
3 rows in set (0.00 sec)

Query OK, 1 row affected (0.00 sec)
Query OK, 1 row affected (0.00 sec)
Query OK, 1 row affected (0.01 sec)
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`mydatabase`.`orders`, CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`))
+----+---------------+-------------+
| id | product_name  | customer_id |
+----+---------------+-------------+
|  1 | product_name1 |           1 |
|  2 | product_name2 |           1 |
|  3 | product_name3 |           2 |
+----+---------------+-------------+
3 rows in set (0.00 sec)

ERROR 3730 (HY000): Cannot drop table 'customers' referenced by a foreign key constraint 'orders_ibfk_1' on table 'orders'.
Query OK, 0 rows affected (0.02 sec)
Query OK, 0 rows affected (0.01 sec)
```

### DEFAULT
```sql
CREATE TABLE `mytable` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL DEFAULT 18
);
DESC mytable;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(50) | NO   |     | NULL    |       |
| age   | int         | NO   |     | 18      |       |
+-------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO mytable (id, name) VALUES (1, 'name1');
INSERT INTO mytable (id, name) VALUES (2, 'name2');
SELECT * FROM mytable;
DROP TABLE mytable;
```
```
Query OK, 1 row affected (0.01 sec)
Query OK, 1 row affected (0.01 sec)
+----+-------+-----+
| id | name  | age |
+----+-------+-----+
|  1 | name1 |  18 |
|  2 | name2 |  18 |
+----+-------+-----+
2 rows in set (0.00 sec)
Query OK, 0 rows affected (0.01 sec)
```

### CHECK
* 列约束，用于定义一个表达式，该表达式在插入或更新数据时必须为真
* 只能在MySQL 8.0版本及以上的版本中使用
```sql
CREATE TABLE `mytable` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  CHECK (age > 0 AND gender IN ('male', 'female'))
);
DESC mytable;
```
```
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int         | NO   | PRI | NULL    |       |
| name   | varchar(50) | NO   |     | NULL    |       |
| age    | int         | NO   |     | NULL    |       |
| gender | varchar(10) | NO   |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO mytable (id, name, age, gender) VALUES (1, 'name1', '18', 'male');
INSERT INTO mytable (id, name, age, gender) VALUES (2, 'name2', '0', 'male');
INSERT INTO mytable (id, name, age, gender) VALUES (3, 'name3', '18', 'male1');
SELECT * FROM mytable;
DROP TABLE mytable;
```
```
Query OK, 1 row affected (0.00 sec)
ERROR 3819 (HY000): Check constraint 'mytable_chk_1' is violated.
ERROR 3819 (HY000): Check constraint 'mytable_chk_1' is violated.
+----+-------+-----+--------+
| id | name  | age | gender |
+----+-------+-----+--------+
|  1 | name1 |  18 | male   |
+----+-------+-----+--------+
1 row in set (0.00 sec)
Query OK, 0 rows affected (0.01 sec)
```

## 表设计-数据表关系设计

### 一对一关系
* 一对一关系指的是两个表之间的一种关系，其中一个表的每个记录都只能对应另一个表中的一条记录
* 在一个一对一关系中，一个表中的主键通常也是另一个表中的外键
```sql
CREATE TABLE `person` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL
);
DESC person;
CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `email` varchar(50) NOT NULL UNIQUE,
  `phone` varchar(20) NOT NULL UNIQUE,
  `person_id` int(11) NOT NULL UNIQUE,
  FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
);
DESC contact_info;
```
```
+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| id      | int          | NO   | PRI | NULL    |       |
| name    | varchar(50)  | NO   |     | NULL    |       |
| address | varchar(100) | NO   |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| id        | int         | NO   | PRI | NULL    |       |
| email     | varchar(50) | NO   | UNI | NULL    |       |
| phone     | varchar(20) | NO   | UNI | NULL    |       |
| person_id | int         | NO   | UNI | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
```
```sql
INSERT INTO person (id, name, address) VALUES (1, 'name1', 'add1');
INSERT INTO person (id, name, address) VALUES (2, 'name2', 'add2');
INSERT INTO person (id, name, address) VALUES (3, 'name3', 'add3');
SELECT * FROM person;

INSERT INTO contact_info (id, email, phone, person_id) VALUES (5, 'email1', 'phone1', '1');
INSERT INTO contact_info (id, email, phone, person_id) VALUES (4, 'email2', 'phone2', '2');
INSERT INTO contact_info (id, email, phone, person_id) VALUES (3, 'email3', 'phone3', '3');
INSERT INTO contact_info (id, email, phone, person_id) VALUES (2, 'email4', 'phone4', '4');
INSERT INTO contact_info (id, email, phone, person_id) VALUES (1, 'email5', 'phone5', '2');
SELECT * FROM contact_info;

SELECT * FROM person p JOIN contact_info c ON p.id = c.person_id;

DROP TABLE contact_info;
DROP TABLE person;
```
```
+----+-------+---------+
| id | name  | address |
+----+-------+---------+
|  1 | name1 | add1    |
|  2 | name2 | add2    |
|  3 | name3 | add3    |
+----+-------+---------+
+----+--------+--------+-----------+
| id | email  | phone  | person_id |
+----+--------+--------+-----------+
|  3 | email3 | phone3 |         3 |
|  4 | email2 | phone2 |         2 |
|  5 | email1 | phone1 |         1 |
+----+--------+--------+-----------+
+----+-------+---------+----+--------+--------+-----------+
| id | name  | address | id | email  | phone  | person_id |
+----+-------+---------+----+--------+--------+-----------+
|  1 | name1 | add1    |  5 | email1 | phone1 |         1 |
|  2 | name2 | add2    |  4 | email2 | phone2 |         2 |
|  3 | name3 | add3    |  3 | email3 | phone3 |         3 |
+----+-------+---------+----+--------+--------+-----------+
```

### 一对多关系
* 一对多关系指的是一个表中的每个记录都可以对应另一个表中的多条记录，但另一个表中的每个记录只能对应一个表中的记录
* 对于一对多关系，通常情况下不需要使用中间表
* 在一个一对多关系中，一个表中的主键通常也是另一个表中的外键
```sql
CREATE TABLE `customer` (
  `id` int NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE
);
DESC customer;
CREATE TABLE `order` (
  `id` int NOT NULL PRIMARY KEY,
  `order_date` datetime NOT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `customer_id` int NOT NULL,
  FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);
DESC `order`;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(50) | NO   |     | NULL    |       |
| email | varchar(50) | NO   | UNI | NULL    |       |
+-------+-------------+------+-----+---------+-------+
+-------------+---------------+------+-----+---------+-------+
| Field       | Type          | Null | Key | Default | Extra |
+-------------+---------------+------+-----+---------+-------+
| id          | int           | NO   | PRI | NULL    |       |
| order_date  | datetime      | NO   |     | NULL    |       |
| amount      | decimal(10,2) | NO   |     | NULL    |       |
| customer_id | int           | NO   | MUL | NULL    |       |
+-------------+---------------+------+-----+---------+-------+
```
```sql
INSERT INTO customer (id, name, email) VALUES (1, 'name1', 'email1');
INSERT INTO customer (id, name, email) VALUES (2, 'name2', 'email2');
INSERT INTO customer (id, name, email) VALUES (3, 'name3', 'email3');
SELECT * FROM customer;

INSERT INTO `order` (id, order_date, amount, customer_id) VALUES (1, '2024-04-04 22:09', 111, 1);
INSERT INTO `order` (id, order_date, amount, customer_id) VALUES (2, '2024-04-04 22:10', 222, 1);
INSERT INTO `order` (id, order_date, amount, customer_id) VALUES (3, '2024-04-04 22:11', 333, 2);
SELECT * FROM `order`;

SELECT * FROM customer c JOIN `order` o ON c.id = o.customer_id;

DROP TABLE `order`;
DROP TABLE customer;
```
```
+----+-------+--------+
| id | name  | email  |
+----+-------+--------+
|  1 | name1 | email1 |
|  2 | name2 | email2 |
|  3 | name3 | email3 |
+----+-------+--------+
+----+---------------------+--------+-------------+
| id | order_date          | amount | customer_id |
+----+---------------------+--------+-------------+
|  1 | 2024-04-04 22:09:00 | 111.00 |           1 |
|  2 | 2024-04-04 22:10:00 | 222.00 |           1 |
|  3 | 2024-04-04 22:11:00 | 333.00 |           2 |
+----+---------------------+--------+-------------+
+----+-------+--------+----+---------------------+--------+-------------+
| id | name  | email  | id | order_date          | amount | customer_id |
+----+-------+--------+----+---------------------+--------+-------------+
|  1 | name1 | email1 |  1 | 2024-04-04 22:09:00 | 111.00 |           1 |
|  1 | name1 | email1 |  2 | 2024-04-04 22:10:00 | 222.00 |           1 |
|  2 | name2 | email2 |  3 | 2024-04-04 22:11:00 | 333.00 |           2 |
+----+-------+--------+----+---------------------+--------+-------------+
```

### 多对多关系
* 多对多关系指的是一个表中的每个记录可以对应另一个表中的多条记录，反之亦然
* 在一个多对多关系中，通常需要使用一个中间表来跟踪两个表之间的关系；中间表中包含两个表的主键，这些主键共同作为中间表的复合主键
```sql
CREATE TABLE `student` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE
);
DESC student;
CREATE TABLE `course` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `teacher` varchar(50) NOT NULL
);
DESC course;
CREATE TABLE `enrollment` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`, `course_id`),
  FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
);
DESC enrollment;
```
```
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | NO   | PRI | NULL    |       |
| name  | varchar(50) | NO   |     | NULL    |       |
| email | varchar(50) | NO   | UNI | NULL    |       |
+-------+-------------+------+-----+---------+-------+
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| id      | int         | NO   | PRI | NULL    |       |
| name    | varchar(50) | NO   |     | NULL    |       |
| teacher | varchar(50) | NO   |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
+------------+------+------+-----+---------+-------+
| Field      | Type | Null | Key | Default | Extra |
+------------+------+------+-----+---------+-------+
| student_id | int  | NO   | PRI | NULL    |       |
| course_id  | int  | NO   | PRI | NULL    |       |
+------------+------+------+-----+---------+-------+
```
```sql
INSERT INTO student (id, name, email) VALUES (1, 'student1', 'email1');
INSERT INTO student (id, name, email) VALUES (2, 'student2', 'email2');
INSERT INTO student (id, name, email) VALUES (3, 'student3', 'email3');
SELECT * FROM student;

INSERT INTO course (id, name, teacher) VALUES (1, 'course1', 'teacher1');
INSERT INTO course (id, name, teacher) VALUES (2, 'course2', 'teacher2');
INSERT INTO course (id, name, teacher) VALUES (3, 'course3', 'teacher2');
SELECT * FROM course;

INSERT INTO enrollment (student_id, course_id) VALUES (1, 1);
INSERT INTO enrollment (student_id, course_id) VALUES (1, 2);
INSERT INTO enrollment (student_id, course_id) VALUES (2, 2);
INSERT INTO enrollment (student_id, course_id) VALUES (2, 3);
INSERT INTO enrollment (student_id, course_id) VALUES (3, 1);
SELECT * FROM enrollment;

SELECT * FROM student s LEFT JOIN enrollment e ON s.id = e.student_id LEFT JOIN course c ON c.id = e.course_id;

DROP TABLE enrollment;
DROP TABLE student;
DROP TABLE course;
```
```
+----+----------+--------+
| id | name     | email  |
+----+----------+--------+
|  1 | student1 | email1 |
|  2 | student2 | email2 |
|  3 | student3 | email3 |
+----+----------+--------+
+----+---------+----------+
| id | name    | teacher  |
+----+---------+----------+
|  1 | course1 | teacher1 |
|  2 | course2 | teacher2 |
|  3 | course3 | teacher2 |
+----+---------+----------+
+------------+-----------+
| student_id | course_id |
+------------+-----------+
|          1 |         1 |
|          3 |         1 |
|          1 |         2 |
|          2 |         2 |
|          2 |         3 |
+------------+-----------+
+----+----------+--------+------------+-----------+------+---------+----------+
| id | name     | email  | student_id | course_id | id   | name    | teacher  |
+----+----------+--------+------------+-----------+------+---------+----------+
|  1 | student1 | email1 |          1 |         1 |    1 | course1 | teacher1 |
|  1 | student1 | email1 |          1 |         2 |    2 | course2 | teacher2 |
|  2 | student2 | email2 |          2 |         2 |    2 | course2 | teacher2 |
|  2 | student2 | email2 |          2 |         3 |    3 | course3 | teacher2 |
|  3 | student3 | email3 |          3 |         1 |    1 | course1 | teacher1 |
+----+----------+--------+------------+-----------+------+---------+----------+
```

## 多表联查-多表连接查询的语法
* **SELECT：**用于指定需要查询的列
* **FROM：**用于指定查询的表格
* **JOIN：**用于指定需要连接的表格和连接条件
* **ON：**用于指定连接条件，它指定了哪些列用于连接两个表格
```sql
SELECT column_name(s)
FROM table1
JOIN table2 ON condition
```

## 多表联查-多表连接查询的常用方式
* **INNER JOIN：**返回两个表格中符合连接条件的记录
* **LEFT JOIN：**返回左表格中的所有记录，以及右表格中符合连接条件的记录
* **RIGHT JOIN：**返回右表格中的所有记录，以及左表格中符合连接条件的记录
* **FULL OUTER JOIN：**返回左表格和右表格中所有的记录，以及符合连接条件的记录（MySQL不直接支持，但也有实现方式）
* 注意：
  * **连接条件必须唯一：**连接条件必须是唯一的，否则会导致多个记录匹配，从而影响查询结果
  * **数据库中的表格必须有共同的字段：**多个表格需要连接时，这些表格必须有至少一个共同的字段，才能进行连接查询
  * **选择适当的连接方式：**不同的连接方式适用于不同的场景，需要根据具体情况选择适当的连接方式
```sql
CREATE TABLE Customers (
  CustomerID int(11) NOT NULL,
  CustomerName varchar(255) NOT NULL,
  ContactName varchar(255) NOT NULL,
  Country varchar(255) NOT NULL
);
INSERT INTO Customers (CustomerID, CustomerName, ContactName, Country) VALUES
(1, 'Alfreds', 'Maria', 'Germany'),
(2, 'Ana', 'Trujillo', 'Mexico'),
(3, 'Antonio', 'Moreno', 'Mexico'),
(4, 'Around', 'Hardy', 'UK'),
(5, 'Berglunds', 'Berglund', 'Sweden');
DESC Customers;
SELECT * FROM Customers;

CREATE TABLE Orders (
  OrderID int(11) NOT NULL,
  CustomerID int(11) NOT NULL,
  OrderDate date NOT NULL,
  ShipCity varchar(255) NOT NULL
);
INSERT INTO Orders (OrderID, CustomerID, OrderDate, ShipCity) VALUES
(1, 3, '2023-01-01', 'México D.F.'),
(2, 5, '2023-01-02', 'Luleå'),
(3, 1, '2023-01-03', 'Berlin'),
(4, 2, '2023-01-04', 'México D.F.'),
(5, 4, '2023-01-05', 'London');
DESC Orders;
SELECT * FROM Orders;
```
```
+--------------+--------------+------+-----+---------+-------+
| Field        | Type         | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+-------+
| CustomerID   | int          | NO   |     | NULL    |       |
| CustomerName | varchar(255) | NO   |     | NULL    |       |
| ContactName  | varchar(255) | NO   |     | NULL    |       |
| Country      | varchar(255) | NO   |     | NULL    |       |
+--------------+--------------+------+-----+---------+-------+
+------------+--------------+-------------+---------+
| CustomerID | CustomerName | ContactName | Country |
+------------+--------------+-------------+---------+
|          1 | Alfreds      | Maria       | Germany |
|          2 | Ana          | Trujillo    | Mexico  |
|          3 | Antonio      | Moreno      | Mexico  |
|          4 | Around       | Hardy       | UK      |
|          5 | Berglunds    | Berglund    | Sweden  |
+------------+--------------+-------------+---------+

+------------+--------------+------+-----+---------+-------+
| Field      | Type         | Null | Key | Default | Extra |
+------------+--------------+------+-----+---------+-------+
| OrderID    | int          | NO   |     | NULL    |       |
| CustomerID | int          | NO   |     | NULL    |       |
| OrderDate  | date         | NO   |     | NULL    |       |
| ShipCity   | varchar(255) | NO   |     | NULL    |       |
+------------+--------------+------+-----+---------+-------+
+---------+------------+------------+------------+
| OrderID | CustomerID | OrderDate  | ShipCity   |
+---------+------------+------------+------------+
|       1 |          3 | 2023-01-01 | Mxico D.F. |
|       2 |          5 | 2023-01-02 | Lule       |
|       3 |          1 | 2023-01-03 | Berlin     |
|       4 |          2 | 2023-01-04 | Mxico D.F. |
|       5 |          4 | 2023-01-05 | London     |
+---------+------------+------------+------------+
```

### INNER JOIN
* 内连接（INNER JOIN）是多表连接查询中最常用的方式，它返回两个表格中符合连接条件的记录
```sql
SELECT Orders.OrderID, Customers.CustomerName 
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```
```
+---------+--------------+
| OrderID | CustomerName |
+---------+--------------+
|       3 | Alfreds      |
|       4 | Ana          |
|       1 | Antonio      |
|       5 | Around       |
|       2 | Berglunds    |
+---------+--------------+
```
```sql
SELECT Orders.*, Customers.*
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```
```
+---------+------------+------------+------------+------------+--------------+-------------+---------+
| OrderID | CustomerID | OrderDate  | ShipCity   | CustomerID | CustomerName | ContactName | Country |
+---------+------------+------------+------------+------------+--------------+-------------+---------+
|       3 |          1 | 2023-01-03 | Berlin     |          1 | Alfreds      | Maria       | Germany |
|       4 |          2 | 2023-01-04 | Mxico D.F. |          2 | Ana          | Trujillo    | Mexico  |
|       1 |          3 | 2023-01-01 | Mxico D.F. |          3 | Antonio      | Moreno      | Mexico  |
|       5 |          4 | 2023-01-05 | London     |          4 | Around       | Hardy       | UK      |
|       2 |          5 | 2023-01-02 | Lule       |          5 | Berglunds    | Berglund    | Sweden  |
+---------+------------+------------+------------+------------+--------------+-------------+---------+
```

### LEFT JOIN
* 左连接（LEFT JOIN）返回左表格中的所有记录，以及右表格中符合连接条件的记录
```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```
```
+--------------+---------+
| CustomerName | OrderID |
+--------------+---------+
| Alfreds      |       3 |
| Ana          |       4 |
| Antonio      |       1 |
| Around       |       5 |
| Berglunds    |       2 |
+--------------+---------+
5 rows in set (0.00 sec)
```

### RIGHT JOIN
* 右连接（RIGHT JOIN）返回右表格中的所有记录，以及左表格中符合连接条件的记录
```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
RIGHT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```
```
+--------------+---------+
| CustomerName | OrderID |
+--------------+---------+
| Antonio      |       1 |
| Berglunds    |       2 |
| Alfreds      |       3 |
| Ana          |       4 |
| Around       |       5 |
+--------------+---------+
```

### FULL OUTER JOIN
* 全外连接（FULL OUTER JOIN）返回左表格和右表格中所有的记录，以及符合连接条件的记录
* MySQL 不支持 FULL OUTER JOIN，但可以通过使用 UNION 操作符模拟其行为
* UNION 操作符：UNION 操作符用于合并两个 SELECT 语句的结果集合，同时去除其中的重复记录
* 在模拟 FULL OUTER JOIN 时，需要使用 UNION 操作符将左连接和右连接的结果合并起来
```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
UNION
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
RIGHT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```
```
+--------------+---------+
| CustomerName | OrderID |
+--------------+---------+
| Alfreds      |       3 |
| Ana          |       4 |
| Antonio      |       1 |
| Around       |       5 |
| Berglunds    |       2 |
+--------------+---------+
```


```sql

```
```

```
```sql

```
```

```
```sql

```
```

```
```sql

```
```

```
```sql

```
```

```
```sql

```
```

```
```sql

```
```

```
```sql

```
```

```

https://www.lalapodo.com/academy/JapanWork/405 04:29