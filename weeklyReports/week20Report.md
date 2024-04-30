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
  * SpringBoot-配置文件
  * SpringBoot-配置文件读取
  * SpringBoot-配置文件多环境 
  * SpringBoot-命令行启动配置 
  * SpringBoot-集成Quartz概念 
  * SpringBoot-集成Quartz操作
  * SpringBoot-Task使用 
  * SpringBoot-集成MyBatis 
  * SpringBoot-CRUD练习 

* **2023.05.01 水曜日:** 

* **2023.05.02 木曜日:** 

* **2023.05.03 金曜日:** 

* **2023.05.04 土曜日:** 

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
























## 内容拓展










































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

### 【已解决】IDEA社区版新建项目没有Spring Initializr
参考[链接](https://blog.csdn.net/xiangkouyizhimao/article/details/134959972)的[方法二](https://blog.csdn.net/weixin_45014413/article/details/129726113)(方法一的Spring Boot Helper插件现在要收费否则`no license`无法使用)，在`https://start.spring.io/`进行配置后下载
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240501013034.png)
但安装依赖的过程