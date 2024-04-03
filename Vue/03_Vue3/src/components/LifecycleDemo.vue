<template>
  <h1>当前求和为:{{ sum }}</h1>
  <button @click="sum++">点我加一</button>
  <hr />
</template>

<script>
import {
  ref,
  // onBeforeMount,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onBeforeUnmount,
  // onUnmounted,
} from "vue";
export default {
  name: "LifecycleDemo",
  setup() {
    let sum = ref(0);

    //通过组合式api的形式去使用生命周期钩子
    ///setup()相当于beforeCreate()和created()
    // onBeforeMount(() => {
    //   console.log("----beforeMount----"); // 初始化2 // 显示2 // 代码更新3
    // });
    // onMounted(() => {
    //   console.log("-----mounted-----"); // 初始化3 // 显示3
    // });
    // onBeforeUpdate(() => {
    //   console.log("-----beforeUpdate-----"); // 加一1
    // });
    // onUpdated(() => {
    //   console.log("-----updated-----"); // 加一2 // 代码更新5
    // });
    // onBeforeUnmount(() => {
    //   console.log("-----beforeUnmount----"); // 隐藏1 // 代码更新1
    // });
    // onUnmounted(() => {
    //   console.log("-----unmounted----"); // 隐藏2 // 代码更新4
    // });

    console.log("-----setup----"); // 初始化1 // 显示1 // 代码更新2

    //返回一个对象
    return {
      sum,
    };
  },
  //使用配置项的形式使用生命周期钩子
  beforeCreate() {
    console.log('----beforeCreate!!----');
  },
  created() {
    console.log('----created!!----');
  },
  beforeMount() {
    console.log('----beforeMount----');
  },
  mounted() {
    console.log('-----mounted-----');
  },
  beforeUpdate() {
    console.log('-----beforeUpdate-----')
  },
  updated() {
    console.log('-----updated-----');
  },
  beforeUnmount() {
    console.log('-----beforeUnmount----');
  },
  unmounted() {
    console.log('-----unmounted----');
  }
};
</script>

<style>
</style>