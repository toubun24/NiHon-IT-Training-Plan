# Week 2 Report

## 学习内容及时长

* **2023.12.11 月曜日:** 4h15min (白天拍照去噜orz)
  * EL&JSTL 23:25-00:50
  * AJAX 21:00-21:40
  * Axios 21:50-22:05
  * Promise 22:05-22:40
  * React搭建与代码使用 22:40-24:00
  * *软件工程师常用日本语 P1-P4*

* **2023.12.12 火曜日:** 7h50min
  * React介绍 13:55-15:00
  * React组件 15:55-18:15
  * React组件生命周期A 20:35-21:50
  * React组件生命周期B 21:50-22:25
  * React-diffing算法 23:00-23:40
  * React脚手架介绍 23:45-00:40

* **2023.12.13 水曜日:** 
  * React脚手架简单使用 10:35-11:50
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
  * 标签必须闭合(`< ></ >`)，自闭合(`< />`)也行
  * 如果小写字母开头，就将标签转化为html同名元素，如果html中无该标签对应的元素，就报错；如果是大写字母开头，React就去渲染对应的组件，如果没有定义就报错
  * 注释必须写在花括号里，如`{/*注释...*/}`
  * JSX 允许在模板中插入数组，数组自动展开全部成员

**12. React组件**
* 注意
  * 组件名必须是首字母大写
  * 虚拟DOM元素只能有一个根元素
  * 虚拟DOM元素必须有结束标签`</>`
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
      alert(myInput.value)}
    render(){return(<input onBlur={this.myFunc} ref="myInput" type="text"/>)}
    ```
    * 回调形式：
    ```JavaScript
    myFunc = () => {
      const {myInput} = this
      alert(myInput.value)}
    render(){return(<input onBlur={this.myFunc} ref={c=>this.myInput=...} type="text"/>)}
    ```
    * createRef形式：
    ```JavaScript
    myRef = React.createRef() //创建ref容器
    myFunc = () => {
      alert(this.myRef.current.value)}
    render(){return(<input onBlur={this.myFunc} ref={this.myRef} type="text"/>)}
    ```
    * 事件处理：建议不要过度的使用ref，如果发生事件的元素刚好是需要操作的元素，就可以使用事件对象(event)去替代
    ```JavaScript
    myRef = React.createRef() //创建ref容器
    myFunc = (event) => {
      alert(event.target.value)}
    render(){return(<input onBlur={this.myFunc} ref={this.myRef} type="text"/>)}
    ```

**13. React受控组件与非受控组件**
* 受控组件：React中，可变状态通常保存在组件的状态属性中，并且只能使用`setState()`更新，而呈现表单的React组件也控制着在后续用户输入时该表单中发生的情况，以这种由React控制的输入表单元素而改变其值的方式
  ```JavaScript
  state = {myContent:''}
  saveMyContent = (event) => {
    this.setState({MyContent:event.target.value})}
  render(){return(<input onChange={this.myContent} type="text"/>)}
  ```
* 非受控组件：表单数据由DOM本身处理。即不受`setState()`的控制，与传统的HTML表单输入相似，input输入值即显示最新值(使用 ref从DOM获取表单值)
  ```JavaScript
  render(){return(<input ref={c => this.myContent = c} type="text"/>)}
  ```

**14. 高阶函数**
* 如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数
  * 若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数
  * 若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数
  * 常见的高阶函数有：Promise、setTimeout、arr.map()等等
* 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式
* 使用函数柯里化实现
  ```JavaScript
  state = {myContent:''}
  saveMyContent = (dataType) => {
    return (event)=>{
      this.setState({[dataType]:event.target.value})}}
  render(){return(<input onChange={this.myContent} type="text"/>)}
  ```
* 不使用函数柯里化实现
  ```JavaScript
  state = {myContent:''}
  saveMyContent = (dataType, event) => {
      this.setState({[dataType]:event.target.value})}
  render(){return(<input onChange={event => this.myContent} type="text"/>)}
  ```

**15. React组件旧生命周期**
* 三个阶段：初始化阶段，更新阶段，卸载组件
* **初始化阶段:** 由ReactDOM.render()触发---初次渲染
  1. **constructor执行:** 在组件初始化的时候只会执行一次。通常它用于做这两件事：1.初始化函数内部state；2.绑定函数；现在通常不会使用constructor，而是改用类加箭头函数的方法来替代，如`state = {count: 0}`
  2. **componentWillMount执行:** 该方法只在挂载的时候调用一次，表示组件将要被挂载，并且在render方法之前调用(将要被废弃)
  3. **render执行:** 组件中必须实现的方法，用于渲染DOM，但是它不会真正的操作DOM，它的作用是把需要的东西返回出去。实现渲染DOM操作的是`ReactDOM.render()`(注意：避免在 render 中使用 setState ，否则会死循环)
  4. **componentDidMount执行:** 意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作。这个挂载完成指的是：组件插入DOM tree
* **更新阶段:** 由组件内部`this.setSate()`或父组件render触发
  1. **shouldComponentUpdate执行:** 在组件更新之前调用，可以通过返回值来控制组件是否更新，允许更新返回true，反之不更新
  2. **componentWillUpdate执行:** 在render之前执行，表示组件将要更新
  3. **render执行:** 在控制是否更新的函数中，如果返回true才会执行render,得到最新的 React element
  4. **componentDidUpdate执行:** 组件在更新完毕后会立即被调用，首次渲染不会调用
  5. **(特殊)componentWillReceiveProps:** 表示组件将要接收新的props的钩子
* **卸载组件:** 由`ReactDOM.unmountComponentAtNode()`触发
  1. **componentWillUnmount执行:** 在组件即将被卸载或销毁时进行调用

**16. React组件新生命周期**
* 在旧生命周期的基础上，废弃三个生命周期，新增两个生命周期
* **初始化阶段:** 由ReactDOM.render()触发---初次渲染
  1. **constructor执行:** 在组件初始化的时候只会执行一次
  2. **(新)static getDerivedStateFromProps执行:** 在初始化和更新中都会被调用，并且在render方法之前调用，它返回一个对象用来更新state；是类上直接绑定的静态（static）方法，它接收两个参数props和state；props是即将要替代state的值，而state是当前未替代前的值(注意：`return props`而非'return null`时，state的值在任何时候都取决于传入的props，不会再改变)
  3. **render执行:** 组件中必须实现的方法，用于渲染DOM，但是它不会真正的操作DOM，它的作用是把需要的东西返回出去。
  4. **componentDidMount执行:** 意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作
* **更新阶段:** 由组件内部`this.setSate()`或父组件render触发
  1. **(新)getDerivedStateFromProps执行:** 执行生命周期，返回的值用于合并state，生成新的state
  2. **shouldComponentUpdate执行:** 在组件更新之前调用，可以通过返回值来控制组件是否更新，允许更新返回 true ，反之不更新
  3. **render执行:** 在控制是否更新的函数中，如果返回true才会执行render ,得到最新的React element
  4. **(新)getSnapshotBeforeUpdate执行:** 在最近一次的渲染输出之前被提交之前调用，也就是即将挂载时调用。相当于淘宝购物的快照，会保留下单前的商品内容，在React中就相当于是即将更新前的状态。它可以使组件在DOM真正更新之前捕获一些信息(例如滚动位置)，此生命周期返回的任何值都会作为参数传递给`componentDidUpdate()` 。如不需要传递任何值，那么请返回null
  5. **componentDidUpdate执行:** 组件在更新完毕后会立即被调用，首次渲染不会调用
* **卸载组件:** 由`ReactDOM.unmountComponentAtNode()`触发
  1. **componentWillUnmount执行:** 在组件即将被卸载或销毁时进行调用

**17. React diffing算法**
* 概念和作用：React提升渲染性能的一种优化算法，计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面
* Virtual DOM(虚拟 DOM): 在React中，render执行的结果得到的并不是真正的DOM节点，而是JavaScript对象。虚拟DOM只保留了真实DOM节点的一些基本属性，和节点之间的层次关系，它相当于建立在JavaScript和DOM之间的一层“缓存”
* 对于一个节点必备的三个属性
  * tag: 指定元素的标签类型，如li, div
  * props: 指定元素身上的属性，如class, style, 自定义属性
  * children: 指定元素是否有子节点，参数以数组形式传入 \
    而我们在 render 中编写的 JSX 代码就是一种虚拟 DOM 结构
* 传统diff算法：通过循环递归对节点进行依次对比，算法复杂度达到O(n^3)，其中n是树的节点数
* React的diff算法：O(n)复杂度
  * tree diff策略：Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计
    * React通过updateDepth对Virtual DOM树进行层级控制
    * 对树分层比较(分层求异)，两棵树只对同一层次节点进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较
    * 只需遍历一次，就能完成整棵DOM树的比较
    * 由于React只会简单的进行同层级节点位置变化，对于不同层级的节点，只有创建和删除操作
  * component diff策略：拥有相同类的两个组件生成相似的树形结构；拥有不同类的两个组件生成不同的树形结构。
    * 如果是同一类型的组件，则按照原策略（层级比较)继续比较虚拟DOM tree
    * 如果不是，则将这个组件记为dirty component(脏组件)，从而替换整个组件下的所有子节点
    * 同时对于同一类型的组件，有可能其Virtual DOM没有任何变化，如果能够确切的知道这点就可以节省大量的diff运算的时间，因此React允许用户通过shouldComponentUpdate()判断该组件是否需要进行diff算法分
    * 总的来说，如果两个组件结构相似，但被认定为了不同类型的组件，则不会比较二者的结构，而是直接删除
  * element diff策略：对于同一层级的一组子节点，通过唯一id区分
    * 是专门针对同一层级的所有节点的策略。当节点在同一层级时，diff提供了3个节点操作方法：插入，移动，删除
    * 允许添加唯一值key来区分节点，且不能用index作为key值
    * 在 React 中只允许节点右移，则只需要对移动的节点进行更新渲染，不移动的则不需要更新渲染
      ```JavaScript
      render(){return(<ul>{this.state.XXX.map((XXX) => {return <li key={XXX.xxx}>{XXX.xxx}<input type="text"/></li>})}</ul>)}
      ```

**18. React 脚手架**
* __, 启动!
  * 安装：`npm i create-react-app -g`
  * 快速搭建项目：`create-react-app hello-react`
  * 启动项目：`npm start`
* 脚手架项目结构
  ```
  hello-react
  ├─ .gitignore               // 自动创建本地仓库
  ├─ package.json             // 相关配置文件
  ├─ public                   // 公共资源
  │  ├─ favicon.ico           // 浏览器顶部的icon图标
  │  ├─ index.html            // 应用的 index.html入口
  │  ├─ logo192.png           // 在 manifest 中使用的logo图
  │  ├─ logo512.png           // 同上
  │  ├─ manifest.json         // 应用加壳的配置文件
  │  └─ robots.txt            // 爬虫协议文件
  ├─ src                      // 源码目录
  │  ├─ App.css               // App组件的样式
  │  ├─ App.js                // App组件
  │  ├─ App.test.js           // 用于给APP做测试
  │  ├─ index.css             // 样式
  │  ├─ index.js              // 入口文件
  │  ├─ logo.svg              // logo图
  │  ├─ reportWebVitals.js    // 页面性能分析文件(需要web-vitals库的支持)
  │  └─ setupTests.js         // 组件单元测试文件(需要jest-dom库的支持)
  └─ yarn.lock                // 包管理工具
  ```

**18. React 脚手架简单使用**












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

15. `...`: ES6的扩展运算符，用于取出参数对象的所有可遍历属性，然后拷贝到当前对象之中。

16. `event.preventDefault()`: 取消事件的默认动作；如果event对象的cancelable属性是false，那么就没有默认动作或不能阻止默认动作，无论哪种情况，调用该方法都没有作用

17. onchange事件
* 只在表单元素的焦点离开时触发
* 对于单选框和复选框来说，只有当用户点击了一个不同的选项时，才会触发onchange事件
* 对于select元素，只有当用户点击下拉列表并选择一个选项时，才会触发onchange事件。如果用户点击下拉列表但并没有选择任何选项，onchange事件不会触发

18. `event.target.value`
* 是事件监听器调用时的事件对象中的属性之一，该属性保存用户输入表单时的实际值，也可以作为选择框中用户选择的值。当表单元素产生值改变事件时，该值将会被更新。在某些情况下，比如文本框里的文本被改变或下拉列表选择的选项被更改时，都会触发这个事件
* input元素是最常见的表单元素，根据不同的type属性可以显示文本框、单选框、多选框等等。在文本框中，`event.target.value`属性保存的是输入的实际值。

19. input标签的type属性
    > text: 输入文本 \
    > password: 输入密码，输入的内容会被隐藏 \
    > checkbox: 创建复选框 \
    > radio: 创建单选按钮 \
    > submit: 提交表单 \
    > reset: 重置表单 \
    > button: 创建普通按钮 \
    > file: 选择上传文件 \
    > date: 选择日期 \
    > time: 选择时间 \
    > range: 选择范围内的数值 \
    > color: 选择颜色 \
    > 此外，还有一些较少使用的类型，如email、tel、url等，用于限制用户输入的内容格式。

20. hooks
* hooks不能使用在if语句和for语句中，来保持hooks按顺序执行
* [未读](https://www.jianshu.com/p/76901410645a/)
* [未读](https://zhuanlan.zhihu.com/p/597987053)

21. SPA: single page web application, 单页Web应用
* 是一种网页应用或网站的设计模式，它在浏览器中仅加载一个HTML页面，并动态地更新该页面，而不是为每个新页面加载新的HTML。这使得应用能够与用户交互，无需重新加载整个页面
* 主要特点
  * 动态重写：SPA 在用户与应用交互时动态地重写当前页面，而不是加载新页面
  * 速度：由于大部分资源（如 HTML、CSS、JavaScript）只加载一次，因此 SPA 通常比传统的多页应用有更快的响应
  * 浏览器历史记录：虽然 SPA 只有一个页面，但它们可以使用浏览器的历史API来创建可导航的  * URL，使用户可以使用浏览器的前进和后退按钮
  * 与后端交互：SPA 通常会与后端的 Web API 进行数据交互，获取所需的数据并更新视图
  * 前端路由：SPA 使用前端路由来管理应用中的不同视图，而不是依赖服务器端的路由

22. 安装React包的诸多问题参考
* 下载开始后没有变化，显示为`idealTree:npm: sill idealTree buildDeps`
* [参考链接](https://blog.csdn.net/weixin_38203411/article/details/128812182)
* Windows下CMD可以记得以管理员身份启动，但我这里不是这个问题；通过将node的仓库地址改成淘宝镜像的仓库地址后成功下载

23. 加壳
* 全称是可执行程序资源压缩，压缩后的程序可以直接运行
* 另一种常用的方式是在二进制的程序中植入一段代码，在运行的时候优先取得程序的控制权，之后再把控制权交还给原始代码，这样做的目的是隐藏程序真正的OEP（入口点，防止被破解）。大多数病毒就是基于此原理
* 加壳的程序需要阻止外部程序或软件对加壳程序本身的反汇编分析或者动态分析，以达到保护壳内原始程序以及软件不被外部程序破坏，保证原始程序正常运行。这种技术也常用来保护软件版权，防止软件被破解。但对于病毒，加壳可以绕过一些杀毒软件的扫描，从而实现它作为病毒的一些入侵或破坏的一些特性
* 应用加壳时的配置文件：`<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />`

24. 严格模式(strict mode)
* 目的
  * 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为;
  * 消除代码运行的一些不安全之处，保证代码运行的安全；
  * 提高编译器效率，增加运行速度；
  * 为未来新版本的 JavaScript 做好铺垫
* 开启：'use strict'
  ```
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```

24. VS Code插件
* JS JSX Snippets: React快捷输入，例如输入rcc，快速创建类组件
* Auto Import - ES6, TS, JSX, TSX: 自动导入
* Simple React Snippets: 提供了一组精心挑选的React代码片段，可以通过输入几个字母轻松地将其添加到代码中，如输入`imr`会将React导入到组件中
* ES7+ React/Redux/React-Native snippets: 提供了许多速记前缀来加速开发并帮助开发人员为React、Redux和React Native创建代码片段和语法

24. Chrome插件：
* React Developer Tools: 开发者工具审查React组件的浏览器扩展










## 遇见问题

* .jsp文件运行：想测试[GitHub/zerostart/.../EL&JSTL](https://github.com/warrenlucky/zerostart/tree/main/java/%E5%BE%85%E5%88%86%E7%B1%BB/code/EL%26JSTL)里存放的示例文件，但似乎需要配置服务器环境才能运行，比如Tomcat；先暂放一下，看后续课件有无用到

* 从JSTL开始到AJAX，都有点晕，具体某条代码什么的跟着视频走好像也就那回事，但不知道这些代码是在什么情况下使用、整体的框架是什么样子的，后面好像还有Axios和Promise作为React的前置知识，按我个人的学习习惯，打算先把这一系列前置内容快速过一遍，不去追求完全搞懂先，然后到了正式的React如果发现有需要弥补的，或者后续哪项内容又开始用到前面这一系列知识时，首先框架和用法就能清晰许多，其次再去回看具体的知识点应该就行【后续补充：果然从React开始又基本从零开始讲解起来了，就看后面什么时候再遇到这些内容了】

* 05_github案例_pubsub-src报错：`Request failed with status code 504`，网关超时错误，已确认端口按视频中的修改为5001；VPN方面开启或关闭均不影响此报错；控制台信息为`index.jsx:10 GET http://localhost:3000/api/search/users?q=... 504 (Gateway Timeout)`，打算暂时搁置，把这部分差不多学完再尝试解决，如果不再涉及相关内容则再直接咨询

* React脚手架简单使用示例中控制台警告：Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot. printWarning @ react-dom.development.js:86. 应该是现在的React版本相比视频中的又进行了更新，`ReactDOM.render`在新版中似乎不再被支持了，而应使用`createRoot`，否则将视为依然在React 17下运行。那只要不报错就暂时就先继续按照课件格式写，免得学习过程中遇到什么奇怪的bug好了，熟悉一点之后再对新版语法进行尝试，应该不会太麻烦


## 下周计划