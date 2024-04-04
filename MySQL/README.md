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

```
```

```

### 一对多关系
* 一对多关系指的是一个表中的每个记录都可以对应另一个表中的多条记录，但另一个表中的每个记录只能对应一个表中的记录
* 对于一对多关系，通常情况下不需要使用中间表
* 在一个一对多关系中，一个表中的主键通常也是另一个表中的外键
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