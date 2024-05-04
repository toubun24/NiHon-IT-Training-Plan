# Week 20 Report

## 学习内容及时长

* **2023.04.29 月曜日:** 
  * SpringMVC-获取请求参数 18:10-19:55

* **2023.04.30 火曜日:** 
  * SpringMVC-JSON数据处理 15:50-16:32
  * SpringMVC-数据响应 16:32-16:55
  * SpringMVC-RESTful快速入门 19:15-19:36
  * SpringMVC-拦截器 19:36-20:15
  * SpringBoot-介绍 23:30-23:40 01:05-01:10
  * SpringBoot-第一个项目 01:10-01:45

* **2023.05.01 水曜日:** 
  * SpringBoot-第一个项目 02:10-02:51
  * SpringBoot-配置文件 02:51-03:25
  * SpringBoot-配置文件读取 03:55-04:28
  * SpringBoot-配置文件多环境 04:28-04:40

* **2023.05.02 木曜日:** 
  * SpringBoot-命令行启动配置 20:40-20:53
  * SpringBoot-集成Quartz概念 20:53-21:05
  * SpringBoot-集成Quartz操作 21:10-21:27
  * SpringBoot-Task使用 21:27-21:43
  * SpringBoot-集成MyBatis 21:43-00:30

* **2023.05.03 金曜日:** 
  * SpringBoot-CRUD练习 20:30-21:05
  * SpringMaven-介绍与配置 21:05-21:10 21:50-22:15
  * SpringMaven-常用命令 22:15-22:40
  * SpringMaven-POM介绍 23:50-00:00
  * SpringMaven-可传递性依赖 00:00-00:11
  * SpringMaven-依赖管理 00:11-01:00

* **2023.05.04 土曜日:** 
  * SpringMaven-远程仓库搭建 15:15-15:45
  * SpringMaven-远程仓库配置使用 15:55-17:25
  * SpringMybatis-介绍 19:35-19:46
  * SpringMybatis-第一个项目快速入门 19:46-20:15
  * SpringMybatis-配置文件介绍 
  * SpringMybatis-多环境类型别名配置 
  * SpringMybatis-获取参数 
  * SpringMybatis-自定义结果映射 
  * SpringMybatis-association标签 
  * SpringMybatis-collection标签 
  * SpringMybatis-SQL执行(上) 
  * SpringMybatis-SQL执行(下) 
  * SpringMybatis-if与where标签 
  * SpringMybatis-choose与set标签 
  * SpringMybatis-trim与foreach标签 
  * SpringMybatis-分页插件 
  * SpringMybatis-缓存 

* **2023.05.05 日曜日:** 


## 学习笔记

### lombok快速构造
```xml
<!--lombok-->        
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
    <scope>compile</scope>
</dependency>
```
```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // @ToString, @EqualsAndHashCode, @Getter / @Setter and @RequiredArgsConstructor
@AllArgsConstructor // 自动添加全属性构造方法，顺序按照属性的定义顺序
@NoArgsConstructor // 自动添加无参构造方法 // 没有会报错
public class User {
    private Long id;
    private String name;
    private String password;
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429194758.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429195035.png)
* 更多细节可参考[链接](https://blog.csdn.net/weixin_63888301/article/details/134320150)，但这个链接里面乱写哼，还是参考[官方文档](https://projectlombok.org/features/Data)吧

### 请求参数与方法形参对应不上时使用@RequestParam注解
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429195448.png)

### SpringMVC JSON数据处理

#### `@RequestBody User`
```java
@RequestMapping("/testjson")
@ResponseBody
public String testjson(@RequestBody User user){ // @RequestBody: 将外部传递的json数据映射到形参的集合或对象中
    System.out.println(user);
    return "testjson";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430162553.png)
```
User(id=444, name=wsx, password=qwe)
```

#### `@RequestBody List<User>`
```java
@RequestMapping("/testjson")
@ResponseBody
// public String testjson(@RequestBody User user){
public String testjson(@RequestBody List<User> user){
    System.out.println(user);
    return "testjson";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430163126.png)
```
[User(id=444, name=wsx, password=qwe), User(id=555, name=qqx, password=xxq), User(id=5552, name=qqx2, password=xxq2)]
```

### 响应JSON数据

#### `return User`
```java
@RequestMapping("/responsejson")
@ResponseBody
public User responsejson(){
    User user = new User();
    user.setId(1L);
    user.setName("张三");
    user.setPassword("abc123");
    return user;
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430164956.png)

#### `return List<User>`
```java
@RequestMapping("/responsejson2")
@ResponseBody
// public User responsejson2(){
public List<User> responsejson2(){
    User user = new User();
    user.setId(1L);
    user.setName("张三");
    user.setPassword("abc123");
    User user2 = new User();
    user2.setId(12L);
    user2.setName("张三2");
    user2.setPassword("abc1232");
    List<User> list = new ArrayList<>();
    list.add(user);
    list.add(user2);
    return list;
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430165430.png)

### RESTful API

#### RESTful GET
```java
@GetMapping // 查询
public String getUser(){
    return "获取所有User信息";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430192903.png)

#### RESTful POST
```java
@PostMapping // 添加
public String insertUser(@RequestBody User user){
    System.out.println(user);
    return "新增用户数据";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430193034.png)
```
User(id=444, name=wsx, password=qwe)
```

#### RESTful PUT
```java
@PutMapping("/{userId}") // 更新
public String updateUser(@PathVariable("userId") Long userId, @RequestBody User user){
    System.out.println(userId);
    System.out.println(user);
    return "更新用户数据";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430193255.png)
```
444
User(id=444, name=wsx22, password=qwe22)
```

#### RESTful DELETE
```java
@DeleteMapping("/{userId}") // 删除
public String deleteUser(@PathVariable("userId") Long userId){
    System.out.println(userId);
    return "删除用户数据";
}
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240430193449.png)

### CRUD练习

#### POST
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240503205425.png)

#### DELETE
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240503210153.png)

#### PUT
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240503210345.png)

### 配置MAVEN环境变量
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240503222130.png)
* 参考[链接](https://blog.csdn.net/hetupyou/article/details/136468007)

### MAVEN install
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240503223812.png)

### MAVEN pom父

#### pom父
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504004909.png)

#### pom父配置可选依赖
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504005646.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504010033.png)

### 远程仓库搭建
```
docker run -d -p 8081:8081 --name nexus sonatype/nexus3
```
```
Unable to find image 'sonatype/nexus3:latest' locally
latest: Pulling from sonatype/nexus3
22ebf0e44c85: Pull complete
fa750a094ee3: Pull complete
1f4a0800cfef: Pull complete
e84ea3691eef: Pull complete
cdea008ff1c4: Pull complete
ee2d6100f273: Pull complete
eee9c13a3249: Pull complete
Digest: sha256:80b945be128a6466320df09589d73ed4a5dbf09f3495243281d264bbc643228c
Status: Downloaded newer image for sonatype/nexus3:latest
0211e0409935e82f19fe6642daf86f6e7b2bf5b244e37f582af0eccbf327dad6
```

```
docker ps
```
```
CONTAINER ID   IMAGE             COMMAND                   CREATED              STATUS              PORTS                    NAMES
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   About a minute ago   Up About a minute   0.0.0.0:8081->8081/tcp   nexus
```

`http://localhost:8081/`-`Sign in`
```
docker exec -it 0211e0409935 bash
bash-4.4$ cat /nexus-data/admin.password
```
```
f74ede78-9de9-44ba-926f-69f0fea27896
```

```
admin
f74ede78-9de9-44ba-926f-69f0fea27896
```
```
12345678
12345678
Enable anonymous access
```

### 远程仓库配置使用
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504155927.png)
* `...\IntelliJ IDEA Community Edition 2023.1.2\plugins\maven\lib\maven3\conf\settings.xml`:
```xml
<!-- servers
  | This is a list of authentication profiles, keyed by the server-id used within the system.
  | Authentication profiles can be used whenever maven must make a connection to a remote server.
  |-->
<servers>
  <!-- server
    | Specifies the authentication information to use when connecting to a particular server, identified by
    | a unique name within the system (referred to by the 'id' attribute below).
    |
    | NOTE: You should either specify username/password OR privateKey/passphrase, since these pairings are
    |       used together.
    |
  <server>
    <id>deploymentRepo</id>
    <username>repouser</username>
    <password>repopwd</password>
  </server>
  -->
  <server>
    <!--仓库Name-->
    <id>testrepo</id>
    <!--用户名-->
    <username>admin</username>
    <!--密码-->
    <password>12345678</password>
  </server>
  <!-- Another sample, using keys to authenticate.
  <server>
    <id>siteServer</id>
    <privateKey>/path/to/private/key</privateKey>
    <passphrase>optional; leave empty if not used.</passphrase>
  </server>
  -->
</servers>
```
```xml
<!-- mirrors
  | This is a list of mirrors to be used in downloading artifacts from remote repositories.
  |
  | It works like this: a POM may declare a repository to use in resolving certain artifacts.
  | However, this repository may have problems with heavy traffic at times, so people have mirrored
  | it to several places.
  |
  | That repository definition will have a unique id, so we can create a mirror reference for that
  | repository, to be used as an alternate download site. The mirror site will be the preferred
  | server for that repository.
  |-->
<mirrors>
  <!-- mirror
    | Specifies a repository mirror site to use instead of a given repository. The repository that
    | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
    | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
    |
  <mirror>
    <id>mirrorId</id>
    <mirrorOf>repositoryId</mirrorOf>
    <name>Human Readable Name for this Mirror.</name>
    <url>http://my.repository.com/repo/path</url>
  </mirror>
    -->
  <!-- <mirror>
    <id>maven-default-http-blocker</id>
    <mirrorOf>external:http:*</mirrorOf>
    <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
    <url>http://0.0.0.0/</url>
    <blocked>true</blocked>
  </mirror> -->
  <mirror>
    <!--仓库组ID-->
    <id>maven-public</id>
    <!--*代表所有内容都从自定义仓库获取-->
    <mirrorOf>*</mirrorOf>
    <!--私服仓库组maven-public的访问路径-->
    <url>http://localhost:8081/repository/maven-public/</url>
  </mirror>
</mirrors>
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504161501.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504163501.png)
```xml
<!--远程仓库配置使用 in Spring/_05_SpringMaven/pom.xml-->
<distributionManagement>
<!--<repository>-->
<!--    <id>xxx</id>-->
<!--    <url>xxx</url>-->
<!--</repository>-->
    <snapshotRepository>
        <id>testrepo</id>
        <url>http://localhost:8081/repository/testrepo/</url>
    </snapshotRepository>
</distributionManagement>
```
`_05_SpringMaven-Lifecycle-clean`-`_05_SpringMaven-Lifecycle-deploy`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504172311.png)

## 内容拓展

### `@Autowired`
https://blog.csdn.net/m0_50308467/article/details/135240536

### `implements`
https://blog.csdn.net/m0_58761900/article/details/124801632







































## 遇见问题

### 【已解决】SpringMVC 方法形参获取请求参数失败`Name for argument of type [java.lang.String] not specified, and parameter name information not available via reflection. Ensure that the compiler uses the '-parameters' flag.`
```
HTTP Status 500 – Internal Server Error
Type Exception Report

Message Request processing failed: java.lang.IllegalArgumentException: Name for argument of type [java.lang.String] not specified, and parameter name information not available via reflection. Ensure that the compiler uses the '-parameters' flag.

Description The server encountered an unexpected condition that prevented it from fulfilling the request.
```
```java
@RequestMapping("/getparameter2")
@ResponseBody
public String getparameter2(String name, String password){
    System.out.println(name);
    System.out.println(password);
    return "getparameter2";
}
```
参考[链接1](https://blog.csdn.net/maktoub/article/details/136760857)和[链接2](https://blog.csdn.net/aiben2024/article/details/102356327)，初步得出结论为新版spring-webmvc不再支持这种写法，所以要么修改依赖版本至`spring-webmvc@6.0.6`以前，要么加`@RequestParam`注解

### SpringMVC JSON数据处理 `java.lang.ClassNotFoundException: com.fasterxml.jackson.databind.cfg.DatatypeFeature`
```
30-Apr-2024 16:10:08.069 INFO [http-nio-8080-exec-1] org.springframework.web.servlet.FrameworkServlet.initServletBean Initializing Servlet 'dispatcher'
30-Apr-2024 16:10:08.095 WARNING [http-nio-8080-exec-1] org.springframework.context.support.AbstractApplicationContext.refresh Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'routerFunctionMapping' defined in class path resource [org/springframework/web/servlet/config/annotation/DelegatingWebMvcConfiguration.class]: Failed to instantiate [org.springframework.web.servlet.function.support.RouterFunctionMapping]: Factory method 'routerFunctionMapping' threw exception with message: com/fasterxml/jackson/databind/cfg/DatatypeFeature
30-Apr-2024 16:10:08.096 SEVERE [http-nio-8080-exec-1] org.springframework.web.servlet.FrameworkServlet.initServletBean Context initialization failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'routerFunctionMapping' defined in class path resource [org/springframework/web/servlet/config/annotation/DelegatingWebMvcConfiguration.class]: Failed to instantiate [org.springframework.web.servlet.function.support.RouterFunctionMapping]: Factory method 'routerFunctionMapping' threw exception with message: com/fasterxml/jackson/databind/cfg/DatatypeFeature
...
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.springframework.web.servlet.function.support.RouterFunctionMapping]: Factory method 'routerFunctionMapping' threw exception with message: com/fasterxml/jackson/databind/cfg/DatatypeFeature
...
Caused by: java.lang.NoClassDefFoundError: com/fasterxml/jackson/databind/cfg/DatatypeFeature
...
Caused by: java.lang.ClassNotFoundException: com.fasterxml.jackson.databind.cfg.DatatypeFeature
...
```
根据经验，大概率是新引入的依赖的版本问题，参考[文档](https://mvnrepository.com/artifact/org.springframework.integration/spring-integration-core/6.1.3)，调整相应依赖版本后成功解决
```xml
<!--jackson-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
<!--    <version>2.13.4.2</version>-->
    <version>2.15.2</version>
</dependency>
```

### 【已解决】SpringBoot IDEA社区版新建项目没有Spring Initializr
* 参考[链接](https://blog.csdn.net/xiangkouyizhimao/article/details/134959972)的[方法二](https://blog.csdn.net/weixin_45014413/article/details/129726113)(方法一的Spring Boot Helper插件现在要收费否则`no license`无法使用)，在`https://start.spring.io/`进行配置后下载
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240501013034.png)
* 但这样的目录名里依然是各种的`demo`，所以需要继续优化修改名称等
* 参考课件删除了`gitignore`, `HELP.md`, `mvnw`, `mvnw.cmd`文件以及`.mvn`目录
* 项目启动方式：`_04_SpringBoot/src/main/java/com/example/demo/Application.java`文件中直接以`Current File`启动即可，注意不是`_04_SpringBoot/src/test/java/com/example/demo/ApplicationTests.java`文件
* 项目打包方式：停止运行中的项目后，点击IDEA右侧边栏`Maven-_04_SpringBoot-Lifecycle-package`，随后生成`target`文件夹，找到`demo-0.0.1-SNAPSHOT.jar`文件，右键运行即可；或者在TERMINAL执行
```
cd .../target
java -jar demo-0.0.1-SNAPSHOT.jar
```
也可以实现运行
* 根据课件，`_04_SpringBoot/src/main/resources/application.properties`被重命名为`application.yml`，同时创建了更高优先级的`_04_SpringBoot/src/main/resources/config/application.yml`

### 【已解决】SpringBoot pom.xml `Plugin 'org.springframework.boot:spring-boot-maven-plugin:3.2.5' not found`
```
Plugin 'org.springframework.boot:spring-boot-maven-plugin:3.2.5' not found
```
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId> <!--此处报错-->
            <version>3.2.5</version> <!--默认没有这里，加上这句指明版本号后就可以下载依赖解决报错了-->
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 【基本解决】Spring MyBatis 运行报错
```
***************************
APPLICATION FAILED TO START
***************************

Description:

Field testService in com.example.demo.Controller.Test2Controller required a bean of type 'com.example.demo.Service.TestService' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)


Action:

Consider defining a bean of type 'com.example.demo.Service.TestService' in your configuration.


Process finished with exit code 1
```
* 给`TestServiceImpl`补上`@Service`后
```java
package com.example.demo.Service.Imlp;

@Service // new
public class TestServiceImpl implements TestService {
    @Autowired
    private TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }
}

```
```
***************************
APPLICATION FAILED TO START
***************************

Description:

The dependencies of some of the beans in the application context form a cycle:

   test2Controller (field private com.example.demo.Service.TestService com.example.demo.Controller.Test2Controller.testService)
┌─────┐
|  testServiceImpl (field private com.example.demo.mapper.TestMapper com.example.demo.Service.Imlp.TestServiceImpl.testMapper)
└─────┘


Action:

Relying upon circular references is discouraged and they are prohibited by default. Update your application to remove the dependency cycle between beans. As a last resort, it may be possible to break the cycle automatically by setting spring.main.allow-circular-references to true.
```
* 相关功能的实现在`_04_SpringBoot/src/main/resources/mapper/TestServiceMapper.xml`，注意到文件路径错误，因此对其进行修改
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lalapodo.mapper.TestMapper"> <!--路径错误-->
    <select id="getAll" resultType="com.lalapodo.Bean.TestTable"> <!--路径错误-->
        select * from test_table
    </select>
</mapper>
```
* 修改为`<mapper namespace="com.example.demo.mapper.TestMapper">`和`<select id="getAll" resultType="com.example.demo.Bean.TestTable">`，但报错依然存在
* 注意到数据库路径也存在同样问题，对`_04_SpringBoot/src/main/resources/config/application.yml`中的相关路径进行修改
```yml
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    # url: jdbc:mysql://localhost:3306/lalapodo
    url: jdbc:mysql://localhost:3306/mydatabase
    username: root
    password: 12345678
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
mybatis:
  mapper-locations: classpath:mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true
server:
  port: 8080
```
* 参考[链接](https://www.jb51.net/program/2849430jp.htm)，SpringBoot 从 2.6 开始默认不允许出现 Bean 循环引用。而且这个是在Bean 定义上也就是类上就不允许出现循环引用。
* 其中还提到，绕过SpringBoot这个拦截的方法还有比如使用`@Lazy`注解进行延迟初始化。在查阅其他参考链接时确实有注意到过这种写法。
* 尝试在TestServiceImpl中给TestMapper加上`@Lazy`
```java
@Service
public class TestServiceImpl implements TestService {
    @Lazy // new
    @Autowired
    private TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }
}
```
* 报错变为
```
java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
...

2024-05-02T23:59:30.453+08:00  WARN 5764 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataSource' defined in class path resource [org/springframework/boot/autoconfigure/jdbc/DataSourceConfiguration$Generic.class]: Failed to instantiate [javax.sql.DataSource]: Factory method 'dataSource' threw exception with message: Cannot load driver class: com.mysql.cj.jdbc.Driver
2024-05-02T23:59:30.456+08:00  INFO 5764 --- [           main] o.apache.catalina.core.StandardService   : Stopping service [Tomcat]
2024-05-02T23:59:30.510+08:00  INFO 5764 --- [           main] .s.b.a.l.ConditionEvaluationReportLogger : 

Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
2024-05-02T23:59:30.522+08:00 ERROR 5764 --- [           main] o.s.boot.SpringApplication               : Application run failed

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataSource' defined in class path resource [org/springframework/boot/autoconfigure/jdbc/DataSourceConfiguration$Generic.class]: Failed to instantiate [javax.sql.DataSource]: Factory method 'dataSource' threw exception with message: Cannot load driver class: com.mysql.cj.jdbc.Driver
...

Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [javax.sql.DataSource]: Factory method 'dataSource' threw exception with message: Cannot load driver class: com.mysql.cj.jdbc.Driver
...

Caused by: java.lang.IllegalStateException: Cannot load driver class: com.mysql.cj.jdbc.Driver
...
```
* 似乎与`_04_SpringBoot/src/main/resources/config/application.yml`中的`driver-class-name: com.mysql.cj.jdbc.Driver`配置项有关，想到**可能又是版本问题**导致的
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```
* 于是先参考`https://repo.maven.apache.org/maven2/mysql/mysql-connector-java/`将`mysql-connector-java`设为了尽可能新的稳定版本`@8.0.33`(因为`spring-boot-starter-parent@3.2.5`的发布时间为Apr 18, 2024，也是很新了)
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
    <scope>runtime</scope>
</dependency>
```
* 然而显示警告
```
[WARNING] The artifact mysql:mysql-connector-java:jar:8.0.33 has been relocated to com.mysql:mysql-connector-j:jar:8.0.33
```
* 这个警告信息表示尝试使用的Maven依赖mysql:mysql-connector-java:jar:8.0.33已经被迁移到新的坐标com.mysql:mysql-connector-j:jar:8.0.33。这意味着应该更新你的pom.xml文件来反映这个变化。
* 此时我没有直接去修改写法，反正只是写法问题警告，先搞出来再说；然后又想到去看网上其他人`spring-boot-starter-parent@3.2.5`的相关依赖配置版本，参考[链接](https://www.jb51.net/program/3203078xj.htm)
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <!--<version>2.2.2</version>-->
    <version>3.0.3</version>
</dependency>
<!--<dependency>-->
<!--    <groupId>mysql</groupId>-->
<!--    <artifactId>mysql-connector-java</artifactId>-->
<!--    <version>8.0.33</version> &lt;!&ndash;new&ndash;&gt;-->
<!--    <scope>runtime</scope>-->
<!--</dependency>-->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```
* 随后顺利解决，但循环依赖那里我是用的`@Lazy`规避过去了，总感觉还是差点意思，先暂时搁置，之后熟练了再尝试重构代码避免循环依赖

### 【已解决】Java Maven新建子项目pom中parent找不到父项目
* 参考[链接](https://blog.csdn.net/weixin_41040035/article/details/134690965)，注意默认创建时`GroupId`为`org.example`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504002731.png)
需要改为和子项目相同的`GroupId`(此处应为`com.example`)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504002915.png)

### 【已解决】SpringMaven 远程仓库配置使用 使用Lifecycle功能时报错 `Could not find artifact com.example:_05_SpringMaven:pom:1.0-SNAPSHOT and 'parent.relativePath' points at wrong local POM`
```
[INFO] Scanning for projects...
[ERROR] [ERROR] Some problems were encountered while processing the POMs:
[FATAL] Non-resolvable parent POM for org.example:_03_SpringMVC:1.0-SNAPSHOT: Could not find artifact com.example:_05_SpringMaven:pom:1.0-SNAPSHOT and 'parent.relativePath' points at wrong local POM @ line 18, column 13
 @ 
[ERROR] The build could not read 1 project -> [Help 1]
[ERROR]   
[ERROR]   The project org.example:_03_SpringMVC:1.0-SNAPSHOT (G:\NiHon-IT-Training-Plan\Spring\_03_SpringMVC\pom.xml) has 1 error
[ERROR]     Non-resolvable parent POM for org.example:_03_SpringMVC:1.0-SNAPSHOT: Could not find artifact com.example:_05_SpringMaven:pom:1.0-SNAPSHOT and 'parent.relativePath' points at wrong local POM @ line 18, column 13 -> [Help 2]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/ProjectBuildingException
[ERROR] [Help 2] http://cwiki.apache.org/confluence/display/MAVEN/UnresolvableModelException
```
* 首先回看课件，发现忘记在`Repositories/maven-public`中将`testrepo`从`available`加入到`Members`列表
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240504163501.png)
* 报错依然存在，由于报错中提到了`parent.relativePath`，因此参考[链接](https://blog.csdn.net/u012433915/article/details/115367189)，在`Spring/_03_SpringMVC/pom.xml`中进行补充
```xml
<parent>
    <artifactId>_05_SpringMaven</artifactId>
    <groupId>com.example</groupId>
    <version>1.0-SNAPSHOT</version>
    <relativePath>../_05_SpringMaven/pom.xml</relativePath> <!--new-->
</parent>
```
* 问题得到部分解决，可以正常执行`Lifecycle-clean`操作了，但在执行`Lifecycle-deploy`后依然报错，单开一个问题在下一部分

### 【已解决】SpringMaven 远程仓库配置使用 使用`Lifecycle-deploy`功能时报错 `Cannot access defaults field of Properties`
```
_05_SpringMaven [deploy] (1 error, 1 warning)
  org.example:_03_SpringMVC:war:1.0-SNAPSHOT (1 error, 1 warning)
    war (1 error, 1 warning)
      dependencies (1 warning)
        Error injecting: org.apache.maven.plugin.war.WarMojo (warning)
      Cannot access defaults field of Properties (error)
```
* 再次尝试`Lifecycle-clean`与`Lifecycle-deploy`，报错减少为
```
_05_SpringMaven [deploy] (1 error)
  org.example:_03_SpringMVC:war:1.0-SNAPSHOT (1 error)
    war (1 error)
      Cannot access defaults field of Properties (error)
```
* 经测试，使用`Lifecycle-package`等功能时也是同样问题
* 参考[链接](https://blog.csdn.net/m0_47256162/article/details/136162990)和`Breadcrumbszerostart/java/Spring/MVC/SpringMVCcode/springmvcdemo/pom.xml`示例代码，发现本地`pom.xml`缺失了`maven-war-plugin`相关依赖
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.3.1</version>
        </plugin>
    </plugins>
</build>
```
* 在`Spring/_03_SpringMVC/pom.xml`中添加上述代码后报错没变，又选择了最新版本`@3.4.1`，添加下述代码
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.4.1</version>
        </plugin>
    </plugins>
</build>
```
报错变为
```
[INFO] _03_SpringMVC ...................................... FAILURE [  0.030 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.573 s
[INFO] Finished at: 2024-05-04T17:17:15+08:00
[INFO] ------------------------------------------------------------------------
[ERROR] Plugin org.apache.maven.plugins:maven-war-plugin:3.4.1 or one of its dependencies could not be resolved: org.apache.maven.plugins:maven-war-plugin:jar:3.4.1 was not found in http://localhost:8081/repository/maven-public/ during a previous attempt. This failure was cached in the local repository and resolution is not reattempted until the update interval of maven-public has elapsed or updates are forced -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/PluginResolutionException
```
* 又重新尝试一开始的示例代码中提到的`@3.3.1`版本
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.3.1</version>
        </plugin>
    </plugins>
</build>
```
* 成功运行`Lifecycle-deploy`
* 注意，每次运行`_05_SpringMaven-Lifecycle-deploy`前需要先`_05_SpringMaven-Lifecycle-clean`清除掉先前生成出的残缺的`Spring/_03_SpringMVC/target`文件夹