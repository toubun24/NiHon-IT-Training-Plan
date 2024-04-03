<template>
  <div class="app">
    <!-- <h2>app(祖) {{ name }}---{{ price }}</h2> -->
    <h2>app</h2>
    <TeleportChild />
  </div>
</template>

<script>
import TeleportChild from "./components/TeleportChild";
// import { reactive, toRefs, provide } from "vue";
export default {
  name: "App",
  components: { TeleportChild },
  // setup() {
  //   let car = reactive({
  //     name: "benz",
  //     price: 40,
  //   });
  //   provide("car", car);
  //   return {
  //     ...toRefs(car),
  //   };
  // },
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