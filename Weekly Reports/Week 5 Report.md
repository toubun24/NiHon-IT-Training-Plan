# Week 5 Report

## 学习内容及时长

* **2024.01.01 月曜日:** 4h15min
  * 代码复现 21:05-22:45 23:20-00:40 00:50-01:20
  * 软件工程师常用日本语初级中(P66-P70) 19:50-20:15
  * 日语影子跟读初中级Unit3 20:15-20:35

* **2023.01.02 火曜日:** 3h45min
  * 代码复现 17:30-18:30 20:05-21:55
  * 软件工程师常用日本语初级中(P71-P75) 16:10-16:40
  * 日语影子跟读初中级Unit3 16:40-17:05

* **2023.01.03 水曜日:** 4h25min
  * 代码复现 16:45-18:55
  * 软件工程师常用日本语初级下(P76-P80) 15:30-15:55
  * 日语影子跟读初中级Unit4 15:55-16:05
  * Mobx状态管理 00:20-02:00

* **2023.01.04 木曜日:** 
  * 软件工程师常用日本语初级下(P81-P85) 16:30-16:55
  * 日语影子跟读初中级Unit4 17:10-17:20
  * TS基本语法 17:20-20:15 20:50-21:40

* **2023.01.05 金曜日:** 
  * 软件工程师常用日本语初级下(P86-P90) 15:45-16:10
  * 日语影子跟读初中级Unit4 16:10-16:20
  * TS基本语法 16:20-17:40
  * 样式化组件与单元测试 22:30-23:35

* **2023.01.06 土曜日:** 
  * Redux-Saga 19:55-23:35 00:25-01:25

* **2023.01.07 日曜日:** 

  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 

## 学习笔记

1. **TS基本语法**
* 脚手架安装: `create-react-app xxx --template typescript`
* 声明文件: `npm i --save @types/{依赖包名称}`，编译器需要通过这个声明文件，进行类型检查工作

2. **styled-components**
* 安装依赖`npm i styled-components`
* 引入`import styled from 'styled-components'`

3. **React-单元测试**
* 浅渲染：将一个组件渲染成虚拟DOM对象，但是只渲染第一层，不渲染所有子组件，所以处理速度非常快。它不需要DOM环境，因为根本没有加载进DOM
* 测试顺序
  * 测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块
  * describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称，第二个参数是一个实际执行的函数
  * it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称，第二个参数是一个实际执行的函数
  * expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接

4. **JavaScript生成器函数(Generator function)**
* `function *函数名(参数){函数体}`
* 函数体内部使用`yield`表达式，定义不同的内部状态。执行Generator函数生成一个遍历器对象，用该对象调用其`next()`方法来遍历函数内部的状态
* 调用`Generator`函数，返回一个遍历器对象，代表`Generator`函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着`value`和`done`两个属性的对象
* `value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束
* `yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值
* 第一次调用`Generator`函数，返回遍历器对象。这时候，函数内部是没有执行的，仅仅返回遍历器对象。当调用`next()`方法时，函数才从头部开始执行，直到遇到`yield`表达式，则交出函数执行权，函数停止执行
* 自动执行器相当于`async``await`源码

5. **redux-saga**
* redux-saga是一个以redux中间件形式存在的一个库，主要是为了更优雅地 管理 Redux 应用程序中的副作用（Side Effects），执行更高效，测试更简单，在处理故障时更容易
* redux-saga与redux-thunk区别
  * redux-thunk监控传入系统中的每一个action，如果是个函数的话，那么它就会调用那个函数；选择以`middleware`的形式来增强redux store的`dispatch`方法（即：支持了 dispatch(function)），从而在拥有了异步获取数据能力的同时，又可以进一步将数据获取相关的业务逻辑 从View层分离出去
  * redux-saga是以命令/答复的形式与各个saga之间进行通讯，当接收到指令时会执行对应的saga
* `npm install redux-saga`
* `createSagaMiddleware(options)`
  * `sagaMontior`：用于接收middleware传递的监视事件
  * `emmiter`：用于从redux向redux-saga进给actions
  * `logger`：自定义日志方法（默认情况下，middleware会把所有的错误和警告记录到控制台中）
  * `onError`：当提供该方法时，middleware将带着Sagas中未被捕获的错误调用它
* Effect创建器
  > `Take:` 创建一个`Effect`描述信息，用来命令`middleware`在`Store`上等待指定的`action`。 在发起与`pattern`匹配的`action`之前，`Generator`将暂停 \
  > `Put:` 创建一个`Effect`描述信息，用来命令`middleware`向`Store`发起一个`action`。 这个`Effect`是非阻塞型的，并且所有向下游抛出的错误（例如在`reducer`中），都不会冒泡回到`saga`当中 \
  > `Call:` 创建一个`Effect`描述信息，用来命令`middleware`以参数 args 调用函数`fn` \
  > `Apply:` 类似Call \
  > `Fork:` 创建一个`Effect`描述信息，用来命令`middleware`以非阻塞调用的形式执行`fn` \
  > `Spawn:` 与fork类似，但创建的是被分离的任务。被分离的任务与其父级任务保持独立 \
  > `Join:` 创建一个`Effect`描述信息，用来命令`middleware`等待之前的一个分叉任务的结果 \
  > `Cancel:` 创建一个 Effect，用以取消任务 \
  > `Select:` 创建一个 Effect，用来命令`middleware`在当前`Store`的`state`上调用指定的选择器（即返回`selector(getState(), ...args)`的结果） \
  > `ActionChannel:` 创建一个 Effect，用来命令`middleware`通过一个事件`channel`对匹配`pattern`的`action`进行排序 \
  > `Flush:` 创建一个 Effect，用来命令`middleware`从`channel`中冲除所有被缓存的数据。被冲除的数据会返回至`saga`，这样便可以在需要的时候再次被利用 \
  > `Cancelled:` 创建一个 Effect，用来命令`middleware`返回该`generator`是否已经被取消 \
  > `setContext:` 创建一个 effect，用来命令`middleware`更新其自身的上下文 \
  > `getContext:` 创建一个 effect，用来命令`middleware`返回`saga`的上下文中的一个特定属性
* Effect组合器
  > `Race:` 创建一个`Effect`描述信息，用来命令`middleware`在多个`Effect`间运行 竞赛（Race）（与`Promise.race([...])`的行为类似） \
  > `All:` 创建一个`Effect`描述信息，用来命令`middleware`并行地运行多个`Effect`，并等待它们全部完成。这是标准的`Promise`
* Saga辅助函数
  > `TakeEvery:` 在发起（dispatch）到`Store`并且匹配`pattern`的每一个`action`上派生一个`saga` \
  > `TakeLatest:` 在发起到`Store`并且匹配`pattern`的每一个`action`上派生一个`saga`。并自动取消之前所有已经启动但仍在执行中的`saga`任务 \
  > `TakeLeading:` 在发起到`Store`并且匹配`pattern`的每一个`action`上派生一个`saga`。 它将在派生一次任务之后阻塞，直到派生的`saga`完成，然后又再次开始监听指定的`pattern` \
  > `Throttle:` 在发起到`Store`并且匹配`pattern`的一个`action`上派生一个`saga`。 它在派生一次任务之后，仍然将新传入的`action`接收到底层的`buffer`中，至多保留（最近的）一个。但与此同时，它在ms毫秒内将暂停派生新的任务，也就是它被命名为节流阀`throttle`的原因。其用途，是在处理任务时，无视给定的时长内新传入的`action`


## 内容拓展

1. 二进制和八进制
* ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b(或0B)和0o(或0O)表示
* 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法，如`Number('0o10')`

2. `<dl>`, `<dt>`, `<dd>`
* `<dl>`: Definition List (定义列表)
* `<dt>`: Definition Term（定义项）
* `<dd>`: Definition Description（定义描述）
* 这三个标签必须同时出现，而且dt，dd必须嵌套在dl内。dt和dd是同级关系，并不是嵌套关系。dd必须紧跟在dt之后，dd前可以有多个dt，但dd前面必须至少有一个dt。dt后面至少需要有一个dd。dt和dd是多对多的关系

3. `rcc`, `rfc`

4. `npm --save`
* 将安装的包添加到项目的package.json文件的dependencies字段中
* 当运行`npm install <package-name>`时，默认情况下，npm会将安装的包保存到项目的node_modules目录中，但不会将其添加到package.json文件中。这意味着如果将项目分享给其他人或在其他环境中部署项目时，其他人或其他环境需要手动运行`npm install`来安装依赖。为了简化依赖管理，你可以使用--save选项来告诉npm将安装的包添加到package.json文件中的dependencies字段中。这样，其他人或其他环境只需要运行npm install即可安装项目的所有依赖

5. TS泛型：[链接](https://blog.csdn.net/semlinker/article/details/106882403?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-106882403-blog-124017662.235%5Ev40%5Epc_relevant_3m_sort_dl_base3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-106882403-blog-124017662.235%5Ev40%5Epc_relevant_3m_sort_dl_base3&utm_relevant_index=1)

6. `Promise()`
* `new Promise((resolve,reject)=>{resolve(),reject()})`
* 这个数据容器内部有三种状态: 等待 ==>产生的正确数据  产生了错误的数据

7. `createSagaMiddleware()`
* 创建一个Redux中间件，将Sagas与Redux Store链接起来
* sagas中的每个函数都必须返回一个Generator对象，middleware会迭代这个Generator并执行所有`yield`后的Effect（Effect可以看作是redux-saga的任务单元）










## 遇见问题
1. 【已解决】**3_swiper-同步.jsx**中，关于Swiper的引入，示例代码使用的是
```JavaScript
import Swiper, { Navigation, Pagination } from "swiper";
```
然而报错
```
export 'Navigation' (imported as 'Navigation') was not found in 'swiper' (possible exports: Swiper, default)
export 'Pagination' (imported as 'Pagination') was not found in 'swiper' (possible exports: Swiper, default)
```
现在已经比较有经验了，一看就是版本问题导致引入方式发生了改变，于是去官网参考了新的引入方式()
```JavaScript
import { Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
```
然而依然报错
```
swiper_react__WEBPACK_IMPORTED_MODULE_1__.Swiper is not a constructor
TypeError: swiper_react__WEBPACK_IMPORTED_MODULE_1__.Swiper is not a constructor
```
去掉`/react`部分后则又能运行通过了
```JavaScript
import { Swiper } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
```

2. **5_swiper组件**中，原本的[轮播图链接](https://m.maizuo.com/gateway?type=2&cityId=442000&k=5402781)已失效，去[官网](https://m.maizuo.com/)查看后发现网站中已经不再进行轮播图的显示，遂去b站之类的地方找轮播图，其中有的网站找半天找不到轮播图的模块(可能是找的方法还不够成熟)，有的网站找到了轮播图模块，但`Headers`中并未暴露出axios所需的`X-Client-Info`和`X-Host`，可能是网站做了什么保密手段？还不太熟悉这一块的内容，暂且搁置一下，手动将轮播图的url写进`state`得以先实现

3. 【已解决】**09_useRef**中，`myRef.current`在`useCallback`中
```JavaScript
const push = useCallback(() => {
            setlist([...list,myRef.current.value])
            myRef.current.value = ''
        },[list,myRef.current]
    )
```
会出现警告：`React Hook useCallback has an unnecessary dependency: 'myRef.current'. Either exclude it or remove the dependency array. Mutable values like 'myRef.current' aren't valid dependencies because mutating them doesn't re-render the component react-hooks/exhaustive-deps`，修改为以下片段后警告消失
```JavaScript
const push = useCallback(() => {
            setlist([...list,myRef.current.value])
            myRef.current.value = ''
        },[list] // ,myRef.current
    )
```

4. 【已解决】原示例代码**24_mobx2**(在复现代码仓库中则是**25_mobx3-src**)运行后首先缺少`mobx-react`包，需要`npm install mobx-react`；其次，无报错信息且显示出相关组件后，对按钮进行操作发现显示的数值并未得到更新，一直是0；而控制台中的组件信息下，`store`的`count`是能够变化的（但不是实时变化，每次需要重新进出一次那个界面才会更新），或者对源代码进行修改后重新保存渲染也会使得网页显示的`<h2>当前和为:{this.props.store.count}</h2>`直接得到更新渲染，说明不是传值的问题，是渲染不到位的问题；查询之后发现应该是新版本的mobx6导致的渲染问题。在`store.jsx`中，`@observable count = 0`后面添加以下代码即可
```JavaScript
constructor(){
    makeObservable(this)
}
```

5. TS中对`import React, { Component } from 'react'`警告`'React' is declared but its value is never read.`。React 17引入了新的JSX编译方式，无须在组件中显式地`import React`。注意需要配合TypeScript 4.1+版本。随后把文件放到非`src`的文件夹下后又警告`'React' refers to a UMD global, but the current file is a module. Consider adding an import instead`，于是又把`React`重新`import`了。。

6. **17_warning_TS组件库-src**中涉及了`antd-mobile`等相关内容，以及本地创建轮播图等，暂放一段时间先

7. Enzyme库似乎无法支持React 18，参考[参考链接](https://www.saoniuhuo.com/question/detail-2743159.html)，而**React Testing Library(RTL)**则被提到，暂时不涉及这块的话先不管了

8. 【已解决】**27_03_reduxSaga无Saga-src**的`redux/store.jsx`中，代码如下
```JavaScript
import { applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import Reducer from './reducer'
import Saga from './saga'
import createSagaMiddleware from 'redux-saga'
const SagaMiddleware = createSagaMiddleware()
const store = configureStore({ reducer: Reducer }, applyMiddleware(SagaMiddleware))
SagaMiddleware.run(Saga)
export default store
```
会控制台报错`Uncaught Error: Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware`，而
```JavaScript
import { configureStore } from "@reduxjs/toolkit"
import Reducer from './reducer'
import Saga from './saga'
import createSagaMiddleware from 'redux-saga'
const SagaMiddleware = createSagaMiddleware()
const store = configureStore({reducer: Reducer, middleware: [SagaMiddleware]})
SagaMiddleware.run(Saga)
export default store
```
则报错`Uncaught Error: 'middleware' field must be a callback`。
* 直接使用`createStore()`而非`configureStore()`则虽然提示`deprecated`但能正常运行。
* 关于`Uncaught Error: 'middleware' field must be a callback`，参考[链接](https://github.com/reduxjs/redux-toolkit/discussions/3945)中，`Updates the middleware and enhancers options of configureStore to require callbacks`，发布日期是Dec 4, 2023，也就是在这之前的版本其实并没有要求回调，也因此查到的大多数基于React18下`configureStore()`的示例代码在这里又会触犯最新更新的回调规范。。（感觉复现代码最费时间的就是React18带来的版本问题。。又很难搜到当前版本的最新内容，调整半天多半就是某个语句语法的新写法或者某个新函数的替换。。）相关更新内容如下
```
configureStore Options Changes
configureStore.middleware must be a callback
Since the beginning, configureStore has accepted a direct array value as the middleware option. However, providing an array directly prevents configureStore from calling getDefaultMiddleware(). So, middleware: [myMiddleware] means there is no thunk middleware added (or any of the dev-mode checks).

This is a footgun, and we've had numerous users accidentally do this and cause their apps to fail because the default middleware never got configured.

As a result, we've now made the middleware only accept the callback form. If for some reason you still want to replace all of the built-in middleware, do so by returning an array from the callback:
```
```JavaScript
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    // WARNING: this means that _none_ of the default middleware are added!
    return [myMiddleware]
    // or for TS users, use:
    // return new Tuple(myMiddleware)
  },
})
```
```
But note that we consistently recommend not replacing the default middleware entirely, and that you should use return getDefaultMiddleware().concat(myMiddleware)
```
参考这里的格式，调整了`middleware`的写法，写成箭头函数的形式，果然还真就过了。。
```JavaScript
const store = configureStore({ reducer: Reducer, middleware: () => { return [SagaMiddleware] } })
```


## 下周计划


