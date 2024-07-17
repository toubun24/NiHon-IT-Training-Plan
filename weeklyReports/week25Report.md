# Week 25 Report

## 学习内容及时长

* **2023.07.15 月曜日:** 10min
* Documents 14:40-14:50

* **2023.07.16 火曜日:** 3h9min
* SpringBoot 22:30-23:00 23:40-01:10 01:20-02:29

* **2023.07.17 水曜日:** 
* MyBatis 12:20-13:35
* SpringMVC&MyBatis 16:20-19:05 19:20-19:35 22:10-23:50
* RabbitMQ 

* **2023.07.18 木曜日:** 

* **2023.07.19 金曜日:** 

* **2023.07.20 土曜日:** 

* **2023.07.21 日曜日:** 

## 开发笔记

### 后端搭建

#### 搭建SpringBoot
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240716225456.png)

* 换为MyBatis+lombok
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240717175804.png)

* 并继续添加依赖
  * MyBatis
    ```xml
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.9.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
    <!--Mybatis分页插件-->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper</artifactId>
        <version>6.1.0</version>
    </dependency>
    ```
    * SpringMVC
    ```xml
    <dependency>
        <groupId>commons-logging</groupId>
        <artifactId>commons-logging</artifactId>
        <version>1.2</version>
    </dependency>
    <!-- ServletAPI -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <!-- <scope>provided</scope> -->
    </dependency>
    <dependency>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>tomcat-api</artifactId>
        <version>10.1.23</version>
    </dependency>

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.3.1</version>
    </plugin>
    ```

* IDEA项目导入
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240716225859.png)

* Run 'DemoApplication.main()'
```bash
Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2024-07-16T23:46:58.562+08:00 ERROR 4144 --- [demo] [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class


Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).
```
```xml
<!--		<dependency>-->
<!--			<groupId>org.springframework.boot</groupId>-->
<!--			<artifactId>spring-boot-starter-data-jpa</artifactId>-->
<!--		</dependency>-->
```

* `http://localhost:8080/`跳转到`http://localhost:8080/login`
```bash
Using generated security password: f8b36679-7835-4b4e-9d60-4bd1ffda1f4c
```

* 输入账号`user`，密码`f8b36679-7835-4b4e-9d60-4bd1ffda1f4c`
```bash
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Wed Jul 17 00:04:18 HKT 2024
There was an unexpected error (type=Not Found, status=404).
```

* 新建`com/example/TestController.java`
```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // RestAPIController
public class TestController {
    @GetMapping("/hello") // 配置访问路径
    public String hello(){
        return "hello world"; // JAVA对象默认返回JSON字符串
    }
}
```

#### Docker方式启动MySQL
```bash
G:
cd G:\NiHon-IT-Training-Plan\MySQL
docker ps

CONTAINER ID   IMAGE          COMMAND                   CREATED        STATUS              PORTS                               NAMES
c6471e03b8f8   mysql:latest   "docker-entrypoint.s…"   5 months ago   Up About a minute   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1
```
```bash
docker exec -it c6471e03b8f8 bash
bash-4.4# mysql -u root -p
Enter password:12345678

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.3.0 MySQL Community Server - GPL
Copyright (c) 2000, 2024, Oracle and/or its affiliates.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```
```bash
mysql> show databases;

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
6 rows in set (0.01 sec)
```
```bash
# reate database mydatabase;
mysql> create database demo
    -> character set utf8mb4
    -> collate utf8mb4_general_ci;

Query OK, 1 row affected (0.01 sec)
```
```bash
mysql> use demo;

Database changed
```
```bash
mysql> CREATE TABLE users ( # 仅测试用
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     username VARCHAR(255) NOT NULL,
    ->     stateId INT NOT NULL,
    ->     password VARCHAR(255) NOT NULL,
    ->     starList TEXT,  -- TEXTJSON
    ->     location TEXT,  --
    ->     followList TEXT,  --
    ->     auditNum INT DEFAULT 0,  -- 0
    ->     balance DECIMAL(10, 2) DEFAULT 0.00,  -- 0.00
    ->     registerTime BIGINT,  --
    ->     avatar VARCHAR(255),  --
    ->     followerList TEXT  -- ID
    -> );

Query OK, 0 rows affected (0.02 sec)
```
```bash
mysql> show tables;

+----------------+
| Tables_in_demo |
+----------------+
| users          |
+----------------+
1 row in set (0.00 sec)
```
```bash
mysql> INSERT INTO users (username, stateId, password, id, starList, location, followList, auditNum, balance, registerTime, avatar, followerList) VALUES # 仅测试用
    -> ('admin', 7, '123', 1, '[]', '[]', '[]', 1, 0.00, NULL, NULL, NULL),
    -> ('manager', 8, '123', 2, '[]', '[]', '[]', NULL, 0.00, NULL, NULL, NULL),
    -> ('toubun', 1, '123', 3, '[]', '[]', '[]', NULL, 100.00, 1700221413462, NULL, NULL),
    -> ('toubun2', 1, '123', 4, '[]', '["", "", ""]', '[]', NULL, 354.00, 1709221413462, '3919909539520250412.jpg', '[8]');

Query OK, 4 rows affected (0.00 sec)
Records: 4  Duplicates: 0  Warnings: 0
```

#### JPA方式
* 创建数据访问层(Data Access O..)的Package`com/example/dao`以及Class`com/example/dao/Users.java`和Interface`com/example/dao/UsersRepository.java`

* 创建SERVICE层Package`com/example/service`以及Class`com/example/dao/Users.java`和Interface`com/example/dao/UsersRepository.java`

* 创建Controller层Package`com/example/controller`以及Class`com/example/controller/UsersController.java`
```bash
Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2024-07-17T01:47:40.299+08:00 ERROR 26872 --- [demo] [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class


Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).


Process finished with exit code 1
```

* `demo\src\main\resources\application.properties`中添加语句以配置`url`
```bash
spring.application.name=demo # 原本就有

spring.datasource.url=jdbc:mysql://localhost:3306/test?characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=12345678
```

* `http://localhost:8080/users/1`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240717022448.png)
  * 这应该是JDBC方式搭建的数据库连接
  * 删减了部分表的项，避免了由于搭建相关功能不完全导致的一些bug，后续继续完善就行
  * 注意`application.properties`中的url需要是自己的数据库名称
  * 注意补全`com/example/dao/Users.java`中的`getters and setters`

#### MyBatis方式
* 创建Package`com/example/dao`和Package`com/example/mapper`
* 创建xml配置文件`demo\src\main\resources\mybatisConfig.xml`
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!--开启驼峰命名-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--PageHelper分页插件日志-->
        <setting name="logImpl" value="STDOUT_LOGGING"/>
        <!--启用二级缓存-->
        <setting name="cacheEnabled" value="true"/>
    </settings>
    <!--类型别名-->
    <typeAliases>
        <!--
        typeAlias：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，别名不区分大小写。不设置此属性即使用默认别名，为类名
        -->
        <!--除此之外还可以使用package标签直接给某个软件包所有类设置默认别名-->
        <typeAlias type="com.lalapodo.Dao.TestTable" alias="test"/>
    </typeAliases>
    <!--PageHelper分页插件-->
    <plugins>
        <!-- com.github.pagehelper为PageHelper类所在包名 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <property name="helperDialect" value="mysql"/>
        </plugin>
    </plugins>
    <!--数据库配置-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydatabase"/>
                <property name="username" value="root"/>
                <property name="password" value="12345678"/>
            </dataSource>
        </environment>
        <!--        Mybatis多环境-->
        <environment id="test">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/user"/>
                <property name="username" value="root"/>
                <property name="password" value="12345678"/>
            </dataSource>
        </environment>
    </environments>
    <!--SQL映射-->
    <mappers>
        <mapper resource="mappers/TestMapper.xml"/>
        <mapper resource="mappers/TestMapper2.xml"/>
    </mappers>
</configuration>
```
* 创建Interface`com/example/mapper/TestMapper.java`和Class`com/example/dao/TestTable.java`
* 创建SQL映射文件`demo\src\main\resources\mappers\TestMapper.xml`
* 创建单元测试Class`demo\src\test\java\SqlTest.java`

#### SpringMVC
* 创建SpringMVC配置文件：创建Directory`src/main/webapp`
* ~~`Current File`-`Edit Configurations...`-`+`-`Smart Tomcat`~~
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240717170140.png)
* 创建SpringMVC配置文件：创建Package`com/example/config`与Class`com/example/config/Config`
* 初始化Servlet容器：创建Class`com/example/config/ServletConfig.java`
* 返回中文信息乱码解决：创建Class`com/example/config/WebConfiguration.java`
* 创建Package`com/example/controller`和Class`com/example/controller/TestController.java`
* ~~删除以下文件以防启动失败~~
  * ~~`demo\src\test\java\com\example\DemoApplicationTests.java`~~
  * ~~`demo\src\main\java\com\example\ServletInitializer.java`~~
  * ~~`demo\src\main\java\com\example\DemoApplication.java`~~
* 在`application.properties`中添加一句`mybatis.mapper-locations=classpath:mappers/TestMapper.xml`

#### RabbitMQ






















## 遇见问题

### SpringBoot刚搭建后运行main并进入`http://localhost:8080/`跳转到`http://localhost:8080/login`登录页面
* 原因：项目中包含了Spring Security
```bash
Using generated security password: f8b36679-7835-4b4e-9d60-4bd1ffda1f4c

This generated password is for development use only. Your security configuration must be updated before running your application in production.

2024-07-16T23:55:42.014+08:00  INFO 21968 --- [demo] [           main] r$InitializeUserDetailsManagerConfigurer : Global AuthenticationManager configured with UserDetailsService bean with name inMemoryUserDetailsManager
2024-07-16T23:55:42.148+08:00  INFO 21968 --- [demo] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2024-07-16T23:55:42.158+08:00  INFO 21968 --- [demo] [           main] com.example.DemoApplication              : Started DemoApplication in 2.146 seconds (process running for 2.462)
2024-07-16T23:55:57.770+08:00  INFO 21968 --- [demo] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2024-07-16T23:55:57.770+08:00  INFO 21968 --- [demo] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2024-07-16T23:55:57.771+08:00  INFO 21968 --- [demo] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```
* 参考[链接](https://blog.csdn.net/qq_65142821/article/details/135960052)
* 账号为`user`，密码为`f8b36679-7835-4b4e-9d60-4bd1ffda1f4c`
* 但测试时还是注解掉吧先
```xml
<!--		<dependency>-->
<!--			<groupId>org.springframework.boot</groupId>-->
<!--			<artifactId>spring-boot-starter-security</artifactId>-->
<!--		</dependency>-->
```

### 初始测试SpringMVC时启动后无法在8080/hello获得期望输出，各种报错
* 其中部分报错如：
  ```bash
  NOTE: Picked up JDK_JAVA_OPTIONS: --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
  ```
* 原先跟着课件做时没遇到这个情况，这次最后找到问题所在为由于使用了Spring Initializr，导致默认创建时多了一些文件，启动时这些弃用文件的优先级更高导致启动后各种失败
* 解决方案一：删除以下文件
  * `demo\src\test\java\com\example\DemoApplicationTests.java`
  * `demo\src\main\java\com\example\ServletInitializer.java`
  * `demo\src\main\java\com\example\DemoApplication.java`
* 解决方案二：在SpringBoot框架下无需专门配置并使用TomCat方式启动

### Web无法输出数据库内容：Invalid bound statement (not found)
* 报错信息为：
```bash
org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.example.mapper.TestMapper.getAll

2024-07-17T23:27:37.020+08:00 ERROR 24700 --- [demo] [nio-8080-exec-7] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.example.mapper.TestMapper.getAll] with root cause
```
* 解决方案：
在Spring Boot项目中，如果您的Mapper XML文件位于`src/main/resources`下的子目录中（如`mappers`目录），您可以通过以下几种方式来确保MyBatis能够找到这些Mapper文件：

#### 使用`@MapperScan`注解

`@MapperScan`注解是Spring Boot提供的，用于指定需要扫描的Mapper接口所在的包路径。虽然这个注解本身不直接指定Mapper XML文件的位置，但Spring Boot会按照惯例去`src/main/resources`下的相同包路径（相对于Mapper接口）查找Mapper XML文件，或者您可以通过MyBatis的配置属性来指定XML文件的位置。

如果您的Mapper接口和XML文件不在同一个包路径下，但您仍然想使用`@MapperScan`，那么您可以通过在`application.properties`或`application.yml`中配置MyBatis的`mapper-locations`属性来指定XML文件的位置。

然而，更常见的做法是保持Mapper接口和Mapper XML文件在逻辑上的一致，即它们位于相同的包路径下（尽管在文件系统上可能位于不同的目录中）。在这种情况下，您只需要在包含Mapper接口的包上使用`@MapperScan`注解即可。

如果您的Mapper接口位于`com.example.mapper`包下，而Mapper XML文件位于`src/main/resources/mappers`目录下，并且您想要保持这种结构，那么您可以：

1. **在`application.properties`或`application.yml`中配置**（推荐，因为不依赖于包路径的一致性）：

   对于`application.properties`：
   ```properties
   mybatis.mapper-locations=classpath:mappers/*.xml
   ```

   对于`application.yml`（YAML格式）：
   ```yaml
   mybatis:
     mapper-locations: classpath:mappers/*.xml
   ```

   这会告诉MyBatis在`classpath`下的`mappers`目录中查找所有XML文件。

2. **（可选）使用`@MapperScan`注解**（如果您还想限制扫描的Mapper接口包）：

   在您的Spring Boot启动类或配置类上添加`@MapperScan`注解，指定Mapper接口所在的包路径。由于您已经通过`mapper-locations`属性指定了XML文件的位置，所以这一步是可选的，但它有助于确保只有指定包下的Mapper接口被扫描。

   ```java
   @SpringBootApplication
   @MapperScan("com.example.mapper")
   public class YourApplication {
       public static void main(String[] args) {
           SpringApplication.run(YourApplication.class, args);
       }
   }
   ```

请注意，`@MapperScan`注解和`mapper-locations`属性并不是互斥的。`@MapperScan`用于指定Mapper接口的包路径，而`mapper-locations`用于指定Mapper XML文件的位置。在大多数情况下，当Mapper接口和XML文件遵循相同的包路径约定时，您可能只需要使用`@MapperScan`。但是，当它们位于不同的位置时，您需要同时使用这两个配置。
* 最终解决方式：在`application.properties`中添加了一句`mybatis.mapper-locations=classpath:mappers/TestMapper.xml`