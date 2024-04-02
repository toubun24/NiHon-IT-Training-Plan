<template>
  <DemoStudent name="name" sex="男" :age="12" num="13"/>
</template>

<script>
import DemoStudent from './components/DemoStudent.vue'

export default {
  name: 'App',
  components: {
    DemoStudent
  },
  // methods: {}
}
</script>