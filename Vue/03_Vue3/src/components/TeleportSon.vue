<template>
  <div class="son">
    <h2>son(孙)</h2>
    <!-- <h3>从app组件获取的数据:{{ car.name }} --- {{ car.price }}</h3> -->
    <TeleportDialog />
  </div>
</template>

<script>
// import { inject } from "vue";
import TeleportDialog from "./TeleportDialog";
export default {
  name: "TeleportSon",
  components: { TeleportDialog },
  // setup() {
  //   let car = inject("car");
  //   console.log("SonDemo", car);
  //   return {
  //     car,
  //   };
  // },
};
</script>

<style scoped>
.son {
  background: orange;
  padding: 10px;
}
</style>