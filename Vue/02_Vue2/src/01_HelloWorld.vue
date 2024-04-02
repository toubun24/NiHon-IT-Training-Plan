<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <img ref="img" alt="Vue logo2" src="./assets/logo.png">
  <HelloWorld ref="hello" msg="Welcome to Your Vue.js App" />
  <button @click="showH">点我输出</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld // 自定义组件注册
  },
  methods: {
    showH(e) { // 没有对应的ref的话输出undefined
      console.log(e.target) // 发生事件的dom元素m // <button>点我输出</button>
      console.log(this.$refs.hello) // 获得的是组件实例对象vc // Proxy(Object) {…}
      console.log(this.$refs.img) // <img alt="Vue logo2" src="./assets/logo.png;...">
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
