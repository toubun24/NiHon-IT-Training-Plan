<template>
  <div>
    <TodoHeader :todoAdd="todoAdd" />
    <TodoList :todos="todos" :todoCheck="todoCheck" :todoDelete="todoDelete" />
    <TodoFooter :todos="todos" :todoCheckAll="todoCheckAll" :todoClear="todoClear" />
  </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader";
import TodoList from "@/components/TodoList";
import TodoFooter from "@/components/TodoFooter";
export default {
  name: "App",
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todos: [
        { id: '001', title: '吃饭', done: false },
        { id: '002', title: "睡觉", done: true },
        { id: '003', title: '打代码', done: false }
      ]
    }
  },
  methods: { // 绑定给子组件
    todoAdd(todo) {
      console.log("add")
      this.todos.unshift(todo) // unshift用于向数组的开头添加一个或多个元素，并返回新的数组长度
    },
    todoCheck(id) {
      const todo = this.todos.find(todo => todo.id === id) // find，当结果确定为一项时不要用filter，否则会返回数组
      // console.log("check1", id,todo,todo.done)
      todo.done = !todo.done
      // console.log("check2", id,todo,todo.done)
    },
    todoDelete(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    todoCheckAll(done) { // 这里传入的done是全选按钮的勾选情况，并将其应用到全部todos
      this.todos.forEach(todo => todo.done = done) // forEach
    },
    todoClear() {
      this.todos = this.todos.filter(todo => !todo.done)
    }
  }
}
</script>