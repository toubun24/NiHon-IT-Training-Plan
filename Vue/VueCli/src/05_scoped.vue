<template>
  <div>
    <ScopedStudent />
    <hr />
    <ScopedSchool />
  </div>
</template>

<script>
import ScopedStudent from "@/components/ScopedStudent";
import ScopedSchool from "@/components/ScopedSchool";
export default {
  name: "App",
  components: {
    ScopedSchool,
    ScopedStudent,
  },
}
</script>

<style>
/*
  全局的样式是不需要加scoped
  全局共享
  */
.title {
  color: red;
}
</style>
