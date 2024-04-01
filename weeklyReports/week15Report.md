# Week 15 Report

## 学习内容及时长

* **2023.03.28 木曜日:** 2h50min
  * Vue-props传参数 22:40-23:40
  * Vue-mixin混入 23:40-00:15
  * Vue-plugins插件 00:20-00:30 01:25-02:30

* **2023.03.30 土曜日:** 5h55min
  * Vue-todoList基本实现 17:40-19:30
  * Vue-scoped样式 21:00-21:10
  * 浏览器本地存储 21:15-21:25
  * Vue-todolist本地存储版本 21:25-21:40
  * Vue-自定义事件 21:50-22:55
  * Vue-todolist自定义事件版本 22:55-23:05
  * Vue-事件总线 23:55-00:10 00:15-00:25
  * Vue-pubsub 00:25-00:35
  * Vue-todolistPubsub版本 00:35-00:45
  * Vue-nextTick 00:45-01:40
  * Vue-动画效果 03:45-04:05
  * Vue-todolist动画版本 04:05-04:20

* **2023.03.31 日曜日:** 2h20min
  * Vue-github搜索案例 18:45-18:50 23:05-23:35
  * Vue-github搜索案例vue-resource版本 23:35-23:40
  * Vue-插槽 23:40-23:50 00:10-01:30
  * 整理报告 00:00-00:10

## 学习笔记
### props传参数
* 注意props传递过来的值是不能改的(尽量避免去改，控制台会有警告)
* 如果props和data存在同名的属性，会报错，但已props传递的属性值为主
* 注意props属性名不能是vue底层已征用的属性名(比如key, ref等等)
* 把props传递过来的值当成vc的状态，这样改name是不会出问题的，因为你没有直接去修改props
* 有三种设置形式，具体参考NiHon-IT-Training-Plan\Vue\VueCli\src\components\StudentDemo.vue

## 内容拓展
### Vue `<label>`标签
`<label>`标签用于定义标签，通常与表单元素一起使用，以提供点击区域，将点击与特定表单元素关联，例如单选按钮或复选框。

### Vue localStorage和sessionStorage
在Vue.js中，`localStorage`和`sessionStorage`都是Web Storage API的一部分，它们提供了在客户端存储数据的方式，但有一些关键的不同点。以下是它们的异同：
#### 相同点：
1. **存储类型**：两者都用于在浏览器中存储键值对（key-value pairs）的数据。
2. **数据格式**：它们存储的数据都是字符串格式。如果你需要存储其他类型的数据（如对象或数组），你需要先将它们转换为字符串，然后再存储。同样，当你从存储中检索数据时，你也需要将字符串转换回原始的数据类型。
3. **同源策略**：它们都遵循浏览器的同源策略，这意味着一个源（域、协议和端口）存储的数据不能被其他源访问。
#### 不同点：
1. **生命周期**：
   - `localStorage`：数据没有过期时间，它会一直存储在浏览器中，直到用户或脚本显式地删除它。即使用户关闭了浏览器或重启了设备，数据仍然会保留。
   - `sessionStorage`：数据只在当前会话（session）中有效，即当用户关闭浏览器标签页或窗口时，数据会被清除。如果重新打开相同的标签页或窗口，之前存储的数据将不可访问。
2. **存储容量**：虽然现代浏览器对两者的存储容量都有很大的限制（通常是几MB），但具体限制可能因浏览器而异。在大多数情况下，这不会成为问题，但如果你需要存储大量数据，可能需要考虑其他解决方案。
3. **用途**：
   - `localStorage`：通常用于存储需要长期保留的数据，如用户偏好设置、缓存数据等。
   - `sessionStorage`：更适用于存储会话期间需要的数据，如表单输入、临时状态等。
在Vue.js中，你可以使用这两个API来增强应用程序的功能，如存储用户状态、缓存数据以减少服务器请求等。但请注意，由于数据存储在客户端，因此不应存储敏感信息，如密码或私钥，因为这些数据可以被用户或恶意脚本访问。对于敏感数据，应始终使用服务器端存储和加密。

### 代码分析 `<Student ref="student" @click.native="show" />`
1. **ref="student"**
`ref` 是一个特殊的属性，它用于给 Vue 组件或 DOM 元素注册一个引用信息。通过 `ref`，你可以在 Vue 实例的方法或计算属性中直接访问到这个组件或 DOM 元素。
在你给出的代码中，`ref="student"` 意味着你可以在父组件的 Vue 实例中通过 `this.$refs.student` 来访问这个 `Student` 组件的实例。这通常用于需要直接访问子组件实例的场景，比如手动调用子组件的方法或访问其数据。
2. **@click.native="show"**
`@click.native` 是一个事件监听器，用于监听原生 DOM 事件。在 Vue 组件中，事件默认是组件自定义的事件，而不是原生 DOM 事件。如果你想监听组件根元素的原生事件，你需要在事件名后加上 `.native` 修饰符。
在这里，`@click.native="show"` 意味着当 `Student` 组件的根元素被点击时，父组件的 `show` 方法会被调用。这是因为在 Vue 2 中，如果你尝试在组件上直接监听一个原生事件（比如 `click`），它是不会起作用的，除非你使用了 `.native` 修饰符。
注意：在 Vue 3 中，`.native` 修饰符已经不再是必要的，因为 Vue 3 改进了组件的事件监听机制，使得监听组件的根元素的原生事件变得更加直接和简单。但是，如果你正在使用 Vue 2，那么 `.native` 修饰符仍然是一个很有用的工具。
综上所述，这段代码允许你在父组件中通过 `ref` 直接访问 `Student` 组件的实例，并且当 `Student` 组件的根元素被点击时，会调用父组件的 `show` 方法。

### 插槽
* **默认插槽**允许父组件向子组件传递任意内容，子组件中通过`<slot></slot>`标签定义默认插槽的位置。
* **具名插槽**允许在子组件中定义多个插槽，并通过不同的名称来区分它们，从而更加灵活地控制内容的渲染位置。
  * `v-slot`仅仅只能被用在组件上或者template标签上
* **作用域插槽**是Vue的高级插槽机制，它允许父组件将数据传递给子组件，并在子组件中自定义渲染这些数据。这通常用于需要动态渲染的内容以及子组件需要访问来自父组件的数据的情况。

























## 遇见问题
### 【已解决】Vue demo启动报错 error Component name "Student" should always be multi-word  vue/multi-word-component-names
* 组件名没有写成驼峰式结构或中划线连接形式

### 【已解决】运行vue项目时，控制台警告 Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined.
```
Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.
```
* 参考[博客](https://blog.csdn.net/qq_53810245/article/details/136234505)中关于vue-cli的配置，将`./vue.config.js`从
```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
```
添加为
```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
})
```
而后运行项目不再显示警告

### 【已解决】Vue TodoList 勾选与取消勾选待办事项无法改变done状态
* 先设置控制台输出
```js
todoCheck(id) {
    const todo = this.todos.filter(todo => todo.id === id)
    console.log("check1", id,todo,todo.done)
    todo.done = !todo.done
    console.log("check2", id,todo,todo.done)
},
```
对同一选项连续点击
```
check1 001 undefined undefined
check2 001 [Proxy(Object), done: true] true
check3 001 Proxy(Object) {id: '001', title: '吃饭', done: false}

check1 001 undefined undefined
check2 001 [Proxy(Object), done: true] true
check3 001 Proxy(Object) {id: '001', title: '吃饭', done: false}
```
注意到`[Proxy(Object), done: true] true`内容为
```
0: Proxy(Object) {id: '001', title: '吃饭', done: false}
done: true
length: 1
[[Prototype]]: Array(0)
```
意识到是`filter`返回的结果为数组格式，才发现示例代码用的`.find()`，**所以以后在这种返回唯一匹配结果时不要用`.filter()`而应该用`.find()`**

### Vue 3 `.native`已弃用
```
error  '.native' modifier on 'v-on' directive is deprecated  vue/no-deprecated-v-on-native-modifier
```

### Vue 3 `$on`, `$off`, `$once`已弃用
```
error  The Events api `$on`, `$off` `$once` is deprecated. Using external library instead, for example mitt  vue/no-deprecated-events-api
```
在 Vue 3 中，Vue 实例上不再提供 `$on`、`$off` 和 `$once` 这些方法用于事件监听。相反，Vue 3 推荐使用 Composition API 中的 `ref` 和 `reactive` 等函数，以及 `watch` 和 `watchEffect` 来处理响应式数据的变化，以及使用自定义的事件系统或者外部的库来管理组件间的事件通信。
`mitt` 是一个轻量级的库，专门用于处理事件发布/订阅模式。它非常适合在 Vue.js 项目中作为事件监听系统的替代方案。
如果你正在升级一个使用 Vue 2 的项目到 Vue 3，并且你的代码中有使用到 `$on`、`$off` 或 `$once`，那么你应该考虑使用 `mitt` 或其他类似的库来替代它们。这样，你的代码将更符合 Vue 3 的推荐做法，并且可以减少潜在的兼容性问题。
下面是一个简单的例子，展示如何在 Vue 3 中使用 `mitt` 来替代 `$on` 和 `$emit`：
首先，安装 `mitt`：
```bash
npm install mitt
```
然后，在你的 Vue 组件或逻辑中：
```javascript
import mitt from 'mitt';
const emitter = mitt();
// 在某个地方订阅事件
emitter.on('someEvent', (payload) => {
  console.log('someEvent was emitted with payload:', payload);
});
// 在另一个地方触发事件
emitter.emit('someEvent', { data: 'Hello, world!' });
// 当不再需要监听事件时，可以取消订阅
emitter.off('someEvent');
```

### 【已解决】Vue pubsub 传参
* 首先注意传参错位的情况，说明忘记占位`_,`
* 随后是注意方法固定传递两个参数,一个是 `msg`,一个是 `data`,`msg` 就是订阅的内容(也就是发布名称),`data` 就是我们要从 `publish` 中的传递的值，所以不能在`msg`后跟多个参数排列这样，我是将后面的多个要传的参数合并成数组一起传的就成功了

### 【已解决】Vue 3 `slot`弃用
```
error  `slot` attributes are deprecated  vue/no-deprecated-slot-attribute
```
在 Vue 2 中，我们这样使用插槽：
```html
<my-component>
  <template slot="header">
    <!-- header content -->
  </template>
  <template slot="footer">
    <!-- footer content -->
  </template>
</my-component>
```
而在 Vue 3 中，你应该使用 `v-slot` 指令来替代 `slot` 属性：
```html
<my-component>
  <template v-slot:header>
    <!-- header content -->
  </template>
  <template v-slot:footer>
    <!-- footer content -->
  </template>
</my-component>
```
或者，对于默认插槽，你可以简单地使用 `#default` 替代 `#`：
```html
<my-component>
  <template #default>
    <!-- default content -->
  </template>
</my-component>
```
另外，Vue 3 还引入了新的插槽语法糖，允许你直接在元素上使用 `v-slot` 简写：
```html
<my-component>
  <template #header>
    <!-- header content -->
  </template>
  <template #footer>
    <!-- footer content -->
  </template>
  <div #default>
    <!-- default content -->
  </div>
</my-component>
```
或者，如果你只关心插槽的内容而不关心它的名字，可以使用默认插槽的简写：
```html
<my-component>
  <div #default>
    <!-- default content -->
  </div>
</my-component>
```
或者更简洁地：
```html
<my-component>
  <div>
    <!-- default content -->
  </div>
</my-component>
```

### Vue 3 `scope`弃用
```
error  `scope` attributes are deprecated  vue/no-deprecated-scope-attribute
```
在 Vue 2 中，当你想要定义一个作用域插槽时，你需要在 `<slot>` 标签上使用 `scope` 属性，如下所示：
```html
<!-- Vue 2 的作用域插槽语法 -->
<my-component>
  <template slot="header" scope="props">
    {{ props.someData }}
  </template>
</my-component>
```
在 Vue 3 中，这种使用 `scope` 属性的语法已经不被推荐使用，你应该使用 `v-slot` 指令，并直接通过解构赋值的方式获取插槽提供的数据，如下所示：
```html
<!-- Vue 3 的作用域插槽语法 -->
<my-component>
  <template v-slot:header="props">
    {{ props.someData }}
  </template>
</my-component>
```
或者，你可以使用更简洁的语法糖形式：
```html
<!-- Vue 3 作用域插槽的简写语法 -->
<my-component>
  <template #header="props">
    {{ props.someData }}
  </template>
</my-component>
```
在这个简写语法中，`#header` 是具名插槽的缩写，而 `props` 是一个临时变量，用来接收从子组件插槽中传递过来的数据对象。
