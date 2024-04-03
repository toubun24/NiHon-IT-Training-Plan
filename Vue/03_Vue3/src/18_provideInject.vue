<template>
  <div class="app">
    <h2>app(祖) {{ name }}---{{ price }}</h2>
    <ChildDemo />
  </div>
</template>

<script>
import ChildDemo from "./components/ChildDemo";
import { reactive, toRefs, provide } from "vue";
export default {
  name: "App",
  components: { ChildDemo },
  setup() {
    let car = reactive({
      name: "benz",
      price: 40,
    });
    provide("car", car); //给自己的后代组件递数据 后代都可以 // provide
    return {
      ...toRefs(car),
    };
  },
};
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
.app {
  background: grey;
  padding: 10px;
}
</style>