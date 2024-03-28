# Week 15 Report

## 学习内容及时长

* **2023.03.28 木曜日:** 
  * Vue-props传参数 22:40-23:40
  * Vue-mixin
  * Vue-todoList基本实现
  * Vue-自定义事件

* **2023.03.29 金曜日:** 

* **2023.03.30 土曜日:** 

* **2023.03.31 日曜日:** 

## 学习笔记
### props传参数
* 注意props传递过来的值是不能改的(尽量避免去改，控制台会有警告)
* 如果props和data存在同名的属性，会报错，但已props传递的属性值为主
* 注意props属性名不能是vue底层已征用的属性名(比如key, ref等等)
* 把props传递过来的值当成vc的状态，这样改name是不会出问题的，因为你没有直接去修改props
* 有三种设置形式，具体参考NiHon-IT-Training-Plan\Vue\VueCli\src\components\StudentDemo.vue























## 内容拓展





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