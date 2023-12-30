# Week 4 Report

## 学习内容及时长

* **2023.12.25 月曜日:** 7h15min
  * 代码复现 00:25-01:35 02:45-04:15 17:20-19:10 20:15-21:30 22:20-22:55
  * 软件工程师常用日本语初级中(P41-P45) 16:10-16:50
  * 日语影子跟读初中级Unit2 16:50-17:05

* **2023.12.26 火曜日:** 
  * 代码复现 09:45-11:00 11:30-12:05 16:45-17:15 17:25-17:35 23:20-23:45 00:05-01:35
  * 软件工程师常用日本语初级中(P46-P50) 15:45-16:05
  * 日语影子跟读初中级Unit2 16:05-16:20

* **2023.12.28 木曜日:** 5h45min
  * 代码复现 16:15-17:50 20:10-20:50 21:05-21:55 23:40-01:25
  * 软件工程师常用日本语初级中(P51-P55) 14:55-15:25
  * 日语影子跟读初中级Unit2 15:25-15:50


* **2023.12.29 金曜日:** 
  * 代码复现 16:30-17:35 22:00-22:50 22:55-23:05 23:50-01:35
  * 软件工程师常用日本语初级中(P56-P60) 15:40-16:05
  * 日语影子跟读初中级Unit3 16:05-16:25


* **2023.12.30 土曜日:** 
  * 代码复现 11:40-13:15 17:20-19:10
  * 软件工程师常用日本语初级中(P61-P65) 16:30-16:55
  * 日语影子跟读初中级Unit3 16:55-17:10

* **2023.12.31 日曜日:** 
  * 代码复现 
  * 软件工程师常用日本语初级中(P56-P60) 
  * 日语影子跟读初中级Unit3 

  * 样式化组件与单元测试 
  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 

## 学习笔记



## 内容拓展
1. PubSub `token` for subscriber
```JavaScript
componentDidMount(){
    this.token = PubSub.subscribe('search',(_,stateObj) => {
        this.setState(stateObj)
    })
}
componentWillUnmount(){
    PubSub.unsubscribe(this.token)
}
```

2. react-router-dom安装: `npm install react-router-dom`

3. history API
  > `History.createBrowserHistory()`: 得到封装window.history的管理对象 \
  > `History.createHashHistory()`: 得到封装window.location.hash的管理对象 \
  > `history.push()`: 添加一个新的历史记录 \
  > `history.replace()`: 用一个新的历史记录替换当前的记录 \
  > `history.goBack()`: 回退到上一个历史记录 \
  > `history.goForword()`: 前进到下一个历史记录 \
  > `history.listen(function(location){})`: 监视历史记录的变化

4. `useParams()`

5. redux插件
为了方便我们开发，推荐安装一下`redux`的开发工具：`redux-devtools`(`yarn add redux-devtools -D`)，需要注意的是在 chrome 浏览器中我们也需要安装对应的插件：`redux-devtools`来结合使用

6. `const { selectNumber: { value } } = this` = `const {value} = this.selectNumber`

7. React `root.unmount()`: [官方文档](https://react.docschina.org/reference/react-dom/client/createRoot#root-unmount)


## 遇见问题
1. 【已解决】**08_路由NavLink的使用-src**复现时，高亮样式没能体现出来，因为复现的样式过于简陋，而示例代码中嵌套了一大堆设定过特定`className`的标签，但并没有对应的css文件，运行后却又能体现出样式来，不知道是在哪里对这些class定义的样式的，先暂放一下吧
* v6已删除`activeClassName`属性，或许版本不同有所影响
* 刚把示例代码的整个src搬到代码复现用的工作区运行，样式便发生了丢失，说明不是`className`有什么魔法代码能直接通过特定命名来体现样式；那么样式就应该还是来自于外源的css文件或者是什么配置文件，但也没有`import`呀
* 通过搜`col-xs-offset-2 col-xs-8`找到了语法的出处，是Bootstrap全局CSS样式；在示例代码文件夹中搜索相关关键词，定位到了`public/bootstrap`，随后将`<link rel="stylesheet" href="%PUBLIC_URL%/bootstrap/bootstrap.css">`添加到`public/index.html`中，全局样式便得到了引入，之后只需要按规定语法对`className`进行命名即可调用到相应的bootstrap样式，但高亮问题依然没有得到解决
* 将整个src示例代码文件夹搬到复现的工作路径后依然无法实现高亮，但在原本clone出来的文件夹中可以实现高亮，有了先前的经验，这说明又是某个全局上的设置出了问题，毕竟运行的是同一份代码文件，不会是语法或细节的偏差导致结果不一样的。在网上搜索"NavLink高亮"相关词条，发现有人提到，如果无法实现高亮，则可以创建`App.css`并在其中引入以下代码: `<style>.light{background-color: orange !important;color: white !important;}</style>`，并在`App.jsx`中引入相应的CSS文件即可；但示例代码没有这些内容，于是又尝试同时在两个不同的工作区文件夹下同时运行2份同样的代码，在网页中对其中一个选项进行点击触发高亮，随后F12查看两个页面对该组件的渲染词条的区别，果然发现高亮词条下的渲染多出了以下代码显示`.light{background-color: orange !important;color: white !important;}`，随后便在左侧的Elements栏找到了该代码的出处，而其上一行代码正式刚刚前面提到的`<link rel="stylesheet" href="/bootstrap/bootstrap.css">`，那么位置也就不言而喻了，也是在`public/index.html`，添加之后问题解决

2. 【已解决】**02_redux精简版-src**复现时，`createStore`在相关引入的代码中均被横线划掉。信息如下：
```JavaScript
'createStore' is deprecated.ts(6385)
redux.d.ts(327, 4): The declaration was marked as deprecated here.
(alias) function createStore<S, A extends Action<string>, Ext extends {} = {}, StateExt extends {} = {}>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<Ext, StateExt>): Store<S, A, UnknownIfNonSpecific<StateExt>> & Ext (+1 overload)
import createStore
@deprecated
We recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore.
```
简单来说就是最新导入方式发生了改变。查询到的方法一为将导入方式改为如下语句：
```JavaScript
import {legacy_createStore as createStore} from 'redux'
```
方法二则是使用`configure store`代替`createstore`。首先安装包：`npm install @reduxjs/toolkit`。随后修改`store.js`为以下格式：
```JavaScript
// npm install @reduxjs/toolkit

// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import countReducer from './count_reducer'

// export default createStore(countReducer)
const store = configureStore({
    reducer: countReducer
})
  
export default store
```

3. 【已解决】上一个问题中顺带遇见并解决的一个小问题，控制台显示报错`manifest.json:1 Manifest: Line: 1, column: 1, Syntax error.`。因为重新建了文件夹存放redux相关内容的复现代码，对react脚手架源文件进行了删减；只要将`public`文件夹下的`manifest.json`和`logo192.png`保留即可

4. 【已解决】早先已经参考React18的语法将`index.js`的代码作过调整，由
```JavaScript
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'))
```
改为
```JavaScript
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
```
但在redux板块，`index.js`的原本写法为
```JavaScript
ReactDOM.render(<App/>,document.getElementById('root'))
store.subscribe(() => {
    ReactDOM.render(<App/>,document.getElementById('root'))
})
```
当时我也没多想，就把每一条的`ReactDOM.render`替换为了React18版本下的三行代码，并且在首次渲染及默认选择"1"为加减数值时的测试过程均无报错，便没有注意到问题，直到后来测试发现选择"2"或"3"进行运算操作时，运算一次后选择器便会回到"1"的默认值去。一开始以为是选择器标签部分的代码出现了问题，后来以为是ref存储的问题，最后参考警告信息`You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.`找到渲染的相关代码，意识到`const`重复创建初始化了相关数据。最终，`index.js`正确的写法如下
```JavaScript
import React from 'react'
import ReactDOM from 'react-dom/client' // react-dom/client
import App from './App'
import store from './redux/store'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
store.subscribe(() => {
    root.render(<App />);
})
```

5. 【已解决】小问题，**04_redux异步action-src**中，自己尝试把奇数加函数的判定也封装到`action`对象中进行调用，但需要注意两点：1. 判定包裹return; 2. 不满足判定条件时也需要return一个dispatch的空箭头函数，来触发`count_reducer.js`中的`default: peturn prevstate`

6. 【已解决】小问题，**05_react-redux的基本使用-src**中，`App.jsx`引入部分的`import Count from './components/Count'`变更为了`import Count from './containers/Count'`，但我没有注意到这一点，一直以为是其他部分的错误导致state和function出现无法传参的情况，找了半天bug。。。看来之后还是得注意文件夹和组件的命名，都叫Count确实很容易看混

7. 【已解决】小问题，**07_react-redux数据共享-src**中，`import { composeWithDevTools } from "redux-devtools-extension"`会报错`can't resolve 'redux-devtools-extension'`，而通过`npm i redux-devtools-extension`进行安装时则报错如下
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: react_redux@0.1.0
npm ERR! Found: redux@5.0.1
npm ERR! node_modules/redux
npm ERR!   redux@"^5.0.1" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer redux@"^3.1.0 || ^4.0.0" from redux-devtools-extension@2.13.9
npm ERR! node_modules/redux-devtools-extension
npm ERR!   redux-devtools-extension@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```
后来通过网上资料尝试使用`yarn add @redux-devtools/extension`进行安装能够成功，随后的导入语句也就相应地调整为`import { composeWithDevTools } from '@redux-devtools/extension';`即可正常运行。值得顺便一提的是`redux/store.js`中，按
```JavaScript
const store = configureStore({
    reducer: countReducer
}, applyMiddleware(thunk))
export default store
```
的新版语法格式将`export default createStore(AllReducer,composeWithDevTools(applyMiddleware(thunk)))`改写为如下即可
```JavaScript
export default configureStore({
    reducer: AllReducer
}, composeWithDevTools(applyMiddleware(thunk)))
```

8. **4_react拓展/03_hooks-src**中，`ReactDOM.unmountComponentAtNode(document.getElementById('root'))`在React18版本下被弃用，转而使用`root.unmount()`，卸载组件函数如下
```JavaScript
death = () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.unmount()
}
```
可以正常执行功能，但F12控制台会提示如下信息
```
Warning: You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.
```
[参考链接1](https://www.cnblogs.com/qinghuanjing/p/16316758.html)中也提到了这个问题，以后再尝试解决。[参考链接2](http://www.kuazhi.com/post/397036.html)

9. **4_react拓展/03_hooks-src**中，`useEffect`初始化时输出`被调用了`没有问题，但在之后的每次+1后，都会先出现`被卸载了`然后是`被调用了`，而在卸载组件时则什么都没输出，与预期不符。`useEffect`相关代码如下
```JavaScript
useEffect(() => {
        console.log('被调用了'); // componentDidMount & componentDidUpdata 
        return () => {
            console.log('被卸载了'); // componentDidUnmount
        }
    }, [count]) // componentDidUpdata 
```
卸载组件时无法输出可能和问题8有关系，暂且不表；但正常的更新组件为什么会调用卸载组件才会出现的输出，确实就很奇怪。附一个有一丁点相关的[参考链接](https://www.sohu.com/a/552024311_121124376)

## 下周计划
* 日语方面每天保持软件工程师日语+影子日语的节奏还可以，之后尽量继续保持

