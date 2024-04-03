<template>
  <!-- new=> -->
  <!-- <h2>当前的y是:{{ x.y }}</h2> -->
  <h2>当前的xRefY.y是:{{ xRefY.y }}</h2>
  <h2>当前的xShallowRefY.y是:{{ xShallowRefY.y }}</h2>
  <!-- <button @click="x = { y: 888 }">点我替换x</button> -->
  <button @click="xRefY = { y: 888 }">点我替换xRefY(刷新)</button>
  <button @click="xShallowRefY = { y: 888 }">点我替换xShallowRefY(刷新)</button>
  <!-- <button @click="x.y++">点我y+1</button> -->
  <button @click="xRefY.y++">点我xRefY.y+1(刷新)</button>
  <button @click="xShallowRefY.y++">点我xShallowRefY.y+1(不刷新)</button>
  <hr />
  <!-- <=new -->
  <h2>shallowReactive:{{ person }}</h2>
  <h2>姓名:{{ name }}</h2>
  <h2>年龄:{{ age }}</h2>
  <!-- <h2>薪资:{{ salary }}K</h2> -->
  <h2>薪资:{{ job.j1.salary }}K</h2>
  <button @click="name = name + '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="salary++">增长薪资(不刷新)</button>
  <!-- <h2>toRef:{{ nameToRef }}, {{ ageToRef }}, {{ salaryToRef }}K</h2>
  <h2>Ref:{{ nameRef }}, {{ ageRef }}, {{ salaryRef }}K</h2> -->
  <h2>reactive:{{ name2 }}, {{ age2 }}, {{ salary2 }}K</h2>
  <button @click="name2 = name2 + '~'">修改姓名</button>
  <button @click="age2++">增长年龄</button>
  <button @click="salary2++">增长薪资(甚至取不到值)</button>
  <!-- <h2>ref:{{ name3 }}, {{ age3 }}, {{ salary3 }}K</h2>
  <button @click="name3 = name3 + '~'">修改姓名</button>
  <button @click="age3++">增长年龄</button>
  <button @click="salary3++">增长薪资</button> -->
</template>

<script>
// import { ref, reactive, toRef, toRefs } from "vue";
import { ref, reactive, toRefs, shallowReactive, shallowRef } from "vue";
export default {
  name: "ShallowRes",
  setup() {
    //shallowReactive只考虑对象类型的第一层数据响应式
    let personShallowReactive = shallowReactive({
      name: "李四",
      age: 180,
      job: {
        j1: {
          salary: 200,
        },
      },
    });

    let person = reactive({
      name2: "张三",
      age2: 18,
      job2: {
        j12: {
          salary2: 20, // ShallowRes.vue:13 [Vue warn]: Property "salary2" was accessed during render but is not defined on instance.
        },
      },
    });

    // let personRef = ref({
    //   name3: "王五",
    //   age3: 81,
    //   job3: {
    //     j13: {
    //       salary3: 2,
    //     },
    //   },
    // });

    // const name1 = person.name;
    // console.log("@@@@@", name1);
    // const name2 = toRef(person, name);
    // console.log("####", name2);
    // const x = toRefs(person);

    let xRef = ref(0);
    //传递基本类型来说,ref与shallowRef基本是没什么区别的
    let xShallowRef = shallowRef(0);
    //但注意对象类型shallowRef不去处理，而ref底层回去借助reactive生成proxy对象(getter/setter)
    //但注意不管是shallowR还是非shallow, 第一层都是响应式的(不如下面的x依然是响应式数据)
    let xRefY = ref({ y: 0 });
    let xShallowRefY = shallowRef({ y: 0 });
    console.log(
      "xRef",
      xRef,
      "xShallowRef",
      xShallowRef,
      "xRefY",
      xRefY,
      "xShallowRefY",
      xShallowRefY
    );

    return {
      person,
      // nameToRef: toRef(person, "name"),
      // ageToRef: toRef(person, "age"),
      // salaryToRef: toRef(person.job.j1, "salary"),
      // ...toRefs(person),
      // salary: toRef(person.job.j1, "salary"),
      // nameRef: ref(person.name),
      // ageRef: ref(person.age),
      // salaryRef: ref(person.job.j1.salary),
      ...toRefs(person),
      ...toRefs(personShallowReactive),
      // ...toRefs(personRef), // [Vue warn] toRefs() expects a reactive object but received a plain one.
      // x,
      xRef,
      xShallowRef,
      xRefY,
      xShallowRefY,
    };
  },
};
</script>

<style>
</style>