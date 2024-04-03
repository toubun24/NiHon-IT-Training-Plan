<template>
  <div class="app"></div>
</template>

<script>
import {
  reactive,
  readonly,
  ref,
  // toRefs,
  isRef,
  isReactive,
  isReadonly,
  isProxy, // 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
} from "vue";
export default {
  name: "App",
  setup() {
    let car = reactive({
      name: "宝马",
      price: 40,
    });

    let sum = ref(0);

    let car2 = readonly(car); ///readonly依然返回代理类型的对象只不过它不能再改而已

    console.log(
      isRef(sum), // true
      isReactive(car), // true
      isReadonly(car2), // true
      isProxy(car), // true
      isProxy(car2), // true
      isProxy(sum) // false
    );
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
.app {
  background: grey;
  padding: 10px;
}
</style>