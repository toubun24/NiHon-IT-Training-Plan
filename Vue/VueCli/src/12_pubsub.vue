<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <PubsubSchool />
    <PubsubStudent />
  </div>
</template>

<script>
import PubsubStudent from "@/components/PubsubStudent";
import PubsubSchool from "@/components/PubsubSchool";
export default {
  name: "App",
  components: {
    PubsubSchool,
    PubsubStudent,
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
