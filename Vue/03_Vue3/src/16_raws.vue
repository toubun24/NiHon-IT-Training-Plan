<template>
  <button @click="isShowDemo = !isShowDemo">
    {{ isShowDemo ? "隐藏" : "显示" }}
  </button>
  <RawsDemo v-if="isShowDemo" />
</template>

<script>
import RawsDemo from "./components/RawsDemo";
import { ref } from "vue";
export default {
  name: "App",
  components: { RawsDemo },
  setup() {
    let isShowDemo = ref(true);
    return {
      isShowDemo,
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
</style>