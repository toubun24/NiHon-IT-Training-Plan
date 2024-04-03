<template>
  <WatcheEffect />
</template>

<script>
import WatcheEffect from "./components/WatcheEffect";
export default {
  name: "App",
  components: { WatcheEffect },
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