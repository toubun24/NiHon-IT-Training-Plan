<template>
  <!--vue3的组件模版结构可以没有根标签-->
  <h1>我是app组件</h1>
  <h1>我叫{{ person.name }}, {{ person.age }}岁</h1>
  <button @click="test">测试触发一次demo的自定义事件</button>
</template>

<script>
// {_uid: 0, _component: {…}, _props: null, _container: null, _context: {…}, …}
// Proxy(Object) {msg: 'hello', school: 'wust'}
// ----@bc
import { reactive } from "vue";
export default {
  name: "SetupDemo",
  beforeCreate() {
    console.log("----@bc");
  },
  props: ["msg", "school"],
  emits: ["hello"], // 申明自定义事件，不申明的话(hello2)会警告
  setup(props, context) {
    console.log(props); //props: 外部给组件丢的参数 => 响应式(Proxy实例) // {_uid: 0, _component: {…}, _props: null, _container: null, _context: {…}, …}
    let person = reactive({
      name: "张三",
      age: 21,
    });

    console.log(context, context.attrs); // 相当于vue2中的$attrs
    // {expose: ƒ} Proxy(Object) {__vInternal: 1, onHello2: ƒ}
    console.log(context, context.slots); // 插槽
    // {expose: ƒ} Proxy(Object) {_: 1, __vInternal: 1, qwe: ƒ, asd: ƒ}

    //返回一个对象
    return {
      person,
      test() {
        context.emit("hello", 666); // 触发自定义事件
        context.emit("hello2", 777); // 触发未申明的自定义事件
        // [Vue warn]: Extraneous non-emits event listeners (hello2) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.
      },
    };
  },
};
</script>

<style>
</style>