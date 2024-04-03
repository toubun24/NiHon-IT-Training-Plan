<template>
  <!-- <h1>当前求和为:{{ sum }}</h1>
  <button @click="sum++">点我加一</button>
  <hr />
  <h2>当前的信息为:{{ msg }}</h2>
  <button @click="msg += '!'">修改信息</button>
  <hr /> -->
  <h2>{{ person }}</h2>
  <!-- <=new -->
  <!-- <h2>姓名:{{ person.name }}</h2> -->
  <h2>姓名:{{ name }}</h2>
  <!-- <h2>年龄:{{ person.age }}</h2> -->
  <h2>年龄:{{ age }}</h2>
  <!-- <h2>薪资:{{ person.job.j1.salary }}K</h2> -->
  <h2>薪资:{{ salary }}K</h2>
  <!-- <button @click="person.name = person.name + '~'">修改姓名</button> -->
  <button @click="name = name + '~'">修改姓名</button>
  <!-- <button @click="person.age++">增长年龄</button> -->
  <button @click="age++">增长年龄</button>
  <!-- <button @click="person.job.j1.salary++">增长薪资</button> -->
  <button @click="salary++">增长薪资</button>
  <h2>toRef:{{ nameToRef }}, {{ ageToRef }}, {{ salaryToRef }}K</h2>
  <h2>Ref:{{ nameRef }}, {{ ageRef }}, {{ salaryRef }}K</h2>
</template>

<script>
// import { ref, watch, watchEffect } from "vue";
import { ref, reactive, toRef, toRefs } from "vue";
export default {
  name: "ToRefs",
  setup() {
    // let sum = ref(0);
    // let msg = ref("你好");
    // let person = ref({
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    //ref类型的值在模板里使用是不需要.value来取的
    const name1 = person.name; //注意输出字符串，并不是响应式的数据
    console.log("@@@@@", name1);
    const name2 = toRef(person, name); //RefImpl 这里的name2与person.name是完全一模一样的(你改这里的name2与你改person.name是一码事),且数据还是响应式的 // 'name' is deprecated.Vetur(6385)
    console.log("####", name2);
    const x = toRefs(person);
    console.log(x);

    // watch(
    //   sum,
    //   (nv, ov) => {
    //     console.log(nv, ov);
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    // watchEffect(() => {
    //   console.log(`watch effect指定的回调执行了！！`);
    //   const x1 = sum.value;
    //   const x2 = person.value.job.j1.salary;
    //   console.log(x1, x2);
    // });

    //返回一个对象(toRef是引用 name就是person.name且为响应式)
    //toRef处理一个，而toRefs处理一群
    //大白话:toRef(s)就是方便我们把响应式数据(ref,reactive)展开丢出去，方便在模版中应用
    return {
      // sum,
      // msg,
      person,
      nameToRef: toRef(person, "name"),
      ageToRef: toRef(person, "age"),
      salaryToRef: toRef(person.job.j1, "salary"),
      ...toRefs(person),
      salary: toRef(person.job.j1, "salary"), //toRef可以与toRefs连用,更加方便
      //注意千万不能这样写
      //一旦这样写就与元数据分离了,改name不会引起person.name的变化(因为ref把name值包装成了一个refImpl对象)
      nameRef: ref(person.name),
      ageRef: ref(person.age),
      salaryRef: ref(person.job.j1.salary),
    };
  },
};
</script>

<style>
</style>