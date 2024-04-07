# Week 16 Report

## 学习内容及时长

* **2023.04.01 月曜日:** 5h3min
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

* **2023.04.02 火曜日:** 2h5min
	* Vue-全局路由守卫 18:50-18:58
	* Vue-独享路由守卫&组件内部路由守卫 18:58-19:13
	* [Vue-history模式和hash模式](https://github.com/warrenlucky/zerostart/tree/main/java/VUE_%E5%AD%A6%E5%AE%8CREACT%E5%90%8E/02-vue-advance-master/40_src_history%E6%A8%A1%E5%BC%8F%E5%92%8Chash%E6%A8%A1%E5%BC%8F)
	* Vue-element-ui组件库 19:13-19:25
	* Vue-分析工程结构&初识setup 19:25-19:50
	* Vue-ref 22:35-22:45
	* Vue-reactive 22:45-22:55
	* Vue-响应式原理 22:55-23:10
	* Vue-setup 23:10-23:35
	* Vue-计算属性 23:35-23:40 

* **2023.04.03 水曜日:** 3h
	* Vue-计算属性 10:50-11:00
	* Vue-watch 11:00-11:20
	* Vue-watch-ref 11:20-11:25 11:35-11:43
	* Vue-watchEffect 11:43-11:50 12:00-12:14
	* Vue-生命周期 12:14-12:30
	* Vue-自定义hook 12:30-12:40
	* Vue-toRef和toRefs 17:40-18:00
	* Vue-shallowRef和shallowReactive 18:20-18:50
	* Vue-readOnly和shallowReadOnly 18:50-19:15
	* Vue-toRaw和markRaw 23:15-23:28
	* Vue-cutsomRef&provide与inject 23:28-23:43
	* Vue-响应式数据的判断&Teleport组件&suspense组件 23:43-00:05
  * N1-新完全掌握 01:50-02:35

* **2023.04.04 木曜日:** 5h30min
	* MySQL-介绍&快速入门 11:10-11:40 12:00-13:00 18:05-18:40
	* MySQL-表设计1 18:40-19:10
	* MySQL-表设计2 19:10-19:42
	* MySQL-表设计3 19:42-19:45 21:40-21:47
	* MySQL-表设计4 21:47-22:12
	* MySQL-表设计5 22:12-22:23
	* MySQL-多表联查 22:23-22:45
	* MySQL-权限系统设计典型 23:25-23:40
	* Java-介绍 23:40-23:50
	* Java-HelloWorld 23:50-24:00 00:45-00:55 01:05-01:00
	* Java-注释 01:00-01:30

* **2023.04.07 日曜日:** 3h25min
	* Java-标识符 17:15-17:30
	* Java-关键字与保留字 17:30-17:33
	* Java-变量与常量 17:33-18:08
	* Java-基本数据类型 18:08-18:25
	* Java-算术运算符 18:25-18:39
	* Java-赋值运算符 18:39-18:43
	* Java-逻辑运算符 18:43-18:47
	* Java-关系运算符 18:47-18:49
	* Java-位运算符 18:49-18:55
	* Java-运算符补充 18:55-19:00
	* Java-运算符优先级 23:30-23:40
	* Java-条件控制if 23:40-23:45
	* Java-条件控制switch 23:45-23:48
	* Java-while循环 23:48-23:52
	* Java-dowhile循环 23:52-23:53
	* Java-for循环 23:53-23:57
	* Java-字符串定义 23:57-00:10
	* Java-字符串常用方法 00:10-00:15
	* Java-一维数组定义 00:25-00:45
	* Java-一维数组取值 00:45-00:50
	* Java-二维数组定义 00:50-01:01
	* Java-二维数组取值 01:01-01:05
	* 整理报告 01:05-01:20

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

### Vue 3 watch
```js
/*
 * 情况三:监视reactive所定义的一个响应式数据
 * 坑:1.此处无法获取正确的ov(oldValue)
 *    2.强制开启了深度监视
 */
watch(person, (nv, ov) => {
	console.log('person变化了');
	console.log(nv, ov);
	// 两次输出结果相同，均为nv
}, {
	deep: false // 课件中此处的deep配置是无效的，默认开启深度监视无法关闭
	// "vue": "^3.2.13"版本中此处设置可以生效，深度监视能够被关闭
});
```
* `ref`: `ref` 创建的对象是一个 `RefImpl` 实例，它有一个 `.value` 属性，这个 `.value` 属性才是实际的响应式数据。

### 生命周期
* 通过组合式api的形式去使用生命周期钩子
	* **初始化：**setup-beforeMount-mounted
	* **隐藏组件：**beforeUnmount-unmounted
	* **显示组件：**setup-beforeMount-mounted
	* **数据更新：**beforeUpdate-updated
	* **代码更新：**beforeUnmount-setup-beforeMount-unmounted-mounted
* 使用配置项的形式使用生命周期钩子
	* **初始化：**setup-**beforeCreate**-**created**-beforeMount-mounted
	* **隐藏组件：**beforeUnmount-unmounted
	* **显示组件：**setup-**beforeCreate**-**created**-beforeMount-mounted
	* **数据更新：**beforeUpdate-updated
	* **代码更新：**beforeUnmount-setup-**beforeCreate**-**created**-beforeMount-unmounted-mounted
(`setup()`相当于`beforeCreate()`和`created()`)

### MySQL快速入门
* 常见的 MySQL 数据类型：
  > INT: 整数类型，可存储范围为-2147483648到2147483647的整数 \
  > VARCHAR: 可变长度字符串类型，可存储最大长度为65535个字符的字符串 \
  > CHAR: 定长字符串类型，可存储最大长度为255个字符的字符串 \
  > DECIMAL: 定点数类型，可存储精度高达65个数字的小数 \
  > DATE: 日期类型，存储年、月、日信息 \
  > DATETIME: 日期时间类型，存储年、月、日、时、分、秒信息，如“2023-03-23 10:30:00” \
  > TIMESTAMP: 时间戳类型，存储时间戳信息

### MySQL & JAVA
相关学习笔记已被移至对应语言文件夹下属README.md中统一管理，后续内容也均依此方式记录

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

### `reactive` 和 `ref`
* **使用场景**：`reactive` 通常用于处理对象或数组，而 `ref` 更适用于处理基本类型的数据。然而，`ref` 也可以用于处理对象或数组，但这通常是在你需要一个单独的响应式引用时，例如将其传递给一个函数或作为一个单独的 prop 传递。
* **解构与类型**：当使用 `reactive` 创建的响应式对象进行解构时，得到的值将不再是响应式的。而使用 `ref` 创建的响应式引用在解构时，可以通过 `toRefs` 来保持其响应性。此外，`ref` 创建的响应式数据在 TypeScript 中可以保持其类型信息，而 `reactive` 则可能需要额外的类型断言。
* **性能**：在处理大量数据时，`reactive` 通常比 `ref` 更快，因为它直接操作对象属性，而 `ref` 需要通过 `.value` 来访问或修改数据。

### `get` 和 `set`
在 Vue 3 中，计算属性（Computed Properties）的 `get` 和 `set` 方法允许你定义计算属性的读取（getter）和写入（setter）行为。`get` 方法用于返回计算属性的当前值，而 `set` 方法则用于响应计算属性值的设置或更新。
#### get 方法
`get` 方法是计算属性的读取器，它定义了当计算属性被访问时应该返回的值。通常情况下，`get` 方法会根据计算属性的依赖项（即响应式数据）来计算并返回一个值。这个值可以是任何类型的数据，比如字符串、数字、对象或数组等。
例如：
```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');

    const fullName = computed({
      get() {
        return firstName.value + ' ' + lastName.value;
      }
    });

    return {
      firstName,
      lastName,
      fullName
    };
  }
};
```
在上面的代码中，`fullName` 是一个计算属性，其 `get` 方法返回 `firstName` 和 `lastName` 的拼接值。当 `fullName` 被访问时，它会触发 `get` 方法，并返回当前的全名字符串。
#### set 方法
`set` 方法是计算属性的写入器，它定义了当计算属性的值被设置或更新时应该执行的操作。在 Vue 3 的计算属性中，你可以提供一个 `set` 方法来监听计算属性的赋值操作，并在这个方法中执行自定义的逻辑。
例如，你可能想要在用户尝试设置 `fullName` 时，自动更新 `firstName` 和 `lastName`：
```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');

    const fullName = computed({
      get() {
        return firstName.value + ' ' + lastName.value;
      },
      set(newValue) {
        const names = newValue.split(' ');
        firstName.value = names[0];
        lastName.value = names.pop(); // 使用 pop() 来获取最后一个元素，并移除它
      }
    });

    return {
      firstName,
      lastName,
      fullName
    };
  }
};
```
在这个例子中，当用户尝试设置 `fullName` 的值时，`set` 方法会被调用。它接收一个 `newValue` 参数，然后将其分割为名字和姓氏，并分别更新 `firstName` 和 `lastName` 的值。这样，当用户通过某种方式（比如表单输入）设置 `fullName` 时，`firstName` 和 `lastName` 也会相应地更新。
需要注意的是，当计算属性依赖于其他响应式数据时，这些依赖数据的变化会自动触发计算属性的重新计算（通过 `get` 方法）。然而，当计算属性本身被赋值时，只有提供了 `set` 方法的情况下，这个赋值操作才会被处理。如果没有提供 `set` 方法，尝试设置计算属性的值将会导致一个警告或错误。

### Vue 3 同名对象toRef
```js
// nameToRef: toRef(person, "name"),
// ...toRefs(person),
const { name: nameRef1 } = toRefs(person);  
const { name: nameRef2 } = toRefs(person2);
```

### Vue 3 `Suspense`
Vue 3中的Suspense组件主要用于处理异步组件和延迟加载，提供了一种更简洁和直观的方式来管理这些异步操作的状态。其主要功能和用途包括：
1. **占位符显示**：在异步组件加载完成前，Suspense允许开发者定义一个占位符，如“Loading...”，以提供更好的用户体验。
2. **异步组件加载**：当使用异步组件时，Suspense允许开发者定义一个加载状态，直到该组件可用。
3. **异步数据获取**：对于需要异步获取数据的组件，Suspense可以等待数据加载完成后再渲染组件。
4. **懒加载组件**：在应用中使用懒加载技术时，Suspense可以提供一个加载指示器，告诉用户内容正在加载中。
使用Suspense的基本步骤包括使用`<Suspense>`标签包裹异步组件，并在其中定义`default`和`fallback`插槽。`default`插槽用于放置异步组件，而`fallback`插槽则用于放置加载中的占位符。
需要注意的是，Suspense组件只能包含一个异步组件，`fallback`插槽中的内容只能是一个单独的元素，且异步组件必须通过`defineAsyncComponent`方法定义。











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

### 【已解决】MySQL 表名报错
```
mysql> show tables;
+----------------------+
| Tables_in_mydatabase |
+----------------------+
| customer             |
| order                |
+----------------------+
2 rows in set (0.00 sec)
```
```
mysql> drop table order;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order' at line 1
```
在MySQL中，`order`是一个保留字（reserved word），它用于指定查询结果的排序方式。因此，当您尝试使用`order`作为表名时，MySQL会将其视为保留字，导致语法错误。
要解决这个问题，您可以使用反引号（`）将表名括起来，这样MySQL就会将其视为标识符而不是保留字。下面是修改后的命令：
```sql
mysql> drop table `order`;
```

### 【已解决】MySQL `Integer display width is deprecated and will be removed in a future release.`
```sql
CREATE TABLE `customer` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE
);
```
```
Query OK, 0 rows affected, 1 warning (0.01 sec)
```
```sql
SHOW WARNINGS;
```
```
+---------+------+------------------------------------------------------------------------------+
| Level   | Code | Message                                                                      |
+---------+------+------------------------------------------------------------------------------+
| Warning | 1681 | Integer display width is deprecated and will be removed in a future release. |
+---------+------+------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
您提供的警告信息表示MySQL正在告诉您一个关于整数类型显示宽度的弃用警告。具体来说，警告代码1681指出整数类型的显示宽度（例如 `int(11)` 中的 `11`）已被弃用，并将在未来的MySQL版本中移除。
在MySQL中，为整数类型指定显示宽度（例如 `int(5)` 或 `int(11)`）曾经被用来在某些情况下影响显示格式，但这实际上并不限制整数的值范围或存储大小。从MySQL 5.0.3版本开始，这个显示宽度就不再有任何意义，除了在某些特定情况下与 `ZEROFILL` 选项一起使用时会影响列的显示格式。
这个警告告诉您，尽管您可以在创建表或修改列时指定一个显示宽度，但这个特性已经不被推荐使用，并且将在未来的MySQL版本中完全移除。因此，您应该避免在定义整数列时包含显示宽度，除非您确实需要使用 `ZEROFILL` 选项来确保固定宽度的显示格式。
如果您在定义表结构时不需要固定宽度的显示格式，您可以简单地省略显示宽度，只使用整数类型（如 `INT`），如下所示：
```sql
CREATE TABLE `customer` (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL UNIQUE
);
```
在这个例子中，`id` 列被定义为 `INT` 而不是 `INT(11)`，这样就不会触发关于显示宽度弃用的警告了。如果您的应用程序或数据库设计确实需要 `ZEROFILL` 选项，您可以像这样包括它：
```sql
CREATE TABLE `some_table` (
    `some_column` INT(5) ZEROFILL NOT NULL
);
```
但请注意，即使在这种情况下，显示宽度也不会影响列中能够存储的值的范围或存储大小。
总之，您可以安全地忽略这个警告，但如果您希望避免未来的兼容性问题，最好更新您的表定义，以移除不必要的显示宽度指定。

