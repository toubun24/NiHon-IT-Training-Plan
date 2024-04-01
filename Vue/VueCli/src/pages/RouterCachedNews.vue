<template>
  <ul>
    <!-- <li>news001</li>
    <li>news002</li>
    <li>news003</li> -->
    <li>news001<input type="text" /></li>
    <li>news002<input type="text" /></li>
    <li>news003<input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "RouterCachedNews",
  // new
  // beforeDestroy() { // Vue 2
  beforeUnmount() {
    // Vue 3
    console.log("News组件将要被销毁");
  },
};
</script>

<style scoped></style>