<template>
  <StudentDemo name="name" sex="男" :age="12" num="13"/>
</template>

<script>
import StudentDemo from './components/StudentDemo.vue'

export default {
  name: 'App',
  components: {
    StudentDemo
  },
  // methods: {}
}
</script>