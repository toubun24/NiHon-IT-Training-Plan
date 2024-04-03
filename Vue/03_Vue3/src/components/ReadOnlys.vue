<template>
  <!--from ToRefs.vue-->
  <h2>sumReadonly当前求和为:{{ sumReadonly }}</h2>
  <button @click="sumReadonly++">sum+1</button>
  <h2>sumShallowReadonly当前求和为:{{ sumShallowReadonly }}</h2>
  <button @click="sumShallowReadonly++">sum+1</button>
  <hr />
  <!--<=new-->
  <!-- <h2>{{ personReadonly }}</h2> -->
  <h2>personReadonly:{{ name }}, {{ age }}, {{ salary }}K</h2>
  <h2>salary薪资:{{ salary }}K</h2>
  <h2>job.j1.salary薪资:{{ job.j1.salary }}K</h2>
  <button @click="name = name + '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">job.j1.salary增长薪资(不刷新)</button>
  <button @click="salary++">salary增长薪资(不刷新)</button>
  <!-- <h2>{{ personShallowReadonly }}</h2> -->
  <h2>personShallowReadonly:{{ name2 }}, {{ age2 }}, {{ salary2 }}K</h2>
  <h2>salary2薪资:{{ salary2 }}K</h2>
  <h2>job2.j12.salary2薪资:{{ job2.j12.salary2 }}K</h2>
  <button @click="name2 = name2 + '~'">修改姓名</button>
  <button @click="age2++">增长年龄</button>
  <button @click="job2.j12.salary2++">job2.j12.salary2增长薪资(刷新)</button>
  <button @click="salary2++">salary2增长薪资(不刷新)</button>
  <!-- <h2>toRef:{{ nameToRef }}, {{ ageToRef }}, {{ salaryToRef }}K</h2>
  <h2>Ref:{{ nameRef }}, {{ ageRef }}, {{ salaryRef }}K</h2> -->
</template>

<script>
// import { ref, reactive, toRef, toRefs } from "vue";
import { ref, reactive, toRefs, readonly, shallowReadonly } from "vue";
export default {
  name: "ReadOnlys",
  setup() {
    let sumReadonly = ref(0);
    let sumShallowReadonly = ref(0);

    let personReadonly = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    let personShallowReadonly = reactive({
      name2: "李四",
      age2: 180,
      job2: {
        j12: {
          salary2: 200,
        },
      },
    });

    // const name1 = person.name;
    // console.log("@@@@@", name1);
    // const name2 = toRef(person, name);
    // console.log("####", name2);
    // const x = toRefs(person);
    // console.log(x);
    personReadonly = readonly(personReadonly); //此时person里面的属性值都不允许修改
    personShallowReadonly = shallowReadonly(personShallowReadonly); //第一层不能改(name,age), 但j1和salary仍然可以改动

    sumReadonly = readonly(sumReadonly); //同理
    sumShallowReadonly = shallowReadonly(sumShallowReadonly);

    return {
      // person,
      // nameToRef: toRef(person, "name"),
      // ageToRef: toRef(person, "age"),
      // salaryToRef: toRef(person.job.j1, "salary"),
      // ...toRefs(person),
      // salary: toRef(person.job.j1, "salary"),
      // nameRef: ref(person.name),
      // ageRef: ref(person.age),
      // salaryRef: ref(person.job.j1.salary),
      sumReadonly,
      sumShallowReadonly,
      ...toRefs(personReadonly),
      ...toRefs(personShallowReadonly),
    };
  },
};
</script>

<style>
</style>