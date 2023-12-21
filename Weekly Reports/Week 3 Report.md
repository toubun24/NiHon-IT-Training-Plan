# Week 3 Report

## 学习内容及时长

* **2023.12.18 月曜日:** 6h35min
  * Redux持久化储存 10:00-10:30 10:55-12:50
  * *拓展补充* 17:15-17.55
  * Mobx状态管理 18:10-19:25
  * *N1单词(60个)* 21:30-22:10
  * TS基本语法 22:15-23:50

* **2023.12.19 火曜日:** 4h25min
  * *代码复现* 14:30-16:55 20:20-22:20

* **2023.12.20 水曜日:** 2h45min (回学校配眼镜和处理杂事，只在地铁上背了点单词)
  * *N1单词(150个)* 14:05-14:45 15:05-15:15 16:50-17:05
  * *代码复现* 23:40-01:20

* **2023.12.21 木曜日:** (晚饭后电脑进不了系统，最后搞下来要么是因为内存超频(手动调过小参)要么是windows的系统自动更新orz(以前也这样过))
  * *代码复现* 10:45-11:40 16:20-17:50 00:45-

* **2023.12.22 金曜日:**
  * 样式化组件与单元测试 
  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 

* **2023.12.23 土曜日:**



* **2023.12.24 日曜日:** 




## 学习笔记

1. **[Flux](https://github.com/voronianski/flux-comparison)**
* Facebook Flux是用来构建客户端Web应用的应用架构。它利用单向数据流的方式来组合React中的视图组件
* Redux最主要是用作应用状态的管理。简言之，Redux用一个单独的常量状态树(state对象)保存这一整个应用的状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建(使用actions和reducers)，这样就可以进行数据追踪，实现时光旅行

2. **Redux持久化存储**
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

3. **Immutable**
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

4. **[MobX](https://cn.mobx.js.org/)**
* 任何源自应用状态的东西都应该自动地获得。利用`getter`和`setter`来收集组件的数据依赖关系，从而在数据发生变化的时候精确知道哪些组件需要重绘，在界面的规模变大的时候，往往会有很多细粒度更新
  * Actions: 事件调用Actions，是唯一可以修改State的东西，并且可能有其它副作用，`@action onClick = () => {this.props.todo.done = true;}`
  * State: 可观察和最低限度定义的，不应包含冗余或推导数据，`@observable todos = [{title: "learn MobX", done: false}]`
  * Computed values: 可以使用pure function从State中推导出的值，会自动更新它并在其不再使用时优化掉，`@computed get completedTodos() {return this.todos.filter(todo => todo.done)}`
  * Reactions: 会对State的变化做出反应，但不产生值，而是产生副作用，像是更新UI，`const Todos = observer({todos} => <ul>todos.map(todo => <TodoView ... />)</ul>)`
* MobX与redux的区别:
  * MobX写法上更偏向于OOP
  * 对一份数据直接进行修改操作，不需要始终返回一个新的数据
  * 并非单一store，可以多store
  * Redux默认以JavaScript原生对象形式存储数据，而MobX使用可观察对象
* `observable`和`autorun`
  * `import { observable , autorun } from 'mobx'`
  * `observable`
    * 只有在它可以被制作成可观察的数据结构时才会成功。其他值，不会执行转换
    * 值可以是JS基本数据类型、引用类型、普通对象、类实例、数组和映射
    * `observable.box`创建一个`observable`的盒子，它用来存储value的`observable`引用。使用`get()`方法可以得到盒子中的当前value，而使用`set()`方法可以更新value
  * `autorun`
    * 所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发
* `action`, `runInAction`与严格模式
  * `import {observable, configure, action,runInAction} from 'mobx'`
  * `configure(options)`: 对活动的MobX实例进行全局行为设置，`configure({enforceActions:'always'})`，如果是never，可以不写action
  * `action`: 任何应用都有动作。动作是任何用来修改状态的东西，使用MobX可以在代码中显式地标记出动作所在的位置
  * `unInAction`工具函数
    * 非严格模式下，store数据操作可以不用runInAction包裹
    * 严格模式下，异步数据操作需要用runInAction包裹：`setTimeout(() => runInAction(() => ...), 1000)`
* mobx-react
  * React组件里使用`@observer`：`observer`函数/装饰器可以用来将React组件转变成响应式组件
  * 可观察的局部组件状态：`@observable`装饰器在React组件上引入可观察属性。而不需要通过React的冗长和强制性的`setState`机制来管理
  1. 创建`.babelrc`
  2. 创建`config-overrides.js`
  3. 修改`package.json`
  4. `import {observable, configure, action,runInAction} from 'mobx' // store.jsx`
  5. `import {inject,observer} from "mobx-react"; // App.jsx`
  * `inject`(mobx-react包): 相当于Provider 的高阶组件。可以用来从 React 的context中挑选 store 作为 prop 传递给目标组件
  * `observer`: 可以用作包裹React组件的高阶组件。在组件的`render`函数中的任何已使用的`observable`发生变化时，组件都会自动重新渲染

5. **TS基本语法**
* 声明文件：`npm i --save @types/{依赖包名称} //编译器需要通过这个声明文件，进行类型检查工作`




























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

8. immutable.js `toJS()`
* 用于将不可变的Map或List对象转换成JavaScript普通对象或数组。这对于数据从immutable.js向其他API迁移非常有用。我们只需使用toJS方法将不可变数据转换为普通JavaScript对象后，即可将其传递给其他API，以与现有的代码或其他JavaScript库无缝集成，而不需要担心类型出错或不一致的问题
* 递归地将一个(observable)对象转换为javascript结构。 支持observable数组、对象、映射和原始类型。 计算值和其他不可枚举的属性不会成为结果的一部分。 默认情况下可以正确支持检测到的循环，但也可以禁用它来获得性能上的提升
* toJS 接收两个选项
  > `exportMapsAsObjects`: 是否将observable映射序列化为对象(true)或JavaScript Map对象(false)。默认为true \
  > `detectCycles`: 如果检测到循环，则重新使用已经序列化的对象。这可以防止无限递归。默认为true

9. JS数组常用方法及[示例](https://blog.csdn.net/weixin_64530670/article/details/131560914)
    > `push()`: 在数组最后添加一个或者多个新元素，并且返回新数组的长度 \
    > `pop()`: 删除数组最后一个元素，并返回数组末尾删除元素\
    > `unshift()`: 在数组前面添加一个或多个元素，并返回新元素的长度\
    > `shift()`: 删除数组首部元素，并返回被删除的元素\
    > `splice()`: 对数组进行删除和修改操作，返回被删除元素组成的数组\
    > `slice()`: 剪切(截取)数组，并返回一个包含剪切值的新数组，不会改变原数组，也可以截取字符串；负参数会将负的参数加上字符串的长度\
    > `concat()`: 合并两个或多个数组，返回新数组，不会改变原数组\
    > `join()`: 将数组转化为字符串，不会改变原有数组，此方法会返回转换后的字符串，默认以','分隔，会改变原数组\
    > `revres()`: 颠倒数组元素，会改变原数组\
    > `indexOf()`: 返回数组元素首次在数组中出现的索引，没找到返回-1\
    > `sort()`: 对数组进行排序，a-b从小到大排序，b-a从大到小\
    > `filter()`: 返回数组中满足条件的元素组成新数组，元素只能做布尔类型判断，不会改变原数组组\
    > `map()`: 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成，可以做运算，不能过滤原素组元素，不会改变原数组\
    > `every()`: 用于判断数组中的元素是否都满足条件，当每个元素都满足条件时，返回ture，否则false，不会改变原数组\
    > `some()`: 判断数组是否至少有一个满足条件，一旦找到一个就立即停止并返回true，否则false，不会改变原数组；当some的数组为空时返回false，当every的数组为空时返回true；every只要有一个失败就返回失败，some只要有一个成功就返回成功\
    > `forEach()`: 遍历整个数组，中途不能用break中断\
    > `reduce()`: 给数组做四则运算，第二个参数一般设为0，不会改变原数组\
    > `includes()`: 判断数组中是否存在，若存在返回true，不存在即返回false\
    > `findIndex()`: 返回传入一个测试条件(函数)符合条件的数组第一个元素位置。如果没有符合条件的元素返回-1\
    > `form()`: 伪数组转换成真数组\
    > `split('分隔符')`: 把字符串转换为数组，使用和join方法相反\
    > `字符串.substring(开始下标，结束下标)`: 返回被截取的字符串，不包含结束下标对应的字符；不写结束下标，即从开始截取到字符串结尾

10. 字符串截取的方法`slice()`, `substring()`, `substr()`
* 相同点：三者皆返回一个新字符串，原字符串不做改变；传入一个正参数时，三者返回的字符串相同，返回的新字符串都是从参数位置到原字符串长度位置的
* 传入两个正参数时，`slice()`和`substring()`返回的字符串相同，第二个参数都表示结束位置，但`substr()`的表示字符串的个数
* `substring()`不接受负参数，若传入负参数,将被转换成0
* `substr()`传入一个负参数时，与slice()相同,转换成参数+字符串长度
* `substr()`传入两个负参数时，与substring()相同，转换成0。但`substring()`会将参数从小到大排序，`substr()`不会
* 截取字符串的后几位之前的字符串`slice()``substring()`括号内的第二个参数为`str.length`(需要几位数就写几)

11. `immutable-list`不可变操作
    > `push`: 在列表末尾插入一个元素 \
    > `pop`: 弹出列表末尾的元素 \
    > `shift`: 移除列表的第一个元素 \
    > `unshift`: 在列表的开头插入一个元素 \
    > `update`: 用给定的值更新列表中的某个元素 \
    > `splice`: 移除并/或插入列表中的元素 \
    > `concat`: 将另一个列表附加到当前列表的末尾 \
    > `slice`: 返回一个包含指定元素的新列表 \
    > `filter`: 返回一个包含指定条件的元素的新列表 \
    > `map`: 将每个元素映射到一个新的值并返回一个新列表 \
    > `reduce`: 依次将列表元素应用于 reducer 并返回单个值

12. 引用赋值、浅拷贝和深拷贝
* 引用赋值：将一个对象赋值给另一个变量时，实际上是将对象的引用地址赋值给了另一个变量，即两个变量指向同一块内存地址的对象。这意味着，对其中一个变量所指向的对象进行修改，另一个变量也会受到影响
* 浅拷贝：复制对象时，只复制对象中的基本类型属性和对象引用地址，而不复制对象的子对象或数组的引用地址。这样，当对复制后的对象进行修改时，不会影响原始对象，但如果原始对象中包含的子对象或数组的引用地址发生改变，复制后的对象和原始对象都会受到影响
* 深拷贝：复制对象时，完整复制对象中的所有属性和子属性，包括嵌套对象和数组。这样，当对复制后的对象进行修改时，不会影响原始对象和原始对象中的子对象或数组

13. Set, Map, Object比较及转化
* set
  * 类似于数组，但成员值是唯一的，没有重复的(可以接受一个数组作为参数，进行初始化)
  * 本身是一个构造函数(要new)，用来生成Set数据结构
  * Set对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用
  * 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值
* Object
  * 本质上是键值对的集合(Hash结构)
  * 只能用字符串当作键
* map
  * 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值(包括对象）都可以当作键
  * 本身是一个构造函数(要new)，接受数组作为参数(原理上`Array.forEach`)
  * 如果对同一个键多次赋值，后面的值将覆盖前面的值，如果读取一个未知的键，则返回undefined
  * Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
  * 继承自Object

14. JS 定义
* class：定义类
* interface：定义接口
* extends：类继承类或者接口继承接口
* implements：类实现接口
* throws：方法需要往上抛出异常
* 注意：上面的哪个地方加s哪个地方不加都是有讲究的，比如class和interface都是单个类和接口的定义，所以不加s；而extends可能考虑到接口是多继承，因此加了s，虽然类是单继承，可能为了方便，所以没有做两份；由于类是多实现，所以加了s；由于可以抛出多个异常，异常中间用逗号`,`隔开

15. JS Class `implements`和`extends`
* 相同点：两者都可以实现父类，减少代码，而且面向对象特征
* 区别：`implements`实现父类，子类不可以覆盖父类的方法或者变量。即使子类定义与父类相同的变量或者函数，也会被父类取代掉；`extends`可以实现父类，也可以调用父类初始化`this.parent()`。而且会覆盖父类定义的变量或者函数。这样的好处是：架构师定义好接口，让工程师实现就可以了

16. TS断言
* `as`: `let 变量 = 值 as 类型`
* `!`: 非空断言

17. `typeof`和`keyof`
* `typeof`: 用来获取变量或属性类型，`type 变量 = typeof 常量`
* `keyof`: 获取对象类型的属性名 , 得到新的类型，`type 类型 = keyof 类型/对象常量`

18. 泛型
* 泛型函数：`function 函数名<类型参数> (形参:类型参数):类型参数{}`
* 默认情况下，泛型函数的类型变量可以代表多个类型，这导致在泛型函数内部无法访问任何属性
* 泛型约束
  * 指定更加具体的类型
  * 添加约束
* 泛型接口
  * 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量
  * 使用泛型接口时，需要显式指定具体的类型
* 泛型工具类型
 > `Partial`: 把已有的类型属性,变成一个新类型的可选属性，`type 新类型 = partial<老类型>` \
 > `Readonly`: 把已有类型全部转换为只读类型，`type 新类型 = Readonly<老类型>` \
 > `Pick`: 从已有类型中选一些属性来构造新的类型，`type 新类型 = partial<老类型,属性|属性2>`

19. Git
* `git status`: 查看工作区代码相对于暂存区的差别
* `git add .`: 将当前目录下修改的所有代码从工作区添加到暂存区`.`代表当前目录
* `git commit -m`: ‘注释’ 将缓存区内容添加到本地仓库
* `git pull origin master`: 先将远程仓库master中的信息同步到本地仓库master中
* `git push origin master`: 将本地版本库推送到远程服务器
* `origin`:是远程主机，`master`表示是远程服务器上的master分支和本地分支重名的简写，分支名是可以修改的

20. `<script type="text/...">`
* `text/babel`: 将React语句写在script标签中，且babel类型会将其中的jsx语法翻译为js语法；其中，创建虚拟DOM，并将其渲染到前述对应的div中
* `text/javascript`: React-JS语法(也就不再需要引入`<script src="./js/babel.min.js"></script>`)

21. `instanceof`: 是Java的保留关键字。它的作用是测试它左边的对象是否是它右边的类的实例，返回`boolean`的数据类型

22. VSCode插件Live Server: HTML代码页右键运行

23. `<span>`
* 用于对文档中的行内元素进行组合
* 没有固定的格式表现。当对它应用样式时，它才会产生视觉上的变化。如果不对其应用样式，那么元素中的文本与其他文本不会任何视觉上的差异
* 提供了一种将文本的一部分或者文档的一部分独立出来的方式

24. `super(props)`
* 在JavaScript中，`super`指的是父类构造函数(在我们的示例中，它指向`React.Component`实现)
* 在调用父构造函数之前，不能在构造函数中使用`this`
* 即使你没有使用`props`参数调用`super`，你仍然可以在`render`和其他方法中访问`this.props`，在调用构造函数后，React也会在实例上分配`props`

25. `bind(this)`
* JavaScript函数中的`this`不是在函数声明的时候定义的，而是在函数调用(即运行)的时候定义的；谁调用这个函数，`this`就指向谁
* `bind`方法会**创建一个新函数**，称为绑定函数。当调用这个绑定函数时，绑定函数会以创建它时传入`bind`方法的第一个参数作为`this`，传入`bind`方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数
* 箭头函数不需要绑定，箭头函数的`this`是继承父级的`this`
* 简单暴力的方法：在所有生命周期函数上都用普通函数，即绑定`this`的函数，其他所有函数全部用箭头函数。因为实际上React主动调用的是生命周期函数，然后再在里面调用自定义函数，这些可以自动绑定到`this`

26. React构造函数
* 在 React 中，构造函数仅用于以下两种情况：1. 通过给`this.state`赋值对象来初始化内部`State`；2. 为事件处理函数绑定实例
* 如果不初始化`State`或不进行方法绑定，则不需要为React组件实现构造函数
* 在`constructor()`函数中不要调用`setState()`方法。如果你的组件需要使用内部`State`，请直接在构造函数中为`this.state`赋值初始`State`
* 只能在构造函数中直接为`this.state`赋值。如需在其他方法中赋值，你应使用`this.setState()`替代

27. 箭头函数：箭头函数中的this指向组件的实例，而不是undefined，因此不需要使用bind()来绑定this

28. `console`
https://zhuanlan.zhihu.com/p/631616556

29. refs回调形式
* `<input ref={(a)=>{console.log(a)}} type="text" placeholder="点击按钮提示数据"/>`: 参数a就是本dom节点，就是这个input框当作参数传入了ref。因为箭头函数并没有自己的this，它会把外层render函数的this作为自己的this，而reander函数的this指向组件构造的实例，所以本箭头函数就能和实例相关联，此ref所处的dom节点挂载到实例上并且取名为“input1”
* `ref={c => this.input1 = c}`: 结合箭头函数的特性，只有一个参数，那么可以省略参数的小括号，函数体也就一句，也可以省略箭头函数右侧花括号。所以ref这样精简
* 事件函数会发生改变。原来是`const {input2} = this.refs`，而现在是`const {input2} = this`，因为此`ref`所处的dom节点挂载到实例上，所以直接写`this`即可
* 如果`ref`回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数null，然后第二次会传入参数DOM元素。这是因为在每次渲染时会创建一个新的函数实例，所以React清空旧的`ref`并且设置新的。通过将`ref`的回调函数定义成`class`的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。注意，我们上面所写代码，将ref回调函数写在input标签内，这就是以内联函数的方式定义ref回调函数，符合官网的说明。但是，在更新过程中才会被执行两次，一次null一次传入参数dom元素，第一次执行render渲染dom是初始化，并非更新

## 遇见问题

1. 复习并复现代码时注意到了很多以前没想过的细节，比如箭头函数(拓展27)与bind(this)之间的用法关系，一开始只按课件说的像是构造函数里面就bind(this)，或者外面自定义方法就箭头函数，但其实这两者是可以互相转换的，但这个理解是通过代码复现`06_02_State简化.html`时自己尝试了3种不同的`onClick`调用来验证的，加深了对这些细节的理解，以后才能灵活运用，而不是死套模板只敢照着写也不去想为什么这里只能这样写

2.
  ```JavaScript
  const p = {name:'老刘',age:18,sex:'女'}
  console.log('@', p,'@'); // @ {name: '老刘', age: 18, sex: '女'} @
  console.log('@', ...p,'@'); // @ @
  ```
`06_03_props.html`中，拓展运算符不知道为什么无法在控制台进行输出

# 下周计划
