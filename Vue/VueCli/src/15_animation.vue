<template>
  <div id="root">
    <AnimationI />
    <AnimationII />
    <AnimationIII />
  </div>
</template>

<script>
import AnimationI from "@/components/AnimationI";
import AnimationII from "@/components/AnimationII";
import AnimationIII from "@/components/AnimationIII";
export default {
  name: "App",
  components: {
    AnimationI,
    AnimationII,
    AnimationIII
  },
}
</script>
