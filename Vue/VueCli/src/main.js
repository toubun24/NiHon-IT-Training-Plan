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

createApp(App).mount('#app')

