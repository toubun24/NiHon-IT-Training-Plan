# Spring框架

## Spring介绍

### Spring框架介绍
* Spring 是于 2003年6月 兴起的一个轻量级的 Java 开发框架，它是为了解决企业应用开发的复杂性而创建的。Spring 的核心是**控制反转（IoC）**和**面向切面编程（AOP）**。
* Spring 是可以在 Java SE/EE 中使用的轻量级开源框架。
* Spring 的主要作用就是为代码“解耦”，降低代码间的耦合度。就是让对象和对象（模块和模块）之间关系不是使用代码关联，而是通过配置来说明。即在 Spring 中说明对象（模块）的关系。
* Spring 根据代码的功能特点，使用 IoC 降低业务对象之间耦合度。
* IoC 使得主业务在相互调用过程中，不用再自己维护关系了，即不用再自己创建要使用的对象了。
* 而是把创建对象的权利交给框架，也就是指将对象的创建、对象的存储、对象的管理交给了Spring容器。
* Spring容器是Spring中的一个核心模块，用于管理对象，底层可以理解为是一个Map集合。
* 而 AOP 使得系统级服务得到了最大复用，将那些与业务无关，却为业务模块所共同调用的逻辑或责任分开封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可操作性和可维护性。

### Spring优点？
* 它是一个容器管理对象，容器是装东西的，Spring 容器不装文本，数字。装的是对象。Spring 是存储对象的容器。
1. 轻量
  Spring 核心功能的所需的 jar 总共在 3M 左右。Spring 框架运行占用的资源少，运行效率高。不依赖其他 jar
2. 针对接口编程，解耦合
  Spring 提供了 Ioc 控制反转，由容器管理对象，对象的依赖关系。原来在程序代码中的对象创建方式，现在由容器完成。对象之间的依赖解耦合。
3. AOP 编程的支持
  通过 Spring 提供的 AOP 功能，方便进行面向切面的编程，许多不容易用传统 OOP （面向对象程序设计）实现的功能可以通过 AOP 轻松应付
  在 Spring 中，开发人员可以从繁杂的事务管理代码中解脱出来，通过声明式方式灵活地进行事务的管理，提高开发效率和质量。
4. 方便集成各种优秀框架
  Spring 不排斥各种优秀的开源框架，相反 Spring 可以降低各种框架的使用难度，Spring提供了对各种优秀框架（如 Struts,Hibernate、MyBatis）等的直接支持。简化框架的使用。
  Spring 像插线板一样，其他框架是插头，可以容易的组合到一起。需要使用哪个框架，就把这个插头放入插线板。不需要可以轻易的移除。

### Spring模块介绍
* Spring Context: 定义上下文信息即IOC容器
* Spring Beans: Bean工厂与Bean装配
* Spring Context Support: 对Spring IoC的拓展支持
* Spring Expression: SpEL 表达式语言
* Spring Context indexer: Spring 类管理组件扫描和ClassPath扫描

### Spring总结
* Spring 主要学习两个核心部分：IoC 和AOP
* IoC：控制反转，把创建对象过程交给 Spring 进行管理
* AOP：面向切面，不修改源代码进行功能增强

## IoC控制反转

### IoC控制反转
* 控制反转（IoC，Inversion of Control），是一个概念，是一种思想。
* 指将传统上由程序代码直接操控的对象调用权交给容器，通过容器来实现对象的装配和管理。
* 控制反转就是对对象控制权的转移，从程序代码本身反转到了外部容器。通过容器实现对象的创建，属性赋值，依赖的管理。
* 当前比较流行的实现方式是依赖注入。
* 依赖：classA 类中含有 classB 的实例，在 classA 中调用 classB 的方法完成功能，即 classA对 classB 有依赖。
* IoC 的实现：
  * 依赖注入：DI(Dependency Injection)，程序代码不做定位查询，这些工作由容器自行完成。
  * 依赖注入 DI 是指程序运行过程中，若需要调用另一个对象协助时，无须在代码中创建被调用者，而是依赖于外部容器，由外部容器创建后传递给程序。
  * Spring 的依赖注入对调用者与被调用者几乎没有任何要求，完全支持对象之间依赖关系的管理。
* Spring 框架使用依赖注入（DI）实现 IoC。
* Spring 容器是一个超级大工厂，负责创建、管理所有的 Java 对象，这些 Java 对象被称为 Bean（单例）。
* Spring 容器管理着容器中 Bean 之间的依赖关系，Spring 使用“依赖注入”的方式来管理 Bean 之间的依赖关系。
* 使用 IoC 实现对象之间的解耦和。

### IOC底层
* IOC 思想基于 IOC 容器完成。 IOC 容器底层就是对象工厂，Spring提供的IOC容器实现的两种方式（两个接口）
  * BeanFactory接口：IOC容器基本实现是Spring内部接口的使用接口，不提供给开发人员进行使用（加载配置文件时候不会创建对象，在获取对象时才会创建对象。
  * ApplicationContext接口：BeanFactory接口的子接口，提供更多更强大的功能，提供给开发人员使用（加载配置文件时候就会把在配置文件对象进行创建）推荐使用！
* ApplicationContext通常的实现
  * FileSystemXmlApplicationContext ：此容器从一个XML文件中加载beans的定义，XML Bean配置文件的全路径名必须提供给它的构造函数。
  * ClassPathXmlApplicationContext：此容器也从一个XML文件中加载beans的定义，这里，你需要正确设置classpath因为这个容器将在classpath里找bean配置。
* IOC的优点
  * IOC 或 依赖注入把应用的代码量降到最低。最小的代价和最小的侵入性使松散耦合得以实现。
  * IOC 容器支持加载服务时的饿汉式初始化和懒加载。

## 基于XML的DI

### 注入分类
* bean 实例在调用无参构造器创建对象后，就要对 bean 对象的属性进行初始化。初始化是由IoC容器自动完成的，称为注入。
* 根据注入方式的不同，常用的有两类：Set 注入、构造注入

#### Set 注入
* Set 注入也叫设值注入，通过 setter 方法传入被调用者的实例。
* 简单类型（Java中的基本数据类型和String类型）
* 引用类型
  * 当指定 bean 的某属性值为另一 bean 的实例时，通过 ref 指定它们间的引用关系。ref的值必须为某 bean 的 id 值
  * 使用<bean>标签声明XXX对象
  * 在User对象的声明中使用<bean>标签的ref属性
#### 有参构造注入
* 构造注入是指，在构造调用者实例的同时，完成被调用者的实例化。即使用构造器设置依赖关系。
在构造方法中给属性赋值构造注入使用<constructor-arg>标签
* <constructor-arg>表示构造方法一个参数。
* < constructor-arg>标签属性:
  * name:表示构造方法的形参名
  * index:表示构造方法的参数的位置,参数从左往右位置是0, 1 ,2的顺序
  * value:构造方法的形参类型是简单类型的，使用value
  * ref:构造方法的形参类型是引用类型的,使用ref

### 引用类型属性自动注入
* 对于引用类型属性的注入，也可不在配置文件中显示的注入。
* 可以通过为<bean/>标签设置 autowire 属性值，为引用类型属性进行隐式自动注入（默认是不自动注入引用类型属性）。
* 根据自动注入判断标准的不同，可以分为两种：
  * byName：根据名称自动注入
  * byType：根据类型自动注入
* byName
根据被注入属性的名称作为 Bean 名称作为依赖查找，并将对象设置到该属性
* byType
根据被注入属性的类型作为依赖类型进行依赖查找，并将该对象设置到该属性

### 多配置文件
* 多配置文件优点
  * 多配置文件的大小比在一个文件中配置大小要小。
  * 避免多人竞争带来的冲突。
* 多配置文件分配方式：
  * 按功能模块，一个模块一个配置文件
  * 按类的功能，数据库相关的配置一个配置文件， 做事务的功能一个配置文件…​
* 包含关系的配置文件：
  * 主配置文件:包含其他配置文件的配置文件，一般是不定义对象。
  * 语法:`<import resource=“其他配置文件的路径"/>`
  * 关键字:"classpath":类路径
  * 在spring的配置文件中要指定其他文件的位置，需要使用classpath,告诉spring到哪去读取配置文件。

## DI(注解方式)

### DI(注解方式)
* 需要在 Spring 配置文件中配置组件扫描器，用于在指定的包中扫描相关注解。
* 组件扫描(component-scan) ,组件就是java对象。
* base-package:在指定的包中的相关注解。
* component-scan工作方式: Spring会扫描base-package指定的包，找到包中和子包中的所有类的注解。按照注解的功能创建对象，或进行属性赋值。
```xml
<context:component-scan base-package="User"/>
```
指定多个包
```xml
<context: component-scan base-package="User"/>
<context :component-scan base-package="User1"/>
<!--分隔符(;或,)可以分隔多个包名-->
<context: component-scan base-package="User;User1"/>
<!--或使用顶级的父包-->
<context : component-scan base-package="xxx"/>
```

### @Component
* @Component:等同于<bean>
  * 属性:value就是对象的名称，也就是bean的id值，value的值是唯一的。
  * 不指定对象名称,由Spring提供默认名称:类名的首字母小写
  * 位置:写在类的上面
```xml
@Component(value = "user")
          ||
<bean id="user" class="xxx"/>
```
```java
@Component(value ="user")
public class User {}
```
* 另外，Spring 还提供了 3 个创建对象的注解：
  * `@Controller` 用于对 Controller 进行注解
  * `@Repository` 用于对 DAO 进行注解
  * `@Service` 用于对 Service 进行注解
* 这三个注解与@Component 都可以创建对象，但这三个注解有些区别
* @Repository，@Service，@Controller 是对@Component 注解的细化，标注不同层的对象。

### @Value
* @Value:简单类型的属性赋值
  * 属性:value是String类型的，表示简单类型的属性值。
  * 位置:推荐写在属性定义的上面。
```java
@Component
public class User {
    @Value(value = "张三")
    private String name;
    @Value(value ="18")
    private Integer age;}
```

### @Autowired
* @Autowired: Spring框架提供的注解，实现引用类型赋值。默认使用的是byType注入。
  * Spring中通过注解给引用类型赋值，使用的是自动注入原理，支持byName，byType
  * 位置:推荐写在属性定义的上面。
```java
  @Component
  public class User {
      @Autowired
      private Xxx xxx;
```

### @Autowired与@Qualifier
* @Autowired byName方式:
  * 属性上面加入@Qualifier(value="xxx"):表示使用指定名称的bean完成赋值。
  * 属性上面加入@Autowired
```java
  @Component
  public class User {
      @Qualifier("xxx")
      @Autowired
      private Xxx xxx;
```

### @Resource
* @Resource:来自JDK中的注解，支持byName，byType。默认为byName。
  * 位置:推荐写在属性定义的上面。
  * 注意:默认为byName:先使用byName自动注入，如果byName注入失败，再使用byType
```java
@Component
public class User {
    @Resource
    private Xxx xxx;
```
  * 如只使用byName方式,需要增加一个name属性
```java
  @Component
  public class User {
      @Resource(name="xxx")
      private Xxx xxx;
```

### 注解对比XML
* 注解方式：
  * 优点：方便、直观、高效（代码少，没有配置文件的书写那么复杂）。
  * 缺点：以硬编码的方式写入到 Java 代码中。
* XML 方式：
  * 优点：配置和代码是分离的。
  * 缺点：编写麻烦，效率低。

## AOP 面向切面编程

### AOP（Aspect Orient Programming）面向切面编程
* 术语：
  * Aspect:切面，表示增强的功能，就是一堆代码，完成某个一个功能。常见的切面功能有日志管理/权限控制等等。
  * JoinPoint:连接点，连接业务方法和切面的位置。就某类中的业务方法
  * Advice:通知，通知表示切面在特定连接点采取的操作。
  * Pointcut:切入点，指多个连接点方法的集合。

### AOP实现
* AOP的技术实现框架:
  * Spring AOP：Spring在内部实现了AOP规范。但开发中很少使用Spring的AOP规范，因其较为笨重。
  * AspectJ: 开源的AOP框架。Spring框架中集成了AspectJ框架，通过Spring就能使用AspectJ的功能。
* AspectJ框架实现AOP有两种方式:
  * 使用xml的配置文件：配置全局事务
  * 使用注解：AspectJ有5个注解
```
@Before前置通知
@AfterReturning后置通知
@Around环绕通知
@AfterThrowing异常通知
@After最终通知
```

### 切入点表达式
* AspectJ支持三种通配符：
  * `*` 匹配任意字符，只匹配一个元素
  * `..` 匹配任意字符，可以匹配多个元素，在表示类时，必须和 * 联合使用
  * `+` 表示按照类型匹配指定类的所有类，必须跟在类名后面，如com.User.User+,表示继承该类的所有子类包括本身
* 表达式的原型:
  * execution(<访问修饰符><方法返回值><包名称.类.方法(参数)><异常>)
  * execution代表方法的执行
  * 访问修饰符和异常可以省略
  * 例如表达式execution(* User.User.*(..))
    * 意思User类中的所有方法。
    * 第一个“*”代表任意访问修饰符及任意方法返回值。
    * 第二个“*”代表任意方法。
    * “..”匹配任意数量、任意类型的参数。
  * 目标类、接口与该切面类在同一个包中可以省略包名。
```
表达式    execution(public * User.*(..))
含义      User类中的所有公有方法

表达式   execution(* User.User.*.*(..)) 
含义     匹配 User.User 包下的所有类的所有方法
```
  * 在AspectJ中，切入点表达式可以通过 “&&”、“||”、“!”等操作符结合起来。
```
表达式    execution (* *.get(int,..)) || execution(* *.insert(int,..))
含义      匹配任意类中第一个参数为int类型的get方法或insert方法

表达式    !execution (* *.get(int,..))
含义      匹配任意类中第一个参数不是为int类型的get方法
```

### AOP 快速入门
* 操作流程
  * 引入 AOP 相关依赖
    * AspectJ 依赖
```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.9.1</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.9.1</version>
</dependency>
```
  * 创建目标类:接口和实现类。要做的是给类中的方法增加功能
  * 创建切面类:普通类
    * 在类上面加上@Aspect
    * 注意:如使用注解方式的话需要加上@Component
    * 在类中定义方法，方法就是切面要执行的功能代码在方法的上面加入Aspect中的相关注解，例如@Before注解，但需要指定切入点表达式execution()
  * Spring的配置文件(推荐使用注解)
    * 声明目标对象(可以使用注解)
    * 声明切面类对象(可以使用注解)
    * 声明Aspect框架中的自动代理生成器标签:<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
  * 创建测试类，从IoC容器中获取目标对象(实际就是代理对象)进行测试即可。

### AspectJ 注解

#### @Pointcut:切入点
* 属性:value切入点表达式。
* 位置:放在方法上面
* 注意:使用@Pointcut定义在一个方法的上面，这个方法的名称就是切入点表达式的别名。
```java
@Pointcut("execution(* com.lalapodo.Service.UserService.*(..))")
private void pointcut(){}
```

#### @Before:前置通知
* 属性:value切入点表达式。
* 位置:放在方法上面
* 注意:在目标方法之前先执行,不改变目标方法执行结果,不影响目标方法的执行。
* 参数:可以有JoinPoint参数
```java
@Aspect
@Component
public class UserAop {
    @Before(value="execution(* com.lalapodo.Service.UserService.*(..))")//定位业务方法
    public void insertUser(JoinPoint joinPoint){
        System.out.println(joinPoint);
        System.out.println("插入了一个User");
    }
}
@Service
public class UserServiceImpl implements UserService {
    @Override
    public void getUser() {
        System.out.println("get了User");
    }
}
```

#### @AfterReturning:后置通知
* 属性:value切入点表达式。
  * returning自定义变量，表示目标方法返回值。
* 位置:放在方法上面
* 注意:在目标方法之后执行,能够获取到目标方法的返回值，可以根据这个返回值做不同的处理功能。
```java
@AfterReturning(value = "pointcut()",returning = "res")
public void insertUser(Object res) {
    System.out.println(res);
    System.out.println("插入了一个User");
}
```

#### @Around:环绕通知
* 属性:value切入点表达式。
* 位置:放在方法上面
* 注意:在目标方法的前后都能执行,会影响最后的调用结果。
* 参数:可以有ProceedingJoinPoint。
  * 作用:执行目标方法
```java
@Around("pointcut()")
public void insertUser(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    proceedingJoinPoint.proceed();
    System.out.println("插入了一个User");
}
```

#### @AfterThrowing:异常通知
* 属性:value切入点表达式。
  * throwing自定义变量，表示目标方法抛出的异常对象。
* 位置:放在方法上面
* 注意:在目标方法抛出异常时执行,用于监控目标方法执行时是不是有异常。
```java
@AfterThrowing(value = "pointcut()",throwing = "exception")
public void insertUser(Exception exception) {
    System.out.println(exception);
    System.out.println("插入了一个User");
}
```

#### @After:最终通知
* 属性:value切入点表达式。
* 位置:放在方法上面
* 注意:总是会执行,顺序为在目标方法之后执行
```java
@After("pointcut()")
public void insertUser() {
    System.out.println("插入了一个User");
}
```



















