<template>
  <div class="child">
    <h2>child(子)</h2>
    <SonDemo/>
  </div>
</template>

<script>
import SonDemo from "./SonDemo";
import { inject } from "vue";

export default {
  name: "ChildDemo",
  components: {SonDemo},
  setup() {
    console.log('ChildDemo Car ', inject('car')) // inject
  }
}
</script>

<style scoped>
   .child{
     background: skyblue;
     padding: 10px;
   }
</style>