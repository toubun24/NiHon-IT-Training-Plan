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
  * Vue-路由props配置 01:42-01:55
	* Vue-
	* Vue-
	* Vue-
	* Vue-
	* Vue-
	* Vue-
	* Vue-
	* Vue-
	* Vue-

* **2023.04.02 火曜日:** 

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






## 遇见问题
### 【已解决】VSCode Vue代码高亮混乱
* 特别是在将粘贴一小段内容到某一代码行中时，甚至会影响到其他行的代码高亮，同一个变量名染上不同颜色
* 解决方案：禁用造成冲突的`Vue - Official`插件，仅保留`Vetur`后问题解决