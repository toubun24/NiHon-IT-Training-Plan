<template>
  <ComputedDemo />
</template>

<script>
import ComputedDemo from "./components/ComputedDemo";
export default {
  name: "App",
  components: { ComputedDemo },
  setup() {},
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
</style>