<template>
  <div>
    <VuexModularCount />
    <hr />
    <VuexModularPerson />
  </div>
</template>

<script>
import VuexModularCount from "@/components/VuexModularCount";
import VuexModularPerson from "@/components/VuexModularPerson";
export default {
  name: "App",
  components: {
    VuexModularCount,
    VuexModularPerson
  },
  mounted() {
    console.log('App', this);
  }
}
</script>
<style lang="css" scoped></style>
