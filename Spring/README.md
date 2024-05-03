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

## Spring事务

### Spring 集成 Mybatis
* 操作流程
  * 引入 Mybatis与数据库相关依赖
  * 创建配置类
  * Config.java
  * SqlConfig.java
  * MybatisConfig.java
  * 创建实体类:映射数据库表
  * 创建Mapper
  * Service实现即可

### Spring事务
* 数据库事务是访问并可能操作各种数据项的一个数据库操作序列，这些操作要么全部执行,要么全部不执行，是一个不可分割的工作单位。
* 事务由事务开始与事务结束之间执行的全部数据库操作组成。

#### Spring事务优点:
* 以事务的方式对数据库进行访问，有如下的优点:
  * 把逻辑相关的操作分成了一个组
  * 在数据永久改变前，可以预览数据变化
  * 能够保证数据的读一致性。

#### Spring的事务:
* Spring支持两种事务方式:
  * 分别是编程式事务和声明式事务，后者最常见
  * 声明式事务通常情况下只需一个@Transactional注解
* 声明式事务: 声明式事务将事务管理代码从业务方法中抽离了出来，以声明式的方式来实现事务管理。
* 编程式事务: 编程式事务，必须在每个业务操作中包含额外的事务管理代码，就导致代码看起来非常的臃肿。

#### Spring的事务配置:
* 操作流程
  * 在需要开启事务的方法上加上@Transactional注解
  * Config.java
  * SqlConfig.java

#### 事务的传播行为属性:
* 事务的传播行为可以由传播属性指定，Spring定义了7种类型的传播行为。其中最常用的是REQUIRED和REQUIRES_NEW。
* 事务的传播行为可以在@Transactional注解的propagation属性中定义。
```java
PROPAGATION_REQUIRED -- 默认行为。支持当前事务，如果当前没有事务，就新建一个事务。
PROPAGATION_REQUIRES_NEW -- 新建事务，如果当前存在事务，把当前事务挂起。
PROPAGATION_SUPPORTS -- 支持当前事务，如果当前没有事务，就以非事务方式执行。
PROPAGATION_NOT_SUPPORTED -- 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
PROPAGATION_MANDATORY -- 支持当前事务，如果当前没有事务，就抛出异常。
PROPAGATION_NEVER -- 以非事务方式执行，如果当前存在事务，则抛出异常。
PROPAGATION_NESTED -- 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。
```
#### 事务的隔离级别:
* 事务的隔离级别可以通过隔离级别事务属性(isolation)指定。
```java
DEFAULT -- 数据库默认的事务隔离级别。
READ_UNCOMMITTED -- 这是事务最低的隔离级别，它允许另外一个事务可以看到这个事务未提交的数据。这种隔离级别会产生脏读，不可重复读和幻像读。
READ_COMMITTED -- 保证一个事务修改的数据提交后才能被另外一个事务读取，另外一个事务不能读取该事务未提交的数据。这种事务隔离级别可以避免脏读出现，但是可能会出现不可重复读和幻像读。
REPEATABLE_READ -- 这种事务隔离级别可以防止脏读、不可重复读，但是可能出现幻像读。它除了保证一个事务不能读取另一个事务未提交的数据外，还保证了不可重复读。
SERIALIZABLE -- 这是花费最高代价但是最可靠的事务隔离级别，事务被处理为顺序执行。除了防止脏读、不可重复读外，还避免了幻像读
```
#### 事务的属性:
* 事务的属性可以在**@Transactional注解**中定义。
* 参数名称: 功能描述
  * readOnly: 该属性用于设置当前事务是否为只读事务，设置为true表示只读，false则表示可读写，默认值为false
  * rollbackFor: 该属性用于设置需要进行回滚的异常类数组，当方法中抛出指定异常数组中的异常时，则进行事务回滚
  * rollbackForClassName: 该属性用于设置需要进行回滚的异常类名称数组
  * noRollbackFor: 该属性用于设置不需要进行回滚的异常类数组，当方法中抛出指定异常数组中的异常时，不进行事务回滚
  * noRollbackForClassName: 该属性用于设置不需要进行回滚的异常类名称数组
  * isolation: 该属性用于设置事务隔离级别
  * propagation: 该属性用于设置事务的传播行为
  * timeout: 该属性用于设置事务的超时秒数，默认值为-1表示永不超时

#### @Transactional注意:
* Spring官方建议在具体的类（或类的方法）上使用 @Transactional 注解，而不要使用在类所要实现的任何接口上。
  * 你当然可以在接口上使用 @Transactional 注解，但是这将只能当你设置了基于接口的代理时它才生效。
* @Transactional 注解可以被应用于接口定义和接口方法、类定义和类的 public 方法上。
* @Transactional 只能被应用到 public 方法上, 对于其它非public的方法,如果使用了@Transactional也不会报错,但方法没有事务功能。

# SpringMVC

## SpringMVC介绍

### MVC模式
* MVC模式（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。
* MVC模式最早在1978年提出。MVC模式的目的是实现一种动态的程序设计，使后续对程序的修改和扩展简化，并且使程序某一部分的重复利用成为可能。

### 组件的互动
* 模型（Model） 用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法。
  * “ Model ”有对数据直接访问的权力，例如对数据库的访问。
  * “ Model ”不依赖“ View ”和“ Controller ”，也就是说， Model 不关心它会被如何显示或是如何被操作。
* 视图（View）能够实现数据有目的的显示。
* 控制器（Controller）起到不同层面间的组织作用，用于控制应用程序的流程。它处理事件并作出响应。

### SpringMVC
* Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web Flow里面。
* Spring 框架提供了构建 Web 应用程序的全功能 MVC 模块。
* 使用 Spring 可插入的 MVC 架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的Spring MVC框架。

### SpringMVC 优点
* 基于 MVC 架构，功能分工明确，解耦合。
* SpringMVC能够使用 Spring 的 IoC 和 Aop，整合其他框架方便。
* SpringMVC使用方便，使用@Controller 就能创建处理器对象,@Service 就能创建业务对象。

### 第一个SpringMVC项目
* Maven坐标导入SpringMVC依赖与设置tomcat服务器
* 创建SpringMVC配置文件
* 初始化Servlet容器
* 返回中文信息乱码解决
* 创建Controller
* 最后请求进行测试

## SpringMVC请求

### 前面使用注解介绍

#### @RequestMapping
* @RequestMapping:将请求和处理请求的控制器方法进行关联起来，建立映射关系。
* SpringMVC接收到指定的请求，找到在映射关系中对应的控制器方法来处理这个请求。
* 位置:SpringMVC控制器类或方法定义上方
* 属性:
  * value默认属性：必须设置，为一个字符串类型的数组，表示该请求映射能够匹配的请求地址
  * method属性：非必须，为一个请求方法类型数组，表示该请求映射能够匹配的请求方式
  * 拥有派生注解：
    * get请求-→@GetMapping
    * post请求-→@PostMapping
    * put请求-→@PutMapping
    * delete请求-→@DeleteMapping
    * …​
  * params属性：非必须，为一个字符串类型的数组，可以通过表达式设置请求参数和请求映射的匹配关系
  * headers属性：非必须，为一个字符串类型的数组，可以通过表达式设置请求头信息和请求映射的匹配关系

#### @ResponseBody
* @ResponseBody：将Controller方法的返回结果通过适当的转换器转换为指定的格式后，直接写入HTTP响应正文中通常用来返回JSON/XML数据。
* 位置:SpringMVC控制器类或方法定义上方

#### @Controller
* @Controller：标注此注解后的组件会被Spring识别为可以接受并处理网页请求的组件。
* @Controller注解继承了Spring的@Component注解，会把对应的类声明为Spring对应的Bean，并且可以被Web组件管理。

### SpringMVC中的路径匹配
* Spring支持两种路径匹配方式。
  * PathPattern：Spring 5 引入。使用预解析的方法匹配路径。专门为Web路径匹配而设计，可以支持复杂的表达式，执行效率很高。
  * AntPathMatcher：Sping在2013年引入。Spring中用于类路径、文件系统和其它资源的解决方案，效率比较低。
* PathPattern可以向下兼容AntPathMatcher的逻辑
```
?:表示任意的单个字符
*:表示任意的0个或多个字符
**:表示任意的一层或多层目录
{xxx}:路径占位符,使用@PathVariable注解可以此获取参数变量
```
* PathPattern配置开启
```java
@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setPatternParser(new PathPatternParser());
    }
}
```
* PathPattern特性
```
可以支持{*path}:同时可以匹配到多级路径
PathPattern 只支持结尾部分使用 **，不同于AntPathMatcher
```
### SpringMVC中的路径冲突
如当一次请求匹配到多个路径，那么就需要选出最接近的路径。
通常会使用@RequestMapping注解，根据不同功能模块修改其映射路径解决此问题。

### SpringMVC获取请求参数
* **(原始)通过ServletAPI获取**，将HttpServletRequest作为控制器方法的形参，此时HttpServletRequest类型的参数表示封装了当前请求的请求报文对象
```
request.getParameter("xxx");
```
* **方法形参获取**，多个值逗号分开即可
```java
@RequestMapping("/hello")
@ResponseBody
public String hello(String name,String password){
    System.out.println(name);
    System.out.println(password);
    return "hello world";
}
```
* **通过POJO获取**
  * 如果参数较多，那么接收参数的时候就较为复杂，这个时候可以使用POJO获取参数。
  * 需要注意请求参数key的名称要和POJO中属性的名称一致。
```java
@RequestMapping("/hello")
@ResponseBody
public String hello(User user){
    System.out.println(user);
    return "hello world";
}
```
* @RequestParam
  * 当请求参数与方法形参对应不上，可使用@RequestParam注解解决
  * 位置放在方法形参定义前面
  * 属性:
    * required：是否为必传参数
    * defaultValue：参数默认值
### SpringMVC JSON数据处理
* 可借助其他JSON依赖帮助处理JSON数据，例如jackson等等
* 操作流程，导入jackson包
```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.4.2</version>
</dependency>
```
* 配置类上添加@EnableWebMvc注解
* 方法形参前添加@RequestBody即可
* @RequestBody(常用注解):将外部传递的json数据映射到形参的集合或对象中

## SpringMVC响应

### SpringMVC响应
* SpringMVC接收到请求后，需要进行一些操作进行处理请求，将结果进行响应操作。

#### 响应文本数据
* 需要添加@ResponseBody注解，将文本数据进行响应。

#### 响应JSON数据
* SpringMVC还可以响应实体类(集合)对象。
* 需要添加依赖@ResponseBody注解和@EnableWebMvc注解。
* 此时控制器方法返回值为实体类类型时，即可响应JSON数据。

### RESTful API
* 传统风格API
  * http://localhost/user/getUser 查询所有用户信息
  * http://localhost/user/insertUser 添加用户信息
  * http://localhost/user/updateUser 更新用户信息
  * http://localhost/user/deleteUser 删除用户信息
* SpringMVC还支持RESTful风格API
  * http://localhost/user GET请求方式查询所有用户信息
  * http://localhost/user POST请求方式添加用户信息
  * http://localhost/user/{userId} PUT请求方式更新用户信息
  * http://localhost/user/{userId} DELETE请求方式删除用户信息
* 优点
  * 统一接口，GET/POST/PUT/DELETE进行CRUD操作。
  * 面向资源，一目了然。
  * 数据描述简单，一般以JSON做数据交换…​。
* 缺点
  * 对于查询参数过多的接口，会导致URL的长度过长、造成请求失败。
  * 应按照实际需求制作相应的接口。
* RESTful快速入门
  * @RestController=@Controller+@ResponseBody

## SpringMVC拦截器

### 拦截器
* SpringMVC的控制器拦截器,用于对控制器进行预处理和后处理。
* 依赖于Web框架，在实现上基于Java的反射机制，属于面向切面编程（AOP）的一种运用。
* 一个拦截器实例在一个控制器生命周期之内可以多次调用。
* 类似于Servlet中的过滤器Filter。

### 拦截器和过滤器区别
* 过滤器
  * 过滤器属于Servlet技术
  * 过滤器主要对所有请求过滤
  * 过滤器的执行时机早于拦截器
* 拦截器
  * 拦截器属于SpringMVC技术，必须要有SpringMVC环境才可以使用
  * 拦截器通常对控制器Controller进行拦截
  * 拦截器只能拦截dispatcherServlet处理的请求

### 拦截器应用场景
* 进行权限检查，登录检测等等。
* 只要是多个Controller中的处理方法都需要的逻辑，可以抽离出使用拦截器实现。

### 拦截器配置
* 创建拦截器类
* preHandler方法，返回true放行，执行原始方法，返回false则拦截。
  * request参数:请求对象
  * response参数:响应对象
  * handler参数:被调用的控制器方法对象
* 重写WebMvcConfigurer中的addInterceptors进行拦截器注册
* 如有静态资源重写WebMvcConfigurer中的addResourceHandlers放行静态资源

# SpringBoot

## SpringBoot介绍

### SpringBoot
* Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。
* 该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。
* 通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域成为领导者。

### SpringBoot特点
* SpringBoot所具备的特征有：
  * 可以创建独立的Spring应用程序，并且基于其Maven或Gradle插件，可以创建可执行的JARs和WARs；
  * 内嵌Tomcat或Jetty等Servlet容器；
  * 提供自动配置的“starter”项目对象模型（POMS）以简化Maven配置；
  * 尽可能自动配置Spring容器；
  * 提供准备好的特性，如指标、健康检查和外部化配置；
  * 不需要XML配置等等。

### 第一个SpringBoot项目
* 创建新项目，选择Spring Initializr，配置项目相关信息
* 选择当前项目需要使用的技术依赖项
* 创建Controller
* 运行SpringApplication即可启动项目用于测试。
* 除此之外还可以使用package打包命令打包后使用java -jar直接运行程序。

## SpringBoot配置

### Springboot结构中的pom.xml文件
* parent:继承的项目中定义了若干个依赖坐标版本，减少依赖冲突。
* 即只需提供groupId与artifactId，version由SpringBoot提供。
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId> <!---->
    <version>3.2.5</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```
* starter:定义了当前项目使用的相关依赖坐标，减少配置依赖的操作。
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### Springboot中的配置文件
* SpringBoot中的配置文件分别是三种类型,优先级从上至下，越上面的优先级越高。
  * application.properties
  * application.yml
  * application.yaml
  * 注意:如有config目录，则config目录下的配置文件优先级高于类路径下的配置文件。
* SpringBoot开发中配置文件建议使用yml格式，因为其层次分明，且支持对象数组等定义。
  * 但需注意yml语法大小写敏感，同层级左侧对齐等等语法要求。

#### Springboot中的配置文件如何读取？
* 使用@Value注解从配置文件中读取数据,例如:@Value("${属性名.属性名}")
* 使用环境对象Environment,默认获取application配置文件的内容
  * 使用@PropertySource可以读取自定义配置文件到 Spring 的 Environment 中。
  * 和@Value搭配使用，可以将自定义配置文件中的属性变量值注入到当前类使用了@Value注解的成员变量中。
  * 注意@PropertySource默认情况下不会加载yaml/yml文件,默认加载的是.xml或者 .properties文件。
  * 如需要加载.yml文件，就需要继承DefaultPropertySourceFactory类并修改。
  * @PropertySource(value = "classpath:test.yml",factory = YamlConfig.class)
* 使用实体类对象进行属性映射
  * 在实体类上标注@ConfigurationProperties注解进行配置文件加载。
  * 并且此实体类需要注册到IoC容器。
  * 如遇未配置 Spring Boot 配置注解处理器警告，在pom中添加如下依赖即可。
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```
#### Springboot配置文件中的多环境
* 开发环境、测试环境、生产环境都有不同的环境，例如各种日志级别，数据库连接…​。
* 因此配置文件中的多环境也非常有必要。
* yml配置文件中可以直接使用---来区分不同的配置
```yml
# yml
spring:
  profiles:
    active: pro
---
# 开发环境
spring:
  config:
    activate:
      on-profile: dev
server:
  port: 8080
---
# 生产环境
spring:
  config:
    activate:
      on-profile: pro
server:
  port: 80
```
* properties配置文件可以直接使用不同名称的多配置文件来区分不同的配置
  * application-dev.properties 开发环境配置文件。
  * application-pro.properties 生产环境配置文件。
* 注意:SpringBoot只会默认加载名为application.properties的配置文件
* 所以需要在application.properties配置文件中设置使用哪个配置文件
```
spring.profiles.active=pro
```

#### Springboot命令行启动
* 命令行启动提供的配置参数优先级最高，即使配置文件中已经定义了相关参数。
* 主要方便在对应用程序打包后需要临时改变相关参数的情况，而无需修改代码或配置文件再重新打包运行。
```
java -jar lalapodo.jar --server.port=8080 --spring.profiles.active=pro
```
* 在Docker容器运行时也方便临时修改参数。
```
FROM amazoncorretto:17.0.5
ADD lalapodo.jar lalapodo.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "lalapodo.jar", "--server.port=8080", "--spring.profiles.active=pro"]
```

## SpringBoot集成Quartz

### Quartz
Quartz是OpenSymphony开源组织在Job scheduling领域的开源项目，它可以与J2EE与J2SE应用程序相结合也可以单独使用。

Quartz可以用来创建简单或为运行十个，百个，甚至是好几万个Jobs这样复杂的程序。

Jobs可以做成标准的Java组件或 EJBs。

### Quartz相关API
  * Scheduler：Quartz 中的任务调度器，通过 Trigger 和 JobDetail 可以用来调度、暂停和删除任务。
  * 调度器就相当于一个容器，装载着任务和触发器，该类是一个接口，代表一个 Quartz 的独立运行容器。
  * Trigger：Quartz 中的触发器，是一个类，描述触发 Job 执行的时间触发规则，主要有 SimpleTrigger 和 CronTrigger 这两个子类。
    * 仅需调度一次或者以固定时间间隔周期执行调度，SimpleTrigger 是最适合的选择。
    * 而 CronTrigger 可以通过 Cron 表达式定义出各种复杂时间规则的调度方案。
  * Job：Quartz 中具体的任务，包含了执行任务的具体方法。
  * JobDetail：Quartz 中需要执行的任务详情，包括了任务的唯一标识和具体要执行的任务，可以通过 JobDataMap 往任务中传递数据。
  * JobBuilder：用于定义/构建 JobDetail 实例，用于定义作业的实例。
  * TriggerBuilder：用于定义/构建触发器实例。

### SpringBoot集成Quartz
1. 引入Quartz依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```
2. 定义Job类
  * 其中JobExecutionContext包含各种上下文信息的句柄。
  * 可以通过它获取Job运行时的环境以及属性信息。
  * 而JobDataMap实现了Map接口，用法同Map类似，它可以装载任何可序列化的数据对象。
  * 执行Job时JobDataMap可用来传递数据，JobDataMap存在于JobExecutionContext中，通过JobExecutionContext来获取。
3. 创建Quartz配置类定义任务

## SpringBootTask

### SpringBoot Task
* Spring Task 是 Spring 自主研发的轻量级定时任务工具，相比于 Quartz 更加简单方便，且不需要引入其他依赖即可使用。
* Spring Task 缺点在于不支持持久化，并且默认是所有定时任务都在一个线程中执行，不配置线程池可能会出现线程阻塞、卡死等！

### SpringBoot Task使用
1. 启动类加上@EnableScheduling注解开启Spring Task
2. 定义定时任务交由Ioc容器

### SpringBoot Task配置
```java
@Configuration
public class SpringTaskConfig implements SchedulingConfigurer {
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        //设置线程池大小 默认为1
        threadPoolTaskScheduler.setPoolSize(10);
        //设置线程名称前缀
        threadPoolTaskScheduler.setThreadNamePrefix("aaa-");
        //设置线程池关闭时是否等待任务完成
        threadPoolTaskScheduler.setWaitForTasksToCompleteOnShutdown(true);
        //设置线程池关闭前最大等待时间
        threadPoolTaskScheduler.setAwaitTerminationSeconds(60);
        //初始化
        threadPoolTaskScheduler.initialize();
        taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }
}
```

## SpringBoot集成MyBatis

### MyBatis简介
* MyBatis是一个基于Java的持久层框架，它使用对象关系映射实现了对结果集的封装。
* 对象关系映射:把数据库表和实体类及实体类的属性对应起来，让开发者操作实体类就实现操作数据库表。
* 它封装了JDBC操作的很多细节，使开发者只需要关注SQL语句本身，而无需关注注册驱动，创建连接等烦杂过程。

### SpringBoot集成MyBatis
1. 引入MyBatis相关依赖
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.14</version>
</dependency>
```
2. 配置文件中配置数据库相关信息
3. 定义数据库表实体类
4. 定义Mapper接口
5. 定义Service接口及实现类
6. 类路径mapper目录下定义SQL映射文件
7. 定义控制器类
8. 发送请求进行测试即可

# SpringMaven

## Maven介绍

### Maven
* Maven这个单词来自于犹太语，意为知识的积累。
* Maven 翻译为"专家"、"内行"，是 Apache 下的一个纯 Java 开发的开源项目。
* 基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。
* Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。
* Maven 也可被用于构建和管理各种项目，例如 C#，Ruby，Scala 和其他语言编写的项目。
* Maven 曾是 Jakarta 项目的子项目，现为由 Apache 软件基金会主持的独立 Apache 项目。

### Maven优点
* 快速构建工程，管理jar包，编译代码，运行单元测试，打包，生成报表，部署项目等等。

### Maven仓库
* Maven中，仓库是一个位置。
* Maven仓库是项目中依赖的第三方库，这个库所在的位置叫做仓库。
* Maven中，任何一个依赖、插件或者项目构建的输出，都可以称之为构件。
* Maven仓库能帮助我们管理构件（主要是JAR），它就是放置所有JAR文件（WAR，ZIP，POM等等）的地方。
* Maven 仓库有三种类型：
  * 本地（local）:用来存储从远程仓库或中央仓库下载的插件和jar包，项目使用一些插件或jar包，优先从本地仓库查找。
  * 中央（central）:Maven中内置的一个远程仓库地址http://repo1.maven.org/maven2，它是中央仓库，由Maven社区维护，其中包含了大量常用的库。
  * 远程（remote）:如果Maven在中央仓库中也找不到依赖的文件，它会停止构建过程并输出错误信息到控制台。为避免这种情况，Maven 提供了远程仓库的概念，它是开发人员自己定制仓库，包含了所需要的代码库或者其他工程中用到的 jar 文件。

### Maven项目目录结构
* src/main/java —— java 代码文件
* src/main/resources —— 项目资源文件
* src/test/java —— 单元测试java 代码文件
* src/test/resources —— 测试资源文件
* target —— 项目输出位置，编译后的 class 文件会输出到此目录
* pom.xml —— maven 项目核心配置文件

### Maven常用命令
* clean：清理命令，删除 target 目录及内容
* compile：编译命令，将 src/main/java 下的文件编译为 class 文件输出到 target 目录下
* test：测试命令，将执行 src/test/java 下的单元测试类
* package：打包命令
* install：安装命令，将项目打包后发布到本地仓库

## Maven POM

### POM
* POM是 Maven 工程的基本工作单元，是一个XML文件，包含了项目的基本信息，用于描述项目如何构建，声明项目依赖，等等。
* 执行任务或目标时，Maven 会在当前目录中查找 POM。它读取 POM，获取所需的配置信息，然后执行目标。
* 所有 POM 文件都需要 project 元素和三个必需字段：groupId，artifactId，version。
  * project 工程的根标签。
  * modelVersion 模型版本需要设置为 4.0。
  * groupId 这是工程组的标识。它在一个组织或者项目中通常是唯一的。
  * artifactId 这是工程的标识。它通常是工程的名称。
  * version 这是工程的版本号。在 artifact 的仓库中，它用来区分不同的版本。

### POM依赖范围
```
依赖范围      编译          测试          运行时       打入jar包
compile        Y            Y             Y             Y
test           -            Y             -             -
provided       Y            Y             -             -
runtime        -            Y             Y             Y
system         Y            Y             -             Y
```
* compile：编译范围，指 A 在编译时依赖 B，此范围为默认依赖范围。
* test：test范围只有在测试编译和测试运行阶段可用。
* provided：provided依赖只有在当JDK或者一个容器已提供该依赖之后才使用，provided依赖在编译和测试时需要，在运行时不需要。
* runtime：runtime依赖在运行和测试的时候需要，但在编译的时候不需要。
* system：system范围依赖与provided类似，但是必须显示的提供一个对于本地系统中jar文件的路径。一般不推荐使用。

## Maven 依赖管理

### Maven依赖管理
* Maven一个核心的特性就是依赖管理。
* 当我们处理多模块的项目（包含成百上千个模块或者子项目），模块间的依赖关系就变得非常复杂，管理也变得很困难。
* 针对此种情形，Maven 提供了一种高度控制的方法。

### 可传递性依赖发现
* 一种相当常见的情况，比如说 A 依赖于其他库 B。如果，另外一个项目 C 想要使用 A ，那么 C 项目也需要使用库 B。
* Maven 通过读取项目文件（pom.xml），找出它们项目之间的依赖关系。
* 我们需要做的只是在每个项目的 pom 中定义好直接的依赖关系。其他的事情 Maven 会帮我们搞定。
* 通过可传递性的依赖，所有被包含的库的图形会快速的增长。
* 当有重复库时，可能出现的重复的情形将会持续上升。

#### 依赖排除
* 任何可传递的依赖都可以通过 "exclusion" 元素被排除在外。

#### 依赖可选
* 任何可传递的依赖可以被标记为可选的，通过使用 "optional" 元素。


### 依赖管理
* 通常情况下，在一个共通的项目下，有一系列的项目。
* 在这种情况下，我们可以创建一个公共依赖的 pom 文件，该 pom 包含所有的公共的依赖关系，我们称其为其他子项目 pom 的 pom 父。
* 此 pom 父是一个不具有业务功能的空工程。能解决批量模块同步构建的问题。
* 操作步骤
1. 创建一个空的maven项目
2. 将项目打包方式改为pom(重要)
3. 添加所要管理的项目到此pom.xml文件中
```xml
<modules>
    <module>xxx</module>
</modules>
```
4. 使用此 pom 父统一管理项目即可
5. 此 pom 父会按照项目与项目之间的依赖关系来自动决定执行的顺序和配置的顺序无关。
6. 除此之外，还可以把子项目(模块)共同使用的jar包都抽离出来，维护在 pom 父中，方便管理。
7. pom 父
```xml
<properties>
    <spring.version>5.3.23</spring.version>
</properties>
<dependencies>
    <!--依赖-->
    <dependency>
          <!-- 项目名称 -->
          <groupId>xxx</groupId>
          <!-- 模块名称 -->
          <artifactId>xxx</artifactId>
          <!-- 版本 -->
          <version>${spring.version}</version>
      </dependency>
</dependencies>
```
8. 子项目(模块)继承 pom 父即可
```xml
<parent>
    <artifactId>parent_demo</artifactId>
    <groupId>com.lalapodo</groupId>
    <version>1.0</version>
</parent>
```
9. pom 父也能够配置可选依赖
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>xxx</groupId>
            <artifactId>xxx</artifactId>
            <version>xxx</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```