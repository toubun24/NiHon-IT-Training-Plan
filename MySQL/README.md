# MySQL

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
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
* ``
```

```
https://www.lalapodo.com/academy/JapanWork/405 04:29