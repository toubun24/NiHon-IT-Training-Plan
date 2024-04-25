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

* **2023.04.23 火曜日:** 
  * Spring-多配置文件 21:50-22:45

* **2023.04.24 水曜日:** 
  * Spring-注解方式DI 14:40-15:00
  * Spring-AOP介绍 15:00-15:14
  * Spring-AOP切入点表达式 15:14-15:22
  * Spring-AOP快速入门XML方式 21:40-22:20 
  * Spring-AOP快速入门注解方式 
  * Spring-AspectJ注解介绍 
  * Spring-数据库集成 
  * Spring-事务快速入门 
  * Spring-事务介绍 

* **2023.04.25 木曜日:** 
  * Spring-AOP快速入门XML方式 15:35-15:58
  * Spring-AOP快速入门注解方式 15:58-16:30 16:35-17:10 18:00-18:10
  * Spring-AspectJ注解介绍 
  * Spring-数据库集成 
  * Spring-事务快速入门 
  * Spring-事务介绍 

* **2023.04.26 金曜日:** 


* **2023.04.27 土曜日:** 


* **2023.04.28 日曜日:** 


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