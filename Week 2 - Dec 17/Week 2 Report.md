# Week 2 Report

## 学习内容及时长

* **2023.12.11 月曜日:** 4h15min (白天拍照去噜orz)
  * EL&JSTL 23:25-00:50
  * AJAX 21:00-21:40
  * Axios 21:50-22:05
  * Promise 22:05-22:40
  * React搭建与代码使用 22:40-24:00
  * *软件工程师常用日本语 P1-P4*

* **2023.12.12 火曜日:** 
  * React介绍 13:55-15:00
  * React组件 15:55-
  * React组件生命周期A 
  * React组件生命周期B 
  * React-diffing算法 
  * React脚手架介绍 
  * React脚手架ToDoList案例A 
  * React脚手架ToDoList案例B 
  * React脚手架配置代理 
  * React_Github案例 

## 学习笔记

### LalaPodo

**1. JSP**
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

**2. MVC开发模式**
  * **M(Model):** 模型，JavaBean，完成具体的业务操作，如：查询数据库，封装对象
  * **V(View):** 视图，JSP，展示数据
  * **C(Controller):** 控制器，Servlet，获取用户的输入，调用模型，将数据交给视图进行展示

**3. EL表达式(Expression Language)**
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

**4. JSTL(Java Server Pages Standarded Tag Library, JSP标准标签库)**
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

**5. 三层软件设计架构**
* 界面层(表示层)：用户看的得界面，用户可以通过界面上的组件和服务器进行交互
* 业务逻辑层：处理业务逻辑的
* 数据访问层：操作数据存储文件

**6. AJAX**
* ASynchronous JavaScript And XML: 异步的JavaScript和XML
https://github.com/warrenlucky/zerostart/blob/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/AJAX%26JSON.adoc
https://github.com/warrenlucky/zerostart/blob/main/java/React/React%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86%E8%A1%A5%E5%85%85/AJAX%E5%AE%8C%E6%95%B4.adoc

**7. JSON**
* JavaScript Object Notation: JavaScript对象表示法
https://github.com/warrenlucky/zerostart/blob/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/AJAX%26JSON.adoc
https://github.com/warrenlucky/zerostart/blob/main/java/React/React%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86%E8%A1%A5%E5%85%85/AJAX%E5%AE%8C%E6%95%B4.adoc

**8. Axios**

https://github.com/warrenlucky/zerostart/blob/main/java/React/React%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86%E8%A1%A5%E5%85%85/axios.adoc

**9. Promise**
* 状态
  * pending: 未决定的
  * resolved/fullfilled: 成功，结果为value
  * rejected: 失败，结果为reason

https://github.com/warrenlucky/zerostart/blob/main/java/React/React%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86%E8%A1%A5%E5%85%85/Promise.adoc

**10. React搭建与代码使用**
> `yarn install`: 创建node_modules \
> `yarn start`或`npm start`: 运行src案例 \
> `Ctrl+C`: 退出脚手架或服务器，刷新后无法再次进入原网页(无需看到`^C`显示，只要`path>`弹出即可) \
> `node server.js`: 开启服务器(可通过创建多个终端来运行多个服务器)

**11. React介绍**
* 用于构建用户界面的JavaScript库
* 使用：引入几个react包
  > `<script src="../js/react.development.js"></script>`: React核心库 \
  > `<script src="../js/react-dom.development.js"></script>`: 操作DOM的React扩展库 \
  > `<script src="../js/babel.min.js"></script>`: 将JSX转为JS的babel库
* JS创建虚拟DOM
  > `const VDOM=React.createElement('h1', {id:'title'}, React.createElement('span', {}, 'hello,React'))`: 创建虚拟DOM，创建嵌套格式的DOM \
  > `ReactDOM.render(VDOM, document.getElementById('test'))`: 渲染虚拟DOM到页面
* JSX创建虚拟DOM
  > `const VDOM = (<h1><span>Hello, React</span></h1>)`: 创建虚拟DOM \
  > `ReactDOM.render(VDOM, document.getElementById('test'))`: 渲染虚拟DOM到页面
* JSX语法
  * 标签中混入JS表达式的时候使用`{}`
  * 样式的类名指定不能使用class，使用className
  * 内联样式要使用`{{}}`包裹
  * 不能有多个根标签，只能有一个根标签
  * 标签必须闭合(`< >< />`)，自闭合(`< />`)也行
  * 如果小写字母开头，就将标签转化为html同名元素，如果html中无该标签对应的元素，就报错；如果是大写字母开头，React就去渲染对应的组件，如果没有定义就报错
  * 注释必须写在花括号里，如`{/*注释...*/}`
  * JSX 允许在模板中插入数组，数组自动展开全部成员

**12. React组件**
* 注意
  * 组件名必须是首字母大写
  * 虚拟DOM元素只能有一个根元素
  * 虚拟DOM元素必须有结束标签`< />`
* 渲染类组件标签的基本流程
  1. React内部会创建组件实例对象
  2. 调用render()得到虚拟DOM ,并解析为真实DOM
  3. 插入到指定的页面元素内部
* 函数式组件(只有props)
  1. `function Demo(){return <h2>用函数定义的组件</h2>}`: 先创建函数，函数可以有参数，也可以没有，但是必须要有返回值，返回一个虚拟DOM
  2. `ReactDOM.render(<Demo/>, document.getElementById('test'))`: 进行渲染
* 类式组件
  1. `class Demo2 extends React.Component {render(){console.log(this)return <h2>用类定义的组件</h2>}`
  2. `ReactDOM.render(<Demo2/>, document.getElementById('test'))`
* 组件实例三大属性
  * **state**
    * 使用的时候通过this.state调用state里的值
    * 在类式组件中定义state
    * 在构造器中初始化state
    * 在类中添加属性state来初始化
    > `this.setState(partialState, [callback])`: partialState是需要更新的状态的部分对象，callback是更新完状态后的回调函数；状态必须通过setState进行更新,且更新是一种合并，不是替换
    * 在执行 setState操作后，React 会自动调用一次`render()`
    * `render()`的执行次数是1+n(1为初始化时的自动调用，n为状态更新的次数)
  * **props**
    * 外部传入的数据在类式组件中使用
    * 通过在组件标签上传递值，在组件中就可以获取到所传递的值
    * 在构造器里的props参数里可以获取到props
    * 可以分别设置propTypes和defaultProps两个属性来分别操作props的规范和默认值，两者都是直接添加在类式组件的原型对象上的(所以需要添加static)
    * 同时可以通过`...`​运算符来简化
    > `<script src="../js/prop-types.js"></script>`: 引入库 \
    > `static propTypes`: 属性限制 \
    > `static defaultProps`: 属性默认值
    * 函数组件的props定义:
      * 在组件标签中传递props的值
      * 组件函数的参数为props
      * 对props的限制和默认值同样设置在原型对象上
  * **refs**
    * 允许我们访问DOM节点或在render方法中创建的React元素，而不需要采用DOM API来查找元素
    * 字符串形式：
    ```JavaScript
    myFunc = () => {
      const {myInput} = this
      ...}
    render(){return(<input onBlur={this.myFunc} ref="myInput" type="text"/>)}
    ```
    * 回调形式：
    ```JavaScript
    myFunc = () => {
      const {myInput} = this
      ...}
    render(){return(<input onBlur={this.myFunc} ref={c=>this.myInput=...} type="text"/>)}
    ```
    * createRef形式：
    ```JavaScript
    myRef = React.createRef() //创建ref容器
    myFunc = () => {
      ...}
    render(){return(<input onBlur={this.myFunc} ref={this.myRef} type="text"/>)}
    ```
    * 事件对象：建议不要过度的使用ref，如果发生事件的元素刚好是需要操作的元素，就可以使用事件对象(event)去替代






## 内容拓展

1. JSP文件运行原理
* 客户端→(请求页面)→JSP文件→(转换)→Servlet文件→(编译)→class文件→(执行)→Servlet实例→(返回响应)→客户端

2. web资源分类
* 静态web技术：HTML+CSS+JavaScript
* 动态web技术：servlet, jsp, php, .net, ruby, python等

3. XML: Extensible Markup Language，可扩展标记语言
* 声明：如`<?xml version="1.0" encoding="utf-8"?>`

4. 顺便一提，在课件里测试03_react配置代理-src的例子中，只需先开启服务器后打开或刷新网页即可，不需要在终端中获取root权限

5. JSX: 基于JavaScript+XML的扩展语法

6. JSX语法补充
* 内联样式要使用`{{}}`包裹；注释必须写在花括号里：外面的大括号是用来告诉JSX解析器，括号中的内容是JavaScript，而不是一个字符串；而里面的大括号用来初始化一个对象
* 不能有多个根标签，只能有一个根标签：可使用`<></>`或`<div></div>`标签将所有的内容包裹

8. [React中的样式策略](https://zhuanlan.zhihu.com/p/445762944?utm_id=0&wd=&eqid=a4fa8e4500075e1f000000046466fcc4)
* **内联样式:** 在JSX元素中，直接定义行内的样式
* **CSS样式表:** 这也是我们最常用的样式策略，使用单独的样式表，使用CSS或者SCSS等来为元素设置样式
* **CSS模块:** 一个文件，默认情况下所有类名和动画名都在本地范围
* **styled-components:** 用于React和React Native的样式组件库，它允许我们早应用中使用组件级样式，这些样式就是使用CSS-in-JS的技术来编写的
* **JSS:** CSS创作工具，它允许我们使用JavaScript以声明式、无冲突和可重复的方式来描述样式

9. key
* key帮助React识别哪些元素改变了，因此应当给数组中的每一个元素赋予一个确定的标识，使得之前的低效转换变得高效
* 设置key
  > `<li key = {xxx.id}>`: 通常使用数据中的id作为元素的key \
  > `<li key = {index}>`: 当元素没有确定id时，可以使用元素索引index作为key
* key不是全局唯一的，但兄弟节点不能用相同的key
* key会传递信息给React，但不会传递给组件；如果组件中需要使用key属性的值，则必须用其他属性名显式传递这个值，例如id
* 在`map()`方法中的元素需要设置key属性，如`data.map((item, index) => {return <li key = {index}>{item}</li>})`

10. 组件实例三大属性
* `this.props`表示那些一旦定义，就不再改变的特性，而`this.state`是会随着用户互动而产生变化的特性
* 用React开发class组件时，constructor中一定要调用`super(props)`：在JavaScript子类的构造函数中super指的是父类(即超类)的构造函数。子类中显式定义了constructor的方法中必须在其最顶层调用super，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。所以必须先调用super才可以使用this。如果子类没有定义constructor方法，这个方法会被默认添加

11. ES6: ECMAScript 6，于2015年6月正式发布的JavaScript语言的标准

12. Extends
* Class之间可以通过extends关键字实现继承
* super关键字表示父类的构造函数，用来新建父类的this对象。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

13. `bind()`
* 在JSX中传递的事件不是一个字符串，而是一个函数(如：`onClick = {this.handleClick}`)，此时onClick即是中间变量，所以处理函数中的this指向会丢失
* 解决这个问题就是给调用函数时`bind(this)`，从而使得无论事件处理函数如何传递，this指向都是当前实例化对象。或者使用箭头函数声明一个函数，这样函数内的this也是指向当前实例

14. `=>`
* 语法：`(param1, param2, …, paramN) => {statements}`
* 箭头函数是匿名函数，无法使用函数名进行递归调用
* 箭头函数没有自己的this和arguments，它们继承自父作用域
* 箭头函数不能使用new关键字调用，因为它没有自己的this对象
* 箭头函数不能使用yield关键字，因为它不是生成器函数

15: `...`: ES6的扩展运算符，用于取出参数对象的所有可遍历属性，然后拷贝到当前对象之中。

## 遇见问题

* .jsp文件运行：想测试[GitHub/zerostart/.../EL&JSTL](https://github.com/warrenlucky/zerostart/tree/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/code/EL%26JSTL)里存放的示例文件，但似乎需要配置服务器环境才能运行，比如Tomcat；先暂放一下，看后续课件有无用到

* 从JSTL开始到AJAX，都有点晕，具体某条代码什么的跟着视频走好像也就那回事，但不知道这些代码是在什么情况下使用、整体的框架是什么样子的，后面好像还有Axios和Promise作为React的前置知识，按我个人的学习习惯，打算先把这一系列前置内容快速过一遍，不去追求完全搞懂先，然后到了正式的React如果发现有需要弥补的，或者后续哪项内容又开始用到前面这一系列知识时，首先框架和用法就能清晰许多，其次再去回看具体的知识点应该就行

* 05_github案例_pubsub-src报错：`Request failed with status code 504`，网关超时错误，已确认端口按视频中的修改为5001；VPN方面开启或关闭均不影响此报错；控制台信息为`index.jsx:10 GET http://localhost:3000/api/search/users?q=... 504 (Gateway Timeout)`，打算暂时搁置，把这部分差不多学完再尝试解决，如果不再涉及相关内容则再直接咨询


## 下周计划
