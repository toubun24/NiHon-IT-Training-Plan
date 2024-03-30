<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <GlobalEventSchool />
    <GlobalEventStudent />
  </div>
</template>

<script>
import GlobalEventStudent from "@/components/GlobalEventStudent";
import GlobalEventSchool from "@/components/GlobalEventSchool";
export default {
  name: "App",
  components: {
    GlobalEventSchool,
    GlobalEventStudent,
  },
  data() {
    return {
      msg: 'helloこんにちは',
      studentName: ''
    }
  }
}
</script>

<style>
/*
  全局的样式是不需要加scoped
  全局共享
  */
.app {
  background: gray;
  padding: 5px;
}
</style>
