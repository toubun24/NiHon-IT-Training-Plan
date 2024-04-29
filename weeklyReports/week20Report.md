# Week 20 Report

## 学习内容及时长

* **2023.04.29 月曜日:** 
  * SpringMVC-获取请求参数 18:10-
  * SpringMVC-JSON数据处理 
  * SpringMVC-数据响应 
  * SpringMVC-RESTful快速入门 
  * SpringMVC-拦截器 
  * SpringBoot-介绍
  * SpringBoot-第一个项目 
  * SpringBoot-配置文件
  * SpringBoot-配置文件读取
  * SpringBoot-配置文件多环境 
  * SpringBoot-命令行启动配置 
  * SpringBoot-集成Quartz概念 
  * SpringBoot-集成Quartz操作
  * SpringBoot-Task使用 
  * SpringBoot-集成MyBatis 
  * SpringBoot-CRUD练习 

* **2023.04.30 火曜日:** 

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
* ![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429194758.png)
* ![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429195035.png)
* 更多细节可参考[链接](https://blog.csdn.net/weixin_63888301/article/details/134320150)，但这个链接里面乱写哼，还是参考[官方文档](https://projectlombok.org/features/Data)吧

### 请求参数与方法形参对应不上时使用@RequestParam注解
* ![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240429195448.png)


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
