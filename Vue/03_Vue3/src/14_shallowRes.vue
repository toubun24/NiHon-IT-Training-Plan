<template>
  <button @click="isShowDemo = !isShowDemo">
    {{ isShowDemo ? "隐藏" : "显示" }}
  </button>
  <ShallowRes v-if="isShowDemo" />
</template>

<script>
import ShallowRes from "./components/ShallowRes";
import { ref } from "vue";
export default {
  name: "App",
  components: { ShallowRes },
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