# Week 2 Report

## 学习内容及时长

### LalaPodo

* 2023.12.10 月曜日
  * EL&JSTL: 23:25-00:50
  * AJAX: 21:00-21:40
  * Axios: 
  * Promise: 

* React详解
  * React搭建与代码使用: 
  * React介绍: 
  * React组件: 
  * React组件生命周期A: 
  * React组件生命周期B: 
  * React-diffing算法: 
  * React脚手架介绍: 
  * React脚手架ToDoList案例A: 
  * React脚手架ToDoList案例B: 
  * React脚手架配置代理: 
  * React_Github案例: 

### 软件工程师常用日本语

P1 - P4

## 学习笔记

### LalaPodo

1. JSP
  * 格式: `<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 …​ %>`
  * 分类
    * page：配置JSP页面
      > `contentType`: 等同于`response.setContentType()`，设置响应体的mime类型以及字符集；设置当前jsp页面的编码 \
      > `import`：导包 \
      > `errorPage`：当前页面发生异常后，会自动跳转到指定的错误页面 \
      > `isErrorPage`：标识当前页面是否是错误页面
    * `include`: 页面包含的。导入页面的资源文件，如`<%@include file="....jsp"%>`
    * `taglib`: 导入资源，如`<%@ taglib prefix="c" uri="http://....com/jsp/jstl/core" %>`
  * 注释
    * `<!-- — >`: html注释，只能注释html代码片段
    * `<%-- --%>`: jsp注释，可以注释所有
  * 内置对象(在jsp页面中不需要创建，直接使用的对象)
    > 变量名 | 真实类型 | 作用 \
    > pageContext | PageContext | 当前页面共享数据，还可以获取其他八个内置对象 \
    > request | HttpServletRequest | 一次请求访问的多个资源(转发) \
    > session | HttpSession | 一次会话的多个请求间 \
    > application | ServletContext | 所有用户间共享数据 \
    > response | HttpServletResponse | 响应对象 \
    > page | Object | 当前页面(Servlet)的对象  this \
    > out | JspWriter | 输出对象，数据输出到页面上 \
    > config | ServletConfig | Servlet的配置对象 \
    > exception | Throwable | 异常对象

2. MVC开发模式
  * **M(Model):** 模型，JavaBean，完成具体的业务操作，如：查询数据库，封装对象
  * **V(View):** 视图，JSP，展示数据
  * **C(Controller):** 控制器，Servlet，获取用户的输入，调用模型，将数据交给视图进行展示

3. EL表达式(Expression Language)
* 语法：`${表达式}`
* jsp默认支持el表达式的，如果要忽略el表达式
  * 设置jsp中page指令中：`isELIgnored="true"`忽略当前jsp页面中所有的el表达式
  * `\${表达式}`: 忽略当前这个el表达式
* 空运算符: `${empty list}`, `${not empty str}`
* 获取值
  > `${域名称.键名}`: 从指定域中获取指定键的值 \
  > `${键名}`: 表示依次从最小的域中查找是否有该键对应的值，直到找到为止 \
  > `${域名称.键名.属性名}`: 获取对象的值 \
  > `${域名称.键名[索引]}`: 获取List集合 \
  > `${域名称.键名.key名称}`或`${域名称.键名["key名称"]}`: 获取Map集合
* 隐式对象
  > `${pageContext.request.contextPath}`：动态获取虚拟目录

4. JSTL(Java Server Pages Standarded Tag Library, JSP标准标签库)
* 使用步骤
  > 导入jstl相关jar包
  > 引入标签库：taglib指令 `<%@ taglib %>`
  > 使用标签
* 常用标签
  > `if`: `if` (`c:if`标签没有else情况，想要else情况，则可以在定义一个`c:if`标签) \
  > `choose`: `switch` \
  > `when`: `case` \
  > `otherwise`: `default` \
  > `foreach`: `for`

5. 三层架构：软件设计架构
* 界面层(表示层)：用户看的得界面，用户可以通过界面上的组件和服务器进行交互
* 业务逻辑层：处理业务逻辑的
* 数据访问层：操作数据存储文件

6. AJAX
* ASynchronous JavaScript And XML: 异步的JavaScript和XML
https://github.com/warrenlucky/zerostart/blob/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/AJAX%26JSON.adoc

7. JSON
* JavaScript Object Notation: JavaScript对象表示法
https://github.com/warrenlucky/zerostart/blob/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/AJAX%26JSON.adoc




## 内容拓展

1. JSP文件运行原理
* 客户端→(请求页面)→JSP文件→(转换)→Servlet文件→(编译)→class文件→(执行)→Servlet实例→(返回响应)→客户端

2. web资源分类
* 静态web技术：HTML+CSS+JavaScript
* 动态web技术：servlet, jsp, php, .net, ruby, python等

3. XML: Extensible Markup Language，可扩展标记语言
* 声明：如`<?xml version="1.0" encoding="utf-8"?>`





## 遇见问题

* .jsp文件运行：想测试[GitHub/zerostart/.../EL&JSTL](https://github.com/warrenlucky/zerostart/tree/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/code/EL%26JSTL)里存放的示例文件，但似乎需要配置服务器环境才能运行，比如Tomcat；先暂放一下，看后续课件有无用到

* 从JSTL开始到AJAX，都有点晕，具体某条代码什么的跟着视频走好像也就那回事，但不知道这些代码是在什么情况下使用、整体的框架是什么样子的，后面好像还有Axios和Promise作为React的前置知识，按我个人的学习习惯，打算先把这一系列前置内容快速过一遍，不去追求完全搞懂先，然后到了正式的React如果发现有需要弥补的，或者后续哪项内容又开始用到前面这一系列知识时，首先框架和用法就能清晰许多，其次再去回看具体的知识点应该就行

## 下周计划
