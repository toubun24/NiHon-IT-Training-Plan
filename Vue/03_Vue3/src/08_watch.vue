<template>
  <WatchDemo />
</template>

<script>
import WatchDemo from "./components/WatchDemo";
export default {
  name: "App",
  components: { WatchDemo },
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