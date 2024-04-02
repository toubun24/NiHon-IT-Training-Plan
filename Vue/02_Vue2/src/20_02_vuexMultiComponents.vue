<template>
  <div>
    <VuexMultiCount />
    <hr />
    <VuexMultiPerson />
  </div>
</template>

<script>
import VuexMultiCount from "@/components/VuexMultiCount";
import VuexMultiPerson from "@/components/VuexMultiPerson";
export default {
  name: "App",
  components: {
    VuexMultiCount,
    VuexMultiPerson
  },
  mounted() {
    console.log('App', this);
  }
}
</script>
<style lang="css" scoped></style>
