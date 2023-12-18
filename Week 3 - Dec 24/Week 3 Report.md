# Week 3 Report

## 学习内容及时长

* **2023.12.18 月曜日:** 
  * Redux持久化储存 10:00-10:30 10:55-12:50
  * Mobx状态管理 
  * TS基本语法 

* **2023.12.19 火曜日:**
  * 样式化组件与单元测试 
  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 


* **2023.12.20 水曜日:**



* **2023.12.21 木曜日:**



* **2023.12.22 金曜日:**



* **2023.12.23 土曜日:**



* **2023.12.24 日曜日:** 




## 学习笔记

1. [Flux](https://github.com/voronianski/flux-comparison)
* Facebook Flux是用来构建客户端Web应用的应用架构。它利用单向数据流的方式来组合React中的视图组件
* Redux最主要是用作应用状态的管理。简言之，Redux用一个单独的常量状态树(state对象)保存这一整个应用的状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建(使用actions和reducers)，这样就可以进行数据追踪，实现时光旅行

2. Redux持久化存储
* store状态树的state并不是持久保存的，在浏览器端刷新之后数据会消失，需要重新获取。这个时候就需要Redux store数据的持久化
* [redux-persist插件](https://github.com/rt2zz/redux-persist): 把Redux的store中的数据缓存到浏览器的localStorage中
  1. 在store页面中引用redux-persist
      ```JavaScript
      // configureStore.js
      import { createStore } from 'redux'
      import { persistStore, persistReducer } from 'redux-persist'
      import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
      import rootReducer from './reducers'
      ```
  2. 改造store
      ```JavaScript
      const persistConfig = {
        key: 'root',
        storage,
      }

      const persistedReducer = persistReducer(persistConfig, rootReducer)

      export default () => {
        let store = createStore(persistedReducer)
        let persistor = persistStore(store)
        return { store, persistor }
      }
      ```

  3. 改造`index.js`入口文件
      ```JavaScript
      import { PersistGate } from 'redux-persist/integration/react'
      
      // ... normal setup, create store and persistor, import components etc.
      
      const App = () => {
        return (
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <RootComponent />
            </PersistGate>
          </Provider>
        );
      };
      ```

3. Immutable
* 深拷贝与浅拷贝
  * `Object.assign()`: 只是一级属性复制，比浅拷贝多拷贝了一层而已
  * `const obj1 = JSON.parse(JSON.stringify(obj))`: 数组或对象都好用的方法，但不能有undefined
* 一旦创建，就不能更改的数据，对immutable对象的任何修改或删除添加都会返回一个新的immutable对象
  * 原理是Persistent Data Structure(持久化数据结构)，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变
  * 使用了Structural Sharing(结构共享)，避免deepCopy把所有节点都复制一遍带来的性能损耗
  * 如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点
* Immutable中常用类型(`Map`, `List`)
  * `Map`:
    ```JavaScript
    import { Map } from 'immutable'
    const obj2 = Map(obj1)
    ```
  * `List`
    ```JavaScript
    import {List} from "immutable"
    const arr1 = List([1,2,3])
    const arr2 = arr1.xxx(x)
    ```
* `fromJS`: 自动分析数据并转化为`immutable`对象，而无需再分层`Map`: `state = {info:XXX({...})}`


## 内容拓展
1. JS `{}`
* 命名导出：允许导出多个具有特定名称的值。导入时需要使用花括号，并确保名称与导出时相匹配。例如，`import { createApp } from 'vue';`来导入特定的`createApp`函数
* 默认导出：只允许导出一个值，导入时可以自由命名，不需要花括号`{}`

2. JS模块规范
* JS模块化编程分了两种规范：CommonJS模块规范和ES6模块规范。
  * **CommonJS模块规范:** 每个js文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。如果要暴露给其他程序，需要以`module.exports`导出接口，以`require`引入模块
  * **ES6模块规范:** 以export指令导出接口，以import引入模块。在Node.js编程中，Node模块系统遵循的是CommonJS规范
  * 导出关键字
    > `module.exports`: 导入用require,返回模块对象本身，返回的是一个类；需要new对象之后才可以调用；可以导出所有的类型。对象，函数，字符串、数值等；`moudle.exports= [function name]`；只有node支持的导出 \
    > `exports`: 导入用require,返回的是模块函数；方法可以直接调用；`exports.[function name] = [function name]`；只有node支持的导出 \
    > `export`: 导入用import，接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同；如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名；只有es6支持的导出 \
    > `export default`: 导入用import，其他模块加载该模块时，import命令可以为该匿名函数指定任意名字；其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句，是别名的语法糖
  * 导入关键字
    > `require`: 导入exports和module.exports导出的模块；node和es6都支持的引入 \
    > `import`: 导入export、export default导出的模块；只有es6支持的引入
  * 注意：详见[链接](https://codeleading.com/article/82156125909/)
  * 总结：CommonJS规范中，建议尽量都用 module.exports 导出，然后用require导入；ES6规则中，大部分风格建议，模块中最好在末尾用一个export导出所有的接口，参考[链接](https://blog.csdn.net/LlanyW/article/details/130216645)

3. `Object.assign()`
  * 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，它将返回目标对象
  * 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝；但是对象中有对象的时候，此方法在二级属性以后就是浅拷贝
  * 如果目标对象中的属性和原对象有相同的键，则属性被源对象中的属性覆盖
  * 只会拷贝源对象自身的并且可枚举的属性到目标对象
  * 针对深拷贝，因为`Object.assign()`拷贝的是属性值，假如源对象的属性值是一个对象的引用，那么它也只指向那个引用

4. `var`, `let`和`const`
  * `var`定义的变量，没有块作用域的概念，可以跨块访问；可以在全局范围声明或函数/局部范围内声明，当在函数中声明var时，作用域是局部的；变量可以重新声明和修改；变量提升，var声明的变量会被提升到其作用域的顶部，并使用`undefined`值对其进行初始化
  * `let`声明的变量可以改变，值和类型都可以改变，没有限制；块级作用域，在作用域内有效
  * `const`声明的变量不能改变值，const一单声明变量，就必须初始化，不能留到以后赋值；块级作用域，在作用域内有效；对于复合类型的变量，如数组和对象，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心

5. JS `...`
  * 扩展运算符(spread): 把数组或类数组对象展开成一系列用逗号隔开的值；在等号右边，或者放在实参上，在赋值一方式
  * 剩余运算符(rest): 把逗号隔开的值序列组合成一个数组；在等号左边，或者放在形参上，在被赋值一方

6. JS 变量提升
  * JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行的运行，这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部

7. `JSON.parse()`: 将JSON字符串转为javascript对象


https://www.baidu.com/link?url=H53O8aPmNMQmMTnFdOoQXKs9kT_NuQRaPsC-9OELoN4ZJhzXMUaWl1VtegHIqQ29_abhLHPmeqI6u0eQIvh6oa&wd=&eqid=e981a0af005cf6a100000006657fb73b

https://blog.csdn.net/weixin_64530670/article/details/131560914

http://www.javascriptcn.com/post/600560bd81e8991b448df045


https://blog.csdn.net/weixin_44995391/article/details/131419074

https://blog.csdn.net/weixin_40247192/article/details/132162767


## 遇见问题





# 下周计划
