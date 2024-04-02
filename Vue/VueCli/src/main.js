import { createApp } from 'vue'
import App from './App.vue'

// import Vue from "vue"

/* 全局引入混合 */
// import { mixin, shareData } from "@/mixin"
// Vue.mixin(mixin)
// Vue.mixin(shareData)

/* 全局引入插件 */
// import plugins from './plugins';
// // Vue.use(plugins); // vue应用插件 // Vue 2
// createApp(App).use(plugins).mount('#app')

/* 另一种写法 */
// Vue.config.productionTip = false
// new Vue({
//     render: h => h(App),
// }).$mount('#app')

/* VUEX in Vue 2 */
// import Vue from "vue"
// import store from './store';
// new Vue({
//     el: '#app',
//     store,
//     render: h => h(App),
// });

/* VUEX in Vue 3 */
// import store from './store';
// createApp(App).use(store).mount('#app')

/* Router in Vue 2 */
// import VueRouter from "vue-router"; // npm install vue-router@next
// import router from './router';
// Vue.use(VueRouter);
// new Vue({
//     el: '#app',
//     render: h => h(App),
//     router
// });

/* Router in Vue 3 */
// import router from './router';
// import 'bootstrap/dist/css/bootstrap.css' // npm install bootstrap --save
// createApp(App).use(router).mount('#app')

/* Element in Vue 2 */
// import { Button, Input, Row, DatePicker } from 'element-ui';
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Row);
// Vue.use(DatePicker);
// Vue.config.productionTip = false;
// new Vue({
//   el: '#app',
//   render: h => h(App),
// });

/* Element in Vue 3 */
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css' // 引入样式
const app = createApp(App);
app.use(ElementPlus); // 使用 ElementPlus 插件
app.config.productionTip = false; // 隐藏生产模式的提示
app.mount('#app');

//createApp(App).mount('#app')

