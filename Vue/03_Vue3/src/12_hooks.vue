<template>
  <button @click="isShowDemo = !isShowDemo">
    {{ isShowDemo ? "隐藏" : "显示" }}
  </button>
  <HooksDemo v-if="isShowDemo" />
  <hr />
  <HooksTest />
</template>

<script>
import HooksDemo from "./components/HooksDemo";
import HooksTest from "./components/HooksTest";
import { ref } from "vue";
export default {
  name: "App",
  components: { HooksDemo, HooksTest },
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