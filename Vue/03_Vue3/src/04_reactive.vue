<template>
  <h1>我是app组件</h1>
  <!-- <h1>我叫{{ name }}, {{ age }}岁</h1>
  <h3>职位:{{ job.type }}</h3>
  <h3>薪水:{{ job.salary }}</h3>
  <h3>测试:{{ test }}</h3> -->
  <!--new-->
  <h1>我叫{{ person.name }}, {{ person.age }}岁</h1>
  <h3>职位:{{ person.type }}</h3>
  <h3>薪水:{{ person.salary }}</h3>
  <h3>爱好:{{ person.hobbies }}</h3>
  <h4>测试的数据c:{{ person.a.b.c }}</h4>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
// import { ref } from "vue";
import { reactive } from 'vue';
export default {
  name: "App",
  setup() {
    // let name = ref("张三");
    // let age = ref(21);
    // let job = ref({
    //   type: "frontend developer",
    //   salary: "30",
    // });
    // let test = "test";
    let person = reactive({
      name: '张三',
      age: 21,
      type: 'frontend developer',
      salary: '30',
      hobbies: ['抽烟', '喝酒', '烫头'],
      a:{
        b:{
          c: 666 // React中此处需要深复制
        }
      }
    });

    function changeInfo() {
      // console.log("1",name, age);
      // name.value = "李四";
      person.name = '李四';
      // age.value = 42;
      person.age = 42;
      // job.value.type = "UI developer";
      person.type = 'UI developer';
      // test = "yes";
      // console.log("2",name, age);
      // 测试reactive能否监测深层次变化
      person.a.b.c = 100; // React中此处需要深复制
      person.hobbies[0] = 'play tennis';
    }

    return {
      // name,
      // age,
      // job,
      changeInfo,
      // test
      person
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>