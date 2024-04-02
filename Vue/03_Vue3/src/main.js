import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')

const app = createApp(App)
console.log(app)
// 挂载
app.mount('#app')
// setTimeout(() => {
//   app.unmount('#app')
//   console.log('unmount')
// }, 2000)