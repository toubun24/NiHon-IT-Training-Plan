<template>
  <ul>
    <!-- <li>消息编号:{{ $route.params.id }}</li>
    <li>消息标题:{{ $route.params.title }}</li> -->
    <li>消息编号:{{ id }}</li>
    <li>消息标题:{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: "RouterPropsDetail",
  props: ['id', 'title'], // new
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style scoped></style>