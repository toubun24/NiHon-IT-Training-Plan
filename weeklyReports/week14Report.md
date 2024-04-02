# Week 14 Report

## 学习内容及时长

* **2024.03.18 月曜日:** 3h57min
  * reactGTS-全局变量 19:45-22:30 00:48-01:06 03:18-04:12
  * reactGTS-窗口滚动条 \

* **2023.03.21 木曜日:** 2h11min
  * reactGTS-id权限控制 18:15-19:17 23:02-23:38
  * reactGTS-主题色 23:38-00:11

* **2023.03.22 金曜日:** 5h8min
  * reactGTS-登录界面 18:17-19:15
  * reactGTS-五星好评 21:00-22:17
  * reactGTS-报告 22:17-01:10

* **2023.03.23 土曜日:** 4h58min
  * Vue-简介 18:20-18:32
  * Vue-helloWorld 18:32-18:50
  * Vue-模板语法 18:50-19:02
  * Vue-数据绑定 19:02-19:15
  * Vue-el和data的两种写法 19:15-19:24
  * Vue-mvvm模型的理解 19:24-19:34
  * Vue-数据代理 19:34-19:50
  * Vue-事件处理 21:30-21:49
  * Vue-事件修饰符 21:49-22:10
  * Vue-键盘事件 22:30-22:34
  * Vue-姓名案例method实现 22:34-22:45
  * Vue-姓名案例计算属性 22:45-22:50 23:00-23:08
  * Vue-监视属性 23:08-23:48
  * Vue-样式绑定 00:30-00:41
  * Vue-条件渲染 00:41-00:48
  * Vue-基本列表 00:48-01:08
  * Vue-列表过滤 01:08-01:30
  * Vue-列表排序 03:30-03:45
  * Vue-set的使用 03:45-04:10

* **2023.03.24 日曜日:** 3h3min
  * Vue-数据监测 17:40-17:54
  * Vue-表单数据收集 17:54-18:05
  * Vue-过滤器 18:05-18:15
  * Vue-内置指令 18:15-18:31
  * Vue-自定义指令 18:31-18:40
  * Vue-生命周期 21:10-21:29
  * Vue-组件的使用 21:29-21:55 22:05-22:18
  * Vue-脚手架HelloWorld 22:18-22:50 03:24-03:45
  * Vue-props传参数
  * Vue-mixin
  * Vue-todoList基本实现
  * Vue-自定义事件
  * 整理报告 03:12-03:24

## 学习笔记
### Vue的特点
* 组件化模式：一个Vue文件含有html，css和js，相互组件独立
* 申明式编码：v-for="p in persons"
* 虚拟dom和diff算法，复用dom节点

### 创建vue实例对象
* 一个vue实例不可能去接管多个容器，如果有多个容器的情况，vue事例永远只接管第一个容器
* 不能多个vue实例同时来接管同一个容器，如果有多个的情况下永远是第一个vue实例来接管该容器
* vue实例与容器直接的对应关系是一对一的

### 模板语法
* 插值语法：一般用在标签体的值`{{}}`
* 指令语法：用于解析标签(标签体,标签属性, 绑定事件)上，类似于`v-bind`(还可以简写为`:`)

### 数据绑定
* **单向绑定(v-bind)：**数据只能从data流向页面
* **双向绑定(v-model)：**数据不仅能从data流向页面，还可以从页面流向data
  * 双向绑定一般都应用在表单类元素上（如：`input`、`select`等）
  * `v-model`:value可以简写为v-model，因为v-model默认收集的就是value值

### el和data的两种写法
* el的两种写法
```js
const v = new Vue({
  el: '#root',
  data: {
    name: 'Tokyo'
  }
});
```
```js
setTimeout(() => {
  v.$mount('#root');
}, 3000)
```
* data的两种写法
```js
data: {
  name: ' Tokyo'
}
```
```js
data: () => { // 尽量不要写成箭头函数
  console.log('@@@', this); //此时this是Window
  return {
    name: 'Tokyo'
  }
}
```
```js
data() {
  console.log('@@@', this); //此时this是Vue
  return {
    name: 'Tokyo'
  }
}
```

### MVVM模型
* **M**：模型(Model)：data中的数据
* **V**：视图(View)：模板代码
* **VM**：视图模型(ViewModel)：Vue实例
data中所有的属性，最后都出现在了vm身上
vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用

### 数据代理
* 通过vm对象来代理data对象中属性的操作（读/写），更加方便的操作data中的数据
* 基本原理：通过Object.defineProperty()把data对象中所有属性添加到vm上。为每一个添加到vm上的属性，都指定一个getter/setter。在getter/setter内部去操作（读/写）data中对应的属性。
```js
Object.defineProperty(person,'age', {
  value: 18,
  enumerable: true, //此时代表这个属性是可以枚举的
  writable: true, //代表可以重写该属性(控制属性是否被修改)
  configurable:true, //控制属性是否可以被删除 默认为false

  //当读取person的age属性时get属性就会被调用，且返回值就是age的值
  //invoke property proxy映射数据代理
  get: function () {
    //测试它的调用情况
    console.log('@@@ GET AGE');
    //此时age的值依赖number的值
    return number
  },
  //当修改person的age属性时set(setter)属性就会被调用，且会收到修改的具体值
  set(v) {
    //测试
    console.log('CHANGE AGE');
    number=v;
  }
});
```

### 事件处理
* 使用v-on:xxx或@xxx绑定事件，其中xxx是事件名；
* 事件的回调需要配置在methods对象中，最终会在vm上；
* methods中配置的函数，不要用箭头函数！否则this就不是vm了；
* methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象；
* `@click="demo"`和`@click="demo($event)"`效果一致，但后者可以传参；  

### 事件修饰符
* `prevent`：阻止默认事件（常用）；
* `stop`：阻止事件冒泡（常用）；
* `once`：事件只触发一次（常用）；
* `capture`：使用事件的捕获模式；
* `self`：只有event.target是当前操作的元素时才触发事件；
* `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕；

### 计算属性computed
* get的作用，当读取fullName时get就会被调用，且返回值就做为fullName的值
* defineProperty
* 注意vm._data是不存在计算属性的
* 计算属性算完之后直接丢到了viewModel实例对象身上
* get的调用时机
  * 初次读取计算属性时
  * 所依赖的数据(data中的属性)发生变化时，不改变的话直接读缓存
  * methods没有缓存，读几次就调用几次无论要用的数据是否发生变化
* set的调用时机
  * 当fullName被修改时

### 监视属性watch
* 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
* 监视的属性必须存在，才能进行监视！！
* 监视的两种写法：
  1. `new Vue`时传入`watch`配置
  ```js
  const vm = new Vue({
      watch:{
          isHot:{ // isHot
              immediate: true,
              handler(newValue, preValue){
                  console.log(newValue,preValue);
              }
          }
      }
  });
  ```
  2. 通过`vm.$watch`监视
  ```js
  vm.$watch('isHot', { // 'isHot'
      immediate: true,
      handler(newValue, preValue) {
          console.log(newValue,preValue);
      }
  });
  ```
* 深度监视：
  * Vue中的watch默认不监测对象内部值的改变（一层）。
  * 配置`deep:true`可以监测对象内部值改变（多层）。
  * Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以(想让它可以则配置`deep:true`)！
  * 使用watch时根据数据的具体结构，决定是否采用深度监视。
* 监视简写形式：
  1. `new Vue`时传入`watch`配置
  ```js
  const vm = new Vue({
      watch:{
          isHot(newValue, preValue){
              console.log(newValue,preValue);
          }
      }
  });
  ```
  2. 通过`vm.$watch`监视
  ```js
  vm.$watch('isHot', function (newValue, preValue) {
      //this === vm
      console.log(newValue, preValue);
  })
  ```

### 绑定样式
* class样式
  * 写法:`class="xxx"` xxx可以是字符串、对象、数组。
    * **字符串写法**适用于：类名不确定，要动态获取。
    * **对象写法**适用于：要绑定多个样式，个数不确定，名字也不确定。
    * **数组写法**适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
* style样式
  * `:style="{fontSize: xxx}"`其中xxx是动态值。
  * `:style="[a,b]"`其中a、b是样式对象。

### 条件渲染
* v-if
  * 写法：
    * `v-if="表达式"`
    * `v-else-if="表达式"`
    * `v-else="表达式"`
  * 适用于：切换频率较低的场景。
  * 特点：不展示的DOM元素直接被移除。
  * 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
* v-show
  * 写法：v-show="表达式"
  * 适用于：切换频率较高的场景。
  * 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
* 使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
* 建议与`<template>`配合使用

### 基本列表
* v-for指令:
  * 用于展示列表数据
  * 语法：`v-for="(item, index) in xxx" :key="yyy"`，注意其中的`index`可能出问题
  * 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）


### react、vue中的key有什么作用？（key的内部原理）
1. 虚拟DOM中key的作用：
  key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
  随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
2. 对比规则：
  1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
    1. 若虚拟DOM中内容没变, 直接使用之前的真实DOM！
    2. 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
  2. 旧虚拟DOM中未找到与新虚拟DOM相同的key
    创建新的真实DOM，随后渲染到到页面。
3. 用index作为key可能会引发的问题：
  1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
    会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
  2. 如果结构中还包含输入类的DOM：
    会产生错误DOM更新 ==> 界面有问题。
4. 开发中如何选择key?:
  1. 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
  2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
            使用index作为key是没有问题的。

### 列表过滤
* 实现方式：
  * 计算属性：
  ```js
  data: {
      // ...
  }
  computed:{
      filPersons(){
          return this.persons.filter(p => p.name.indexOf(this.keyword) !== -1); // getter简写
      }
  }
  ```
  * 监视属性：
  ```js
  data: {
      // ...
      filPersons: [] // 搜索结果数组，写全则不需要immediate: true
  }
  watch: {
      keyword: {
          immediate: true, //上来就进行监视获得到的newV是''
          handler(newV) {
              this.filPersons = this.persons.filter(p => p.name.indexOf(newV) !== -1);
          }
      }
  }
  ```

### Vue监视数据的原理：
* vue会监视data中所有层次的数据。
* 通过`setter`实现监视，且要在`new Vue`时就传入要监测的数据。
  * 对象中后追加的属性，Vue默认不做响应式处理
  * 如需给后添加的属性做响应式，请使用如下API：
    * `Vue.set(target，propertyName/index，value)`或
    * `vm.$set(target，propertyName/index，value)`
* 如何监测数组中的数据？
  * 通过包裹数组更新元素的方法实现，本质就是做了两件事：
    * 调用原生对应的方法对数组进行更新。
    * 重新解析模板，进而更新页面。
* 在Vue修改数组中的某个元素一定要用如下方法：
  * 使用这些API:`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`
  * `Vue.set()` 或 `vm.$set()`
* 特别注意：`Vue.set()` 和 `vm.$set()` 不能给vm或vm的根数据对象添加属性！！！
  * 注: 数据劫持可以理解成为vue对你写在data的数据会进行加工，让它们都变成响应式的

### 常用的生命周期钩子：
* `mounted`: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
* `beforeDestroy`: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
* 关于销毁Vue实例
  * 销毁后借助Vue开发者工具看不到任何信息。
  * 销毁后自定义事件会失效，但原生DOM事件依然有效。(click之类的原生事件依然会被调用)
  * 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

### Vue中使用组件的三大步骤：
* 定义组件(创建组件)
  * 使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
  * 区别如下：
	  * el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
    * data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
  * 备注：使用template可以配置组件结构。
* 注册组件
  * 局部注册：靠new Vue的时候传入components选项
  ```js
  new Vue({
      el: "#root",
      data: {},
      components: {
          school,
          student
      },
  })
  ```
  * 全局注册：靠`Vue.component('组件名',组件)`
* 使用组件(写组件标签)
  * `<school></school>`

### Vue中使用组件的几个注意点：
* 关于组件名:
  * 一个单词组成：
    * 第一种写法(首字母小写)：school
    * 第二种写法(首字母大写)：School
  * 多个单词组成：
    * 第一种写法(kebab-case命名)：my-school
    * 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
    * 备注：
    * 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
    * 可以使用name配置项指定组件在开发者工具中呈现的名字。
* 关于组件标签:
  * 第一种写法：`<school></school>`
  * 第二种写法：`<school/>`
  * 备注：不用使用脚手架时，`<school/>`会导致后续组件不能渲染。
* 一个简写方式：
  * `const school = Vue.extend(options)`可简写为：`const school = options`

### 关于VueComponent：
* school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
* 我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
  * 即Vue帮我们执行的：new VueComponent(options)。
* 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！注意这一点很重要
* 关于`this`指向：
  * 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【**VueComponent实例对象**】(它的原型对象是**Vue实例对象**)。不允许指定`el`。
  * `new Vue(options)`配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【**Vue实例对象**】。允许指定`el`。
* VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
  * Vue的实例对象，以后简称vm。 vm管理着一个又一个vc，vc可以再
* 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
  * 所以vm与vc属性配置并不是一模一样，尽管vc底层复用了很多vm的逻辑
* 一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype === vm.__proto__`
* 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

### 收集表单数据：
  * 若：`<input type="text"/>`，则v-model收集的是value值，用户输入的就是value值。
  * 若：`<input type="radio"/>`，则v-model收集的是value值，且要给标签配置value值。
  * 若：`<input type="checkbox"/>`
* 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
* 配置input的value属性:
  * v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
  * v-model的初始值是数组，那么收集的的就是value组成的数组
* 备注：v-model的三个修饰符：
  * `lazy`：失去焦点再收集数据
  * `number`：输入字符串转为有效的数字
  * `trim`：输入首尾空格过滤

### 过滤器：
* 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
* 语法：
  * 注册过滤器：`Vue.filter(name,callback)` 或 `new Vue{filters:{}}`
  * 使用过滤器：`{{ xxx | 过滤器名}}`或`v-bind:属性 = "xxx | 过滤器名"`
* 备注：
  * 过滤器也可以接收额外参数、多个过滤器也可以串联
  * 并没有改变原本的数据, 是产生新的对应的数据

### 内置指令
* 学过的指令：
  * `v-bind`	: 单向绑定解析表达式, 可简写为 :xxx
  * `v-model`	: 双向数据绑定
  * `v-for`  	: 遍历数组/对象/字符串
  * `v-on`   	: 绑定事件监听, 可简写为@
  * `v-if`  	: 条件渲染（动态控制节点是否存存在）
  * `v-else` 	: 条件渲染（动态控制节点是否存存在）
  * `v-show` 	: 条件渲染 (动态控制节点是否展示)
* `v-text`指令：
  * 作用：向其所在的节点中渲染文本内容。 (纯文本渲染)
  * 与插值语法的区别：`v-text`会替换掉节点中的内容，`{{xx}}`则不会。这里有点不太灵活
* `v-html`指令：
  * 作用：向指定节点中渲染包含html结构的内容。
  * 与插值语法的区别：
	  * `v-html`会替换掉节点中所有的内容，`{{xx}}`则不会。
	  * `v-html`可以识别html结构。
  * 严重注意：`v-html`有安全性问题！！！！
	  * 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
	  * 一定要在可信的内容上使用`v-html`，永不要用在用户提交的内容上！
* `v-cloak`指令（没有值）：
  * 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性。
  * 使用css配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`的问题。
  * `<style>[v-cloak]{display: none;}</style> <h2 v-cloak>{{name}}</h2>`
* `v-once`指令：
  * `v-once`所在节点在初次动态渲染后，就视为静态内容了。
  * 以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能。
* `v-pre`指令：
  * 跳过其所在节点的编译过程。
  * 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

### 自定义指令总结：
* 定义语法：
  * 局部指令：
    * `new Vue({directives:{指令名:配置对象} })`或`new Vue({directives: {指令名:回调函数}})`
  * 全局指令：
    * `Vue.directive(指令名,配置对象)`或`Vue.directive(指令名,回调函数)`
* 配置对象中常用的3个回调：
  * `bind`：指令与元素成功绑定时调用。
  * `inserted`：指令所在元素被插入页面时调用。
  * `update`：指令所在模板结构被重新解析时调用。
* 备注：
  * 指令定义时不加`v-`，但使用时要加`v-`；
  * 指令名如果是多个单词，要使用`kebab-case`命名方式，不要用`camelCase`命名。

## 内容拓展
### redux持久化存储和localStorage持久化存储有什么区别，各自优劣
Redux持久化存储和localStorage持久化存储是两种不同的数据持久化方法，它们之间存在一些关键的区别以及各自的优劣。

Redux持久化存储：

Redux是一个用于JavaScript应用程序的可预测状态容器。其核心思想是通过将应用的状态存储在一个单一的JavaScript对象中，并使用纯函数来修改状态，从而实现可预测性和可维护性。然而，Redux默认并不提供数据持久化的功能，即当应用重新加载或刷新时，之前存储在Redux中的状态会丢失。因此，Redux持久化中间件被开发出来，用于将Redux的状态自动持久化到本地存储中，如浏览器的localStorage或sessionStorage。这样，即使在应用重新加载或刷新后，状态也能被恢复。

优势：

* **状态管理**：Redux提供了强大的全局状态管理能力，使得状态在不同组件间共享变得简单。
* **可预测性**：通过纯函数来修改状态，确保了状态变化的可预测性。
* **灵活性**：Redux持久化中间件可以与各种存储介质配合使用，提供更大的灵活性。

劣势：

* **学习曲线**：Redux及其持久化中间件可能需要一定的学习成本，特别是对于初学者来说。
* **性能开销**：由于需要将状态持久化到存储介质中，可能会引入一定的性能开销。

localStorage持久化存储：

localStorage是Web上的一种本地存储技术，用于在客户端浏览器上永久存储数据。除非用户手动删除相关数据，否则数据会一直存在。它的生命周期是永久的，并且相同域名下的localStorage是共享的，可以读取、清除和覆盖。然而，它仅限于同一浏览器和同源文件，不同浏览器之间不能共享数据。

优势：

* **简单性**：localStorage的API相对简单，易于理解和使用。
* **持久性**：数据存储在本地，除非手动删除，否则会一直存在。
* **共享性**：相同域名下的不同页面或标签页可以共享localStorage中的数据。

劣势：

* **安全性**：localStorage中的数据可以被用户或其他脚本访问和修改，因此可能存在安全隐患。
* **存储限制**：localStorage的存储空间有限，如果存储过多数据可能会影响性能。
* **同源策略**：localStorage受限于同源策略，不同域名下的页面不能共享数据。

综上所述，Redux持久化存储和localStorage持久化存储各有其优缺点。Redux持久化存储更适合于需要全局状态管理和可预测性的场景，而localStorage持久化存储则更适合于简单的数据持久化需求。在选择使用哪种方法时，需要根据具体的应用场景和需求进行权衡。

### `indexOf`
```js
p => p.name.indexOf(this.keyword) !== -1
```
返回指定值在字符串中首次出现的索引，如果未找到该值，则返回`-1`。这里，它检查`this.keyword`（即用户在输入框中输入的关键字）在当前人员名字中的位置。这个条件判断当前人员名字中是否包含用户输入的关键字。如果包含，`indexOf`会返回一个非`-1`的索引值，这个条件就为`true`，否则为`false`
```js
const arr = this.persons.filter(p => p.name.indexOf(this.keyword) !== -1)
```
这行代码的作用是：从`this.persons`数组中过滤出那些名字中包含`this.keyword`（用户输入的关键字）的人员，并将这些人员放入一个新的数组`arr`中

### 数据更新问题
`this.persons.splice(1, 1, { id: '002', name: '马老师', age: 50, sex: '男' });`

这行代码使用了数组的 `splice()` 方法，该方法用于向数组添加/删除项目，然后返回被删除的项目。在这个具体的例子中，`splice()` 方法做了以下事情：

1. **1**: 第一个参数是开始位置，表示从数组的哪个位置开始操作。在这里，它是 `1`，意味着从数组的第二个元素开始（数组索引从 `0` 开始）。

2. **1**: 第二个参数是要删除的元素数量。在这里，它是 `1`，表示从指定的开始位置删除一个元素。

3. **{ id: '002', name: '马老师', age: 50, sex: '男' }**: 这是第三个及之后的参数，表示要添加到数组中的新元素。在这个例子中，添加了一个新的人员对象。

所以，这行代码的作用是在 `this.persons` 数组的第二个位置（索引为 `1`）删除一个元素，并在相同位置添加一个新的人员对象 `{ id: '002', name: '马老师', age: 50, sex: '男' }`。

需要注意的是，如果原始数组在索引 `1` 的位置已经有一个元素，那么该元素会被删除，并替换为新的人员对象。如果原始数组在索引 `1` 的位置没有元素（例如，数组只有一个元素或者为空），那么新的人员对象会被添加到那个位置。

此外，由于 `splice()` 方法直接修改了原数组，所以 `this.persons` 数组现在包含了新添加的人员对象，并且可能不再包含之前位于索引 `1` 的元素。

还有一点需要注意，新添加的人员对象的 `id` 与原数组中可能已存在的某个对象的 `id` 相同（都是 `'002'`）。如果 `id` 是用于唯一标识数组中每个对象的，那么这可能是一个问题，因为它可能导致数据不一致或混淆。在实际应用中，通常应该确保 `id` 的唯一性。

`this.persons[1] = { id: '002', name: '马老师', age: 50, sex:'男' };`

但这样是不行的，无法实现更新

### 箭头函数this
箭头函数（Arrow Functions）在JavaScript中提供了一种更简洁的函数语法。箭头函数的一个关键特性是它不绑定自己的 `this` 值，而是捕获其所在上下文的 `this` 值，作为自己的 `this` 值。这意味着，在箭头函数内部使用的 `this`，实际上是在定义箭头函数时所在的外部作用域的 `this`。

这种特性使得箭头函数在处理回调函数、事件处理器、定时器等方面非常有用，尤其是当你想保持 `this` 指向不变时。

下面是一个具体的例子来说明这个特性：


```javascript
function OuterFunction() {
  this.value = "I am from OuterFunction";

  // 常规函数
  this.normalFunction = function() {
    console.log(this.value); // 输出 "I am from OuterFunction"
  };

  // 箭头函数
  this.arrowFunction = () => {
    console.log(this.value); // 输出 "I am from OuterFunction"
  };
}

const outer = new OuterFunction();

outer.normalFunction(); // 输出 "I am from OuterFunction"
outer.arrowFunction(); // 输出 "I am from OuterFunction"

// 更改全局的 this 指向（在浏览器环境中通常是 window 对象）
const anotherValue = "I am from global scope";
globalThis.value = anotherValue; // 使用 globalThis 以兼容不同的环境（如浏览器和 Node.js）

// 使用 setTimeout 来模拟异步调用，这样可以看到 this 的指向在函数执行时是如何的
setTimeout(outer.normalFunction, 0); // 输出 "I am from global scope"，因为 normalFunction 的 this 在执行时指向了 globalThis（或 window）
setTimeout(outer.arrowFunction, 0); // 输出 "I am from OuterFunction"，因为 arrowFunction 的 this 是在定义时捕获的，指向 OuterFunction 的实例
```
在这个例子中，`OuterFunction` 有一个常规函数 `normalFunction` 和一个箭头函数 `arrowFunction`。当这两个函数被调用时，它们都试图访问 `this.value`。对于 `normalFunction`，它的 `this` 在执行时指向了全局对象（在浏览器中是 `window`），因此它输出了全局作用域中的 `value` 值。然而，对于 `arrowFunction`，它的 `this` 是在定义时捕获的，指向 `OuterFunction` 的实例，因此它输出了 `OuterFunction` 实例中的 `value` 值。

这个特性使得箭头函数在处理 `this` 指向方面更加直观和可预测，尤其是在处理回调函数和事件处理器时。不过，也需要注意，由于箭头函数不绑定自己的 `this`，它们也不能用作构造函数（即不能使用 `new` 关键字来调用）。

### `VueComponent.prototype.__proto__ === Vue.prototype === vm.__proto__`
1. **Vue.prototype**
`Vue.prototype` 是 Vue 构造函数的原型对象。这意味着当你创建一个 Vue 实例（例如 `new Vue({...})`）时，这个实例会继承 `Vue.prototype` 上的所有属性和方法。Vue 允许你扩展 `Vue.prototype` 来添加全局的自定义方法或属性，这样它们就可以在任何 Vue 实例中访问。
2. **VueComponent.prototype**
`VueComponent` 是 Vue 组件的构造函数。当你定义一个 Vue 组件时（无论是全局组件还是局部组件），这个组件的背后实际上是一个 `VueComponent` 的实例。`VueComponent.prototype` 是这个构造函数的原型对象，它继承了 `Vue.prototype` 的所有属性和方法，并可能添加了一些组件特有的属性和方法。
3. **vm.__proto__**
`vm` 通常是一个 Vue 实例的引用。在 JavaScript 中，每个对象都有一个 `__proto__` 属性，它指向该对象的原型。因此，`vm.__proto__` 就是 `vm` 这个 Vue 实例的原型，它应该指向 `Vue.prototype`（或者更准确地说是 `Vue.prototype` 的一个实例，因为原型可能会被修改）。
- `VueComponent.prototype.__proto__` 应该指向 `Vue.prototype`，因为 `VueComponent` 继承自 `Vue`。
- `vm.__proto__` 应该指向 `Vue.prototype`，因为 `vm` 是一个 Vue 实例。

### 构造函数，原型对象，实例，实例的引用
1. **构造函数**：
构造函数是一种特殊的函数，当创建对象时，它会被自动调用。构造函数的主要任务是初始化对象的状态，即为其属性设置初始值。在JavaScript中，构造函数的名字通常与类名相同，它可以有参数，但不能有返回值（除了`void`）。一旦对象生成，构造函数自动调用，且不能再次执行。

例如，在JavaScript中：


```javascript
function Car(color, make) {
    this.color = color;
    this.make = make;
}
```
上面的`Car`就是一个构造函数，它接受两个参数`color`和`make`，并初始化新创建的对象的这两个属性。
2. **原型对象**：
在JavaScript中，每个函数都有一个`prototype`属性，这个属性的值是一个对象，我们称之为“原型对象”。原型对象主要用于共享方法和属性。当一个对象试图访问一个属性或方法时，如果这个属性或方法在该对象自身上不存在，那么JavaScript引擎就会在该对象的原型（即构造函数的`prototype`属性所指向的对象）上查找。这种机制实现了属性和方法的继承。
3. **实例**：
在计算机语言中，“类”在实例化之后叫做一个“实例”。一个类定义了对象的结构（属性和方法），而实例则是这个结构的一个具体实现。每个实例都有自己的内存空间，存储其属性和方法的具体值。在数据库中，实例也可以表示一些程序的集合，如在Oracle中，实例是一些能支撑数据库运行的数据库程序。
4. **实例的引用**：
在计算机语言中，引用是指向某一变量（或对象）的别名。对引用的操作实际上就是对所引用变量（或对象）的直接操作。这种机制允许我们间接地访问和操作对象，而不需要直接知道其内存地址。在JavaScript中，引用是通过变量名来实现的。

例如：


```javascript
let car1 = new Car('red', 'Toyota');
let car2 = car1; // car2是car1的一个引用，它们指向同一个对象
```
在这个例子中，`car2`是`car1`的一个引用，它们都指向同一个`Car`实例。对`car2`的修改也会影响到`car1`，因为它们引用的是同一个对象。

### Vue Cli, Vue SFC, Vite
* Vue CLI，即Vue命令行界面（Command-Line Interface），是一个基于Vue.js进行快速开发的完整系统。它提供了一个交互式的项目脚手架，通过@vue/cli实现，致力于将Vue生态中的工具基础标准化。Vue CLI确保了各种构建工具能够基于智能的默认配置平稳衔接，使开发者能够专注于编写应用程序，而不是花费大量时间在配置上。此外，Vue CLI还提供了丰富的官方插件集合，集成了前端生态系统中最好的工具，以及一个完整的图形用户界面，用于创建和管理Vue.js项目。
* Vue SFC是单文件组件（Single-File Component）的缩写。这是一种特殊的文件格式，允许开发者将Vue组件的模板、逻辑与样式封装在一个单独的`.vue`文件中。具体来说，`<template>`、`<script>`和`<style>`三个块在同一个`.vue`文件中封装、组合了组件的视图、逻辑和样式。这种设计使得组件的开发和维护更加便捷和高效。需要注意的是，浏览器本身并不支持`.vue`文件，因此需要对这些文件进行加载和解析。这通常是通过vue-loader等Webpack的loader来实现的，它们可以将`.vue`文件转换为JavaScript模块，以便在浏览器中运行。总的来说，Vue SFC是Vue.js框架中的一个重要特性，它大大简化了Vue组件的开发过程，提高了开发效率。
* Vite是一种新型的前端构建工具，最初是配合Vue 3.0一起使用的，后来适配了各种前端项目，目前提供了Vue、React、Preact框架模板。Vite旨在提供开箱即用的配置，其插件API和JavaScript API带来了高度的可扩展性，并有完整的类型支持。它具有以下显著特点：快速的冷启动、即时的模块热更新、真正的按需编译。在2023年4月20日，Vite官方团队宣布了Vite 4.3的正式发布，专注于改进devServer的性能，提升了整体速度，并在Best of JS公布的前端构建工具中名列前茅。总的来说，Vite是一个强大且灵活的前端构建工具，为开发者提供了高效、快速的前端开发体验。

### Vue项目创建
* 基于[Vite Vue 3 工具链指南](https://cn.vuejs.org/guide/scaling-up/tooling.html)
```
npm create vue@latest

cd vue-project
npm install
npm run dev
```
* 基于[Vue CLI](https://cli.vuejs.org/zh/#%E8%B5%B7%E6%AD%A5)
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli

vue create my-project
# OR
vue ui

cd my-project
npm run serve
```

## 遇见问题
### 【已解决】useEffect测试时`const res = await axios.get(``http://localhost:5000/trades/${params.id}``)`后的`console.log("1")`未显示输出
* 参考文心一言，关于错误处理：如果在 `await` 表达式中发生错误，并且没有适当的 `try...catch` 块来捕获这个错误，那么这个错误可能会导致整个异步函数的剩余部分不被执行，并且不会被传递到 `React` 的错误边界中，除非你在 `useEffect` 中显式地处理了错误

### Umi@3.5.41 AntD@5.13.2 修改主题色不起作用
* 无论是参考AI的写法
```jsx
// npm install less less-loader --save-dev
export default defineConfig({
  // ...
  chainWebpack(config, { webpack }) {  
    config.module  
      .rule('less')  
      .oneOf('normal')  
      .use('less-loader')  
      .loader('less-loader')  
      .options({  
        lessOptions: {  
          modifyVars: {  
            'primary-color': '#FFFF00', // 设置你的主题色为黄色  
            'link-color': '#FFFF00', // 链接颜色也设置为黄色  
            // ... 其他变量 ...  
          },  
          javascriptEnabled: true,
        },
      });
  },
});
```
还是参考Umi官方文档的加一句
```jsx
theme: { '@primary-color': '#FFFF00' },
```
都不起作用
