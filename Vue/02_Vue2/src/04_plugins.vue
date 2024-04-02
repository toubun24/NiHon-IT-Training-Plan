<template>
  <div>
    <PluginsStudent />
    <hr />
    <PluginsSchool />
  </div>
</template>

<script>
import PluginsStudent from "@/components/PluginsStudent";
import PluginsSchool from "@/components/PluginsSchool";
export default {
  name: "App",
  components: {
    PluginsSchool,
    PluginsStudent,
  },
}
</script>