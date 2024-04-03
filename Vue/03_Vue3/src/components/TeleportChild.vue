<template>
  <div class="child">
    <h2>child(子)</h2>
    <TeleportSon />
  </div>
</template>

<script>
import TeleportSon from "./TeleportSon";
// import { inject } from "vue";
export default {
  name: "TeleportChild",
  components: { TeleportSon },
  // setup() {
  //   console.log("ChildDemo Car ", inject("car"));
  // },
};
</script>

<style scoped>
.child {
  background: skyblue;
  padding: 10px;
}
</style>