# Week 19 Report

## 学习内容及时长

* **2023.04.22 月曜日:** 3h19min
  * Java-对象流1 15:20-15:39
  * Java-对象流2 15:39-15:55 18:00-18:07
  * Java-对象流3 18:07-18:14
  * Java-对象流4 18:14-18:25
  * Java-Socket1 19:27-19:36
  * Java-Socket2 19:36-19:50
  * Spring-相关概念 20:02-20:12
  * Spring-第一个项目 20:12-20:35 21:00-21:55
  * Spring-IoC介绍 22:30-22:38 22:44-23:05
  * Spring-XML配置文件DI 23:55-00:04

* **2023.04.23 火曜日:** 55min
  * Spring-多配置文件 21:50-22:45

* **2023.04.24 水曜日:** 1h22min
  * Spring-注解方式DI 14:40-15:00
  * Spring-AOP介绍 15:00-15:14
  * Spring-AOP切入点表达式 15:14-15:22
  * Spring-AOP快速入门XML方式 21:40-22:20 

* **2023.04.25 木曜日:** 5h10min
  * Spring-AOP快速入门XML方式 15:35-15:58
  * Spring-AOP快速入门注解方式 15:58-16:30 16:35-17:10 18:00-18:10
  * Spring-AspectJ注解介绍 19:15-19:50
  * Spring-数据库集成 19:50-20:00 20:55-21:05 21:30-23:15
  * Spring-事务快速入门 23:45-00:16
  * Spring-事务介绍 00:16-00:35

* **2023.04.26 金曜日:** 2h45min
  * SpringMVC-介绍 15:55-16:25
  * SpringMVC-第一个项目 18:30-18:40 18:45-19:20 21:25-21:40 22:15-22:45 23:40-23:50
  * SpringMVC-基本注解 23:50-00:10
  * SpringMVC-路径匹配 01:00-01:15

* **2023.04.28 日曜日:** 15min
  * 整理报告 01:45-02:00

## 学习笔记

### SpringMVC-第一个项目
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240426234843.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240426234915.png)

### SpringMVC-基本注解
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240427000905.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240427001012.png)

### SpringMVC-路径匹配
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240427010638.png)

## 内容拓展

### JoinPoint获取的信息
* 方法签名：你可以通过JoinPoint.getSignature()方法获取到当前正在执行的方法的签名。
* 方法参数：通过JoinPoint.getArgs()方法，你可以获取到当前方法执行的参数列表。
* 目标对象：JoinPoint.getTarget()方法会返回被通知方法所在的对象实例。
* 代理对象：JoinPoint.getThis()方法返回的是代理对象本身。
* 静态部分：JoinPoint.getStaticPart()方法返回与JoinPoint关联的静态部分，它包含关于连接点的信息，但不包含运行时的信息。






## 遇见问题

### 【已解决】Spring 引用类型属性自动注入 `Error creating bean with name 'user1' defined in class path resource [application.xml]: Error setting property values`
```
WARNING: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user1' defined in class path resource [application.xml]: Error setting property values

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user1' defined in class path resource [application.xml]: Error setting property values
```
```java
public class User {
    public void getUser(){
        System.out.println("getUser");
    }
    private String name;
    private int age;
    private Pet pet;
    // setter();
}
```
```xml
<bean id="user1" class="User.User">
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
</bean>
```
* 解决方案：User 类定义了三个私有字段：name、age 和 pet，但是没有提供对应的setter方法。在Spring框架中，如果你使用XML配置文件来配置bean，Spring需要调用bean的setter方法来注入属性值。要解决这个问题，你需要在User类中为name和age字段提供公共的setter方法。对于Pet字段，同样需要一个setter方法，并且你需要确保Pet类是可用的，且Spring知道如何创建它的实例（可能也需要一个对应的bean定义）。然后，在Spring的XML配置文件中，你需要确保Pet类的bean也被定义，如果Pet类也需要通过Spring来管理的话。
```java
public class User {
    public void getUser(){
        System.out.println("getUser");
    }
    private String name;
    private int age;
    private Pet pet;
    // setter();
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void setPet(Pet pet) {
        this.pet = pet;
    }
}
```
```xml
<bean id="pet" class="User.Pet"/>
<bean id="user1" class="User.User">
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
</bean>
```
* 随后是第二项报错
```
WARNING: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user2' defined in class path resource [application.xml]: Could not resolve matching constructor on bean class [User.User] (hint: specify index/type/name arguments for simple parameters to avoid type ambiguities)

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user2' defined in class path resource [application.xml]: Could not resolve matching constructor on bean class [User.User] (hint: specify index/type/name arguments for simple parameters to avoid type ambiguities)
```
```xml
<bean id="pet" class="User.Pet"/>
<bean id="user2" class="User.User">
    <constructor-arg name="name" value="张三"></constructor-arg>
    <constructor-arg name="age" value="18"></constructor-arg>
    <constructor-arg name="pet" ref="pet"></constructor-arg>
</bean>
```
* 如果想使用setter注入属性，应该在XML配置中使用<property>元素而不是<constructor-arg>；而如果想使用有参构造注入，需要在User类中定义一个带有相应参数的构造函数。
```
WARNING: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user' defined in class path resource [application.xml]: Instantiation of bean failed

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'user' defined in class path resource [application.xml]: Instantiation of bean failed
```
```
WARNING: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'user5' defined in class path resource [application.xml]: Unsatisfied dependency expressed through bean property 'pet'

org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'user5' defined in class path resource [application.xml]: Unsatisfied dependency expressed through bean property 'pet'
```
```java
package User;

public class User {
//    public void getUser(){
//        System.out.println("getUser");
//    }

    private String name;
    private int age;
    private Pet pet;

    // setter(); // set注入
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void setPet(Pet pet) {
        this.pet = pet;
    }

    // 有参构造注入
    public User(String name, int age, Pet pet) {
        this.name = name;
        this.age = age;
        this.pet = pet;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", pet=" + pet +
                '}';
    }

    public void getUser(){
        System.out.println(name);
        System.out.println(age);
        System.out.println(pet);
    }
}
```
```xml
<bean class="User.User" id="user"/>

<!--spring调用setName(),若该方法，没有则会报错，spring创建对象赋值时，不考虑是否存在该属性，而是寻找该‘name’的set方法-->
<bean id="user1" class="User.User">
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
</bean>

<!--使用name属性-->
<bean id="pet" class="User.Pet"/>
<bean id="user2" class="User.User">
    <constructor-arg name="name" value="张三"></constructor-arg>
    <constructor-arg name="age" value="18"></constructor-arg>
    <constructor-arg name="pet" ref="pet"></constructor-arg>
</bean>

<!--使用索引属性-->
<bean id="pet2" class="User.Pet"/>
<bean id="user3" class="User.User">
    <constructor-arg index="0" value="张三"></constructor-arg>
    <constructor-arg index="1" value="18"></constructor-arg>
    <constructor-arg index="2" ref="pet2"></constructor-arg>
</bean>

<!--byName注入-->
<bean id="pet3" class="User.Pet"/>
<bean id="user4" class="User.User" autowire="byName">
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
</bean>

<!--byType注入-->
<bean id="pet4" class="User.Pet"/>
<bean id="user5" class="User.User" autowire="byType">
    <property name="name" value="张三"></property>
    <property name="age" value="18"></property>
    <property name="pet" ref="pet4"/>
</bean>
```

### 【已解决】Spring "AOP快速入门XML方式"test2示例代码运行报错`org.junit.platform.commons.JUnitException: TestEngine with ID 'junit-jupiter' failed to discover tests`
```
org.junit.platform.commons.JUnitException: TestEngine with ID 'junit-jupiter' failed to discover tests
```
调整修改xml文件中版本号等内容后
```
org.springframework.beans.factory.xml.XmlBeanDefinitionStoreException: Line 48 in XML document from class path resource [application.xml] is invalid

	at org.springframework.beans.factory.xml.XmlBeanDefinitionReader.doLoadBeanDefinitions(XmlBeanDefinitionReader.java:402)
	...
Caused by: org.xml.sax.SAXParseException; lineNumber: 48; columnNumber: 43; cvc-complex-type.2.4.c: The matching wildcard is strict, but no declaration can be found for element 'aop:config'.
	at java.xml/com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.createSAXParseException(ErrorHandlerWrapper.java:204)
    ...
	... 84 more
```
* 解决方案：
原来是xml文件头部的引用没写全,使用aop后应该有如下增添
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
">
```
补充为
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       https://www.springframework.org/schema/aop/spring-aop.xsd
">
```

### 【已解决】Spring "AOP快速入门注解方式"test3示例代码运行报错`java.lang.NoClassDefFoundError: org/springframework/core/NestedIOException`
```
java.lang.NoClassDefFoundError: org/springframework/core/NestedIOException
    ...
    at test.test3(test.java:73)
    ...
Caused by: java.lang.ClassNotFoundException: org.springframework.core.NestedIOException
	...
	... 78 more
```
```java
/*AOP注解方式*/
    @Test
    public void test3(){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class); // (test.java:73)
        UserService userService = applicationContext.getBean(UserService.class);
        userService.getUser();
    }
```
* 解决方案：先前因为报错
```
Dependency maven:org.springframework:spring-core:5.3.23 is vulnerable, safe version 6.1.2 CVE-2024-22233 7.5 Uncontrolled Resource Consumption vulnerability with High severity found   Results powered by Checkmarx(c)
```
所以修改了xml中的spring版本号（只修改了报错的部分）
```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.23</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
    <version>5.3.23</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
<!--            <version>5.3.23</version>-->
<!--            <version>6.1.2</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
```
在遇到新报错后通过[java.lang.ClassNotFoundException: org.springframework.core.NestedIOException 错误](https://blog.csdn.net/Yao220/article/details/128783819)得知在spring-core 5.3.x版本已经废弃了NestedIOException这个类，因为使用6.0版本的，所以是找不到这个类。原因就是mybatis-spring的版本太老了，换成最新版的就解决了。
所以把所有原为@5.3.23的spring版本均统一改为推荐的@6.1.3
```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
<!--            <version>5.3.23</version>-->
<!--            <version>6.1.2</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
    <scope>compile</scope>
</dependency>
```
至此得以正常实现

### Spring "数据库集成"xml依赖警告信息`Uncontrolled Resource Consumption vulnerability with High severity found  Results powered by Checkmarx(c)`
```
Provides transitive vulnerable dependency maven:com.google.protobuf:protobuf-java:3.19.4 CVE-2022-3509 7.5 Uncontrolled Resource Consumption vulnerability with High severity found CVE-2022-3510 7.5 Uncontrolled Resource Consumption vulnerability with High severity found CVE-2022-3171 7.5 Uncontrolled Resource Consumption vulnerability with High severity found  Results powered by Checkmarx(c)
```
```xml
<!--mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
</dependency>
```

### 【已解决】Spring "数据库集成"运行报错`Invalid value type for attribute 'factoryBeanObjectType': java.lang.String`
```
org.springframework.context.support.AbstractApplicationContext refresh
WARNING: Exception encountered during context initialization - cancelling refresh attempt: java.lang.IllegalArgumentException: Invalid value type for attribute 'factoryBeanObjectType': java.lang.String

java.lang.IllegalArgumentException: Invalid value type for attribute 'factoryBeanObjectType': java.lang.String

    ...
    at test.test4(test.java:14)
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
```
对应的位置为
```java
public class test {
    @Test
    public void test4(){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class); // 报错位置1
        UserService userService = applicationContext.getBean(UserService.class); // 调整版本号后的报错位置2
        System.out.println(userService.getAll());
    }
}
```
* 尝试更新部分xml依赖版本号
```xml
<!--spring事务相关-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
</dependency>
<!--spring jdbc-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
<!--            <version>5.3.23</version>-->
    <version>6.1.3</version>
</dependency>
<!--mybatis依赖-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.11</version>
</dependency>
<!--mybatis和spring集成依赖-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
<!--            <version>2.0.7</version>-->
    <version>3.0.3</version>
</dependency>
```
* 报错信息发生变化
```
org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.lalapodo.Service.UserService' available

    ...
    at test.test4(test.java:15)
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
```
* 给UserServiceImpl补上`@Service`后得到期望输出（但反复确认过课件视频，这一段是没写`@Service`的）
```java
package com.lalapodo.Service.Impl;

import com.lalapodo.Bean.TestTable;
import com.lalapodo.Mapper.TestMapper;
import com.lalapodo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // new

import java.util.List;

@Service // new
public class UserServiceImpl implements UserService {

    @Autowired
    TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }
}
```

### 【课件示例】Spring "事务快速入门"运行报错`org.apache.ibatis.binding.BindingException: Parameter 'name' not found.`
```
com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
INFO: {dataSource-1} inited

Caused by: org.apache.ibatis.binding.BindingException: Parameter 'name' not found. Available parameters are [arg1, arg0, param1, param2]
```
* 解决方案：UserServiceImpl中添加`@Param`
```java
    @Override
    // public void insertUser(String name, String age) {
    public void insertUser(@Param("name") String name, @Param("age") String age) {
        testMapper.insertUser(name,age);
        testMapper.insertUser2(name,age);
    }

    @Override
    // public void insertUser2(String name, String age) {
    public void insertUser2(@Param("name") String name, @Param("age") String age) {
        // no
    }
```

### 【仅警告，暂不影响使用】SpringMVC xml依赖spring-webmvc版本`Vulnerability with High severity found`
```
Provides transitive vulnerable dependency maven:org.springframework:spring-web:6.1.3 CVE-2024-22243 8.1 Vulnerability with High severity found CVE-2024-22259 8.1 Vulnerability with High severity found  Results powered by Checkmarx(c) 
```
```xml
<!-- SpringMVC -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
<!--    <version>5.3.23</version>-->
    <version>6.1.3</version>
</dependency>
```

### 【已解决】IDEA搭建项目找不到Tomcat
* 问题说明：IDEA中右上角`Edit Configuratoins...-Add New Configuratoins`没有`Tomcat`相关可选配置
* 问题解决：参考https://www.jb51.net/server/291538mpa.htm，通过`Smart Tomcat`插件实现相应功能，但具体配置界面依然和课件中呈现内容不同，例如没有`部署-在服务器启动时部署-工件`。
* 此处贴一个`Smart Tomcat`的配置情况以供之后参考
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240426224547.png)

### 【已解决】SpringMVC第一个项目运行报错`java: cannot access jakarta.servlet.ServletException class file for jakarta.servlet.ServletException not found`
```
java: cannot access jakarta.servlet.ServletException
class file for jakarta.servlet.ServletException not found
```
* 参考https://blog.csdn.net/m0_46504802/article/details/130838846去xml中添加了语句
```xml
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-api</artifactId>
    <version>10.1.23</version>
</dependency>
```
随后报错变为
```
SEVERE [main] org.apache.catalina.util.LifecycleBase.handleSubClassException Failed to initialize component [Connector["http-nio-8080"]]
org.apache.catalina.LifecycleException: Protocol handler initialization failed
Caused by: java.net.BindException: Address already in use: bind
SEVERE [main] org.apache.catalina.core.StandardServer.await Failed to create server shutdown socket on address [localhost] and port [8005] (base port [8005] and offset [0])
java.net.BindException: Address already in use: bind
```
似乎是占用问题，一试果然是因为后台通过`apache-tomcat-10.1.23\bin\startup.bat`启动了tomcat已经。关掉之后再次运行，页面成功返回期望值