<template>
  <div>
    <VuexCount />
  </div>
</template>

<script>
import VuexCount from "@/components/VuexCount";
export default {
  name: "App",
  components: {
    VuexCount
  },
  mounted() {
    console.log('App', this);
  }
}
</script>
<style lang="css" scoped></style>
