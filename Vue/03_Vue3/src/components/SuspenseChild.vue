<template>
  <div class="child">
    <h2>child(子)</h2>
    {{ sum }}
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SuspenseChild",
  async setup() {
    let sum = ref(0);

    // let p = new Promise((resolve, reject) => { // error 'reject' is defined but never used  no-unused-vars
    let p = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sum,
        });
      }, 1000);
    });

    return await p;
  },
};
</script>

<style scoped>
.child {
  background: skyblue;
  padding: 10px;
}
</style>