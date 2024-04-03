<template>
  <h2>当前求和为:{{ sum }}</h2>
  <button @click="sum++">sum+1</button>
  <hr />
  <h2>{{ person }}</h2>
  <h2>姓名:{{ name }}</h2>
  <h2>年龄:{{ age }}</h2>
  <!-- <h2>薪资:{{ salary }}K</h2> -->
  <h2>薪资:{{ job.j1.salary }}K</h2>
  <button @click="name = name + '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <!-- <button @click="salary++">增长薪资</button> -->
  <button @click="job.j1.salary++">增长薪资</button>
  <!-- <h2>toRef:{{ nameToRef }}, {{ ageToRef }}, {{ salaryToRef }}K</h2>
  <h2>Ref:{{ nameRef }}, {{ ageRef }}, {{ salaryRef }}K</h2> -->
  <!--new-->
  <button @click="showRawPerson">输出最原始的person</button>
  <button @click="addCar">给人添加一台车</button>
  <button @click="person.car && (person.car.name += '!')">换车名</button>
  <button @click="changePrice">换价格</button>
  <h3 v-show="person.car">座驾信息:{{ person.car }}</h3>
</template>

<script>
// import { ref, reactive, toRef, toRefs } from "vue";
import { markRaw, reactive, ref, toRaw, toRefs } from "vue";
export default {
  name: "RawsDemo",
  setup() {
    let sum = ref(0);
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    // const name1 = person.name;
    // console.log("@@@@@", name1);
    // const name2 = toRef(person, name);
    // console.log("####", name2);
    // const x = toRefs(person);
    // console.log(x);

    const showRawPerson = () => {
      const p = toRaw(person);
      // console.log(person); //proxy代理对象 Proxy {....}
      p.age++; //注意此时页面不会再发生变化了,普普通通的对象不是响应式
      console.log(p); //原始对象数据  {....}
      // const sum  = toRaw(sum);
      // console.log(sum); //undefined //这条路走不通,toRaw只处理reactive对象
    };

    const addCar = () => {
      person.car = markRaw({
        name: "benz",
        price: 40,
      }); //在响应式的对象身上添加任何属性都是响应式的，经过markRaw一包装就变成最原始的数据就不会再做响应
    };

    const changePrice = () => {
      person.car?.price && person.car.price++;
      console.log(person?.car?.price);
    };

    return {
      sum,
      person,
      // nameToRef: toRef(person, "name"),
      // ageToRef: toRef(person, "age"),
      // salaryToRef: toRef(person.job.j1, "salary"),
      ...toRefs(person),
      // salary: toRef(person.job.j1, "salary"),
      // nameRef: ref(person.name),
      // ageRef: ref(person.age),
      // salaryRef: ref(person.job.j1.salary),
      showRawPerson,
      addCar,
      changePrice,
    };
  },
};
</script>

<style>
</style>