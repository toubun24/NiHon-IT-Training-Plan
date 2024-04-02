# Week 15 Report

## 学习内容及时长

* **2023.04.01 月曜日:** 
  * Vue-VUEX 18:05-18:20 18:30-18:50
  * Vue-VUEX多组件 19:35-19:55
  * Vue-模块化 20:00-20:30
  * Vue-router 20:40-21:10
  * Vue-多级路由 22:15-22:35 00:30-00:45
  * Vue-路由query参数 00:45-01:08
  * Vue-命名路由 01:08-01:29
  * Vue-路由params参数 01:29-01:42
  * Vue-路由props配置 01:42-01:55 02:45-03:30
	* Vue-编程式路由导航 03:30-03:40
	* Vue-缓存路由组件 03:45-04:05
	* Vue-两个新的生命周期钩子 04:15-04:23

* **2023.04.02 火曜日:** 
	* Vue-全局路由守卫 18:50-18:58
	* Vue-独享路由守卫&组件内部路由守卫 18:58-19:13
	* [Vue-history模式和hash模式](https://github.com/warrenlucky/zerostart/tree/main/java/VUE_%E5%AD%A6%E5%AE%8CREACT%E5%90%8E/02-vue-advance-master/40_src_history%E6%A8%A1%E5%BC%8F%E5%92%8Chash%E6%A8%A1%E5%BC%8F)
	* Vue-element-ui组件库 19:13-19:25
	* Vue-分析工程结构&初识setup 19:25-19:50
	* Vue-ref 22:35-22:45
	* Vue-reactive 22:45-22:55
	* Vue-响应式原理 22:55-23:10
	* Vue-setup 23:10-23:35
	* Vue-计算属性
	* Vue-watch
	* Vue-watch-ref
	* Vue-watchEffect
	* Vue-生命周期
	* Vue-自定义hook
	* Vue-toRef和toRefs
	* Vue-shallowRef和shallowReactive
	* Vue-readOnly和shallowReadOnly
	* Vue-toRaw和markRaw
	* Vue-cutsomRef
	* Vue-provide与inject
	* Vue-响应式数据的判断
	* Vue-Teleport组件
	* Vue-suspense组件

* **2023.04.03 水曜日:** 

* **2023.04.04 木曜日:** 

* **2023.04.05 金曜日:** 

* **2023.04.06 土曜日:** 

* **2023.04.07 日曜日:** 


## 学习笔记
### VUEX
* Vue2使用VUEX3及以下，Vue3才可使用VUEX4及以上
* 对比Redux，VUEX异步操作不需要中间件

### VUE router
* Vue2使用3及以下
* 使用params传递参数，不能配置path，只能配置name
* props
	* **props的第一种写法：**值为对象，该对象的所有key-value都会以props的形式传给detail组件(死数据)
	```js
	props:{
	  a:1,
	  b:'hello'
	}
	```
	* **props的第二种写法：**值为布尔值，布尔值为真，就会把该路由组件收到的所有params(注意如果是query参数不会奏效的)参数以props的形式传递给detail组件
	```js
	props: true
	```
	* **props的第三种写法：**值为函数，$route.query.id
	```js
	props({ query: { id, title } }) {
		return {
			id,
			title
		}
	}
	```

### Vue组件库
* Antdv
* Element
* iView

### Vue 2 & Vue 3
* Vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法。
* 但在setup中不能访问到Vue2.x配置（data、methos、computed...）。
* 如果有重名, setup优先。

### Vue 3 setup
* `setup()`执行完才会执行`beforeCreate()`
* context
  ```
	attrs: (…)
	emit: (…)
	expose: exposed => {…}
	slots: (…)
	get attrs: ƒ attrs()
	get emit: emit() { return (event, ...args) => {…}
	get slots: ƒ slots()
	[[Prototype]]: Object
	```









## 内容拓展
### Vuex `commit`和`dispatch`
在 Vuex 中，`this.$store.commit` 和 `this.$store.dispatch` 是用于触发状态更改的两种不同方法，但它们具有不同的用途和场景。
1. **this.$store.commit**:
	* **用途**: 直接提交一个 mutation 来更改状态。
	* **何时使用**: 当你想直接更改 Vuex 中的状态时。
	* **注意**: 由于 Vuex 的状态是响应式的，因此状态的更改会触发视图的更新。但是，出于安全考虑，你不能直接更改状态，而是需要提交一个 mutation。Mutation 必须是同步的。
	* **示例**:
	```
	javascript`this.$store.commit('increment', payload);`
	```
	在上面的示例中，我们提交了一个名为 'increment' 的 mutation，并传递了一个 `payload`。
2. **this.$store.dispatch**:
	* **用途**: 触发一个 action。Actions 可以包含任意异步操作，并且最终会通过提交 mutation 来更改状态。
	* **何时使用**: 当你的状态更改逻辑涉及异步操作（如 API 调用）或需要多个 mutation 时。
	* **注意**: Actions 可以是异步的，并且它们可以包含任意复杂的逻辑。但最终的状态更改仍然需要通过提交 mutation 来完成。
	* **示例**:
	```
	javascript`this.$store.dispatch('fetchUser', userId);`
	```
	在上面的示例中，我们触发了一个名为 'fetchUser' 的 action，并传递了一个 `userId`。这个 action 可能会执行一些异步操作（如从 API 获取用户数据），并最终通过提交一个 mutation 来更新状态。
**总结**:
* 如果你只是想直接更改状态，并且不涉及异步操作或复杂逻辑，那么使用 `this.$store.commit`。
* 如果你的状态更改逻辑涉及异步操作或需要多个 mutation，那么使用 `this.$store.dispatch` 来触发一个 action。

### 响应式原理
要正确访问和修改响应式数据，并确保您的代码是响应式的，您应该：
* 确保所有需要响应式的变量或对象都通过 `ref` 或 `reactive` 创建。
* 使用正确的语法来访问和修改这些响应式数据。
* 在组件中使用这些数据，这样当数据变化时，组件会自动重新渲染。
**Vue 2 的响应式原理**
在 Vue 2 中，响应式系统是基于 Object.defineProperty 实现的。当 Vue 实例被创建时，Vue 会遍历 data 对象中的所有属性，并使用 Object.defineProperty 将它们转化为 getter/setter，这样当数据变化时，视图会自动更新。然而，这种方式有几个限制：
1. **无法检测属性的添加或删除**：由于 Vue 2 在实例创建时只处理已存在的属性，对于后来添加的属性，Vue 无法使其变为响应式的。
2. **不能检测数组的变化**：虽然 Vue 2 提供了一些方法来修改数组并触发视图更新（如 push、pop、splice 等），但它不能检测到数组元素的变化或长度的变化。
**Vue 3 的响应式原理**
Vue 3 引入了基于 Proxy 的新响应式系统，这解决了 Vue 2 中存在的一些问题。Proxy 是 ES6 中提供的一个新特性，它可以拦截对象上的各种操作，包括属性的读取、赋值、枚举等。
在 Vue 3 中，当组件的 data 被创建时，Vue 会使用 Proxy 将这个对象包装起来。这样，当数据被访问或修改时，Proxy 的拦截器就会被触发，从而可以追踪数据的变化并通知相关的观察者（通常是组件）。
Vue 3 的响应式系统有以下优点：
1. **可以检测属性的添加或删除**：由于 Proxy 是对整个对象进行拦截，所以即使后来添加了新的属性，Vue 也能使其变为响应式的。
2. **可以检测数组的变化**：Vue 3 不再需要特殊的方法来修改数组，因为 Proxy 可以拦截数组上的任何操作，包括修改元素、改变长度等。
3. **性能优化**：虽然 Proxy 本身可能比 Object.defineProperty 慢一些，但 Vue 3 的响应式系统经过优化，使得在大多数情况下，性能与 Vue 2 相当甚至更好。
此外，Vue 3 还引入了 Composition API，这是一种新的代码组织方式，使逻辑复用更加容易，同时也与响应式系统更加紧密地集成在一起。
总的来说，Vue 3 的响应式系统在处理复杂数据和复杂逻辑时更加灵活和强大，同时也提供了更好的性能和更方便的代码组织方式。





## 遇见问题
### 【已解决】VSCode Vue代码高亮混乱
* 特别是在将粘贴一小段内容到某一代码行中时，甚至会影响到其他行的代码高亮，同一个变量名染上不同颜色
* 解决方案：禁用造成冲突的`Vue - Official`插件，仅保留`Vetur`后问题解决

### 【已解决】Router props 点击message后报错`Missing required param "id"`且无法显示detail
```
Uncaught runtime errors:
ERROR
Missing required param "id"
at Object.stringify (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:978:26)
at Object.resolve (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:1349:22)
at Object.resolve (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:2742:34)
at eval (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:1920:76)
at ReactiveEffect.eval [as fn] (webpack-internal:///./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js:958:44)
at ReactiveEffect.run (webpack-internal:///./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js:217:19)
at get value (webpack-internal:///./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js:965:147)
at useLink (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:1961:22)
at setup (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm-bundler.js:2007:64)
at callWithErrorHandling (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:328:19)
```
* 原因是保留了先前params方式时使用的路径
```js
{
		path: 'message',
		component: RouterNameMessage,
		children: [
				{
						name: 'particulars',
						path: 'detail/:id/:title', // 这里
						component: RouterPropsDetail,
						props({ query: { id, title } }) {
								return {
										id,
										title
								}
						}
				}
		],
		}
```
所以改为`path: 'detail'`即可

### 【已解决】Vue 3 缓存路由组件缓存无效并警告`<router-view> can no longer be used directly inside <transition> or <keep-alive>`
```
[Vue Router warn]: <router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```
原代码为
```js
<keep-alive include="RouterCachedNews">
	<router-view> </router-view>
</keep-alive>
```
按警告说明替换为
```js
<router-view v-slot="{ Component }">
	<keep-alive>
		<component :is="Component" />
	</keep-alive>
</router-view>
```
即可

### 【已解决】注释报错 `error Irregular whitespace not allowed`
注释中存在奇怪的空格，按报错信息给出的精确位置找到后重新打一个空格即可