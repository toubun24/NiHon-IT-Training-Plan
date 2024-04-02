<template>
  <!--绑定自定义事件hello-->
  <SetupDemo @hello="showHelloMsg" @hello2="showHelloMsg2" msg="hello" school="wust">
    <template v-slot:qwe> 没事 </template>
    <template v-slot:asd> love you </template>
    <!--context.slots: Proxy(Object) {_: 1, __vInternal: 1, qwe: ƒ, asd: ƒ}-->
  </SetupDemo>
</template>

<script>
import SetupDemo from "./components/SetupDemo";
export default {
  name: "App",
  components: { SetupDemo },
  setup() {
    return {
      showHelloMsg(value) {
        alert(`你好,${value}`);
      },
      showHelloMsg2(value) {
        alert(`未申明的自定义事件,${value}`);
      },
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