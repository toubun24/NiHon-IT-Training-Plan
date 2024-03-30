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
      // todos: [
      //   { id: '001', title: '吃饭', done: false },
      //   { id: '002', title: "睡觉", done: true },
      //   { id: '003', title: '打代码', done: false }
      // ]
      todos: JSON.parse(localStorage.getItem('todos')) || [] // null || [] => [] 确保数组格式
    }
  },
  methods: {
    todoAdd(todo) {
      console.log("add")
      this.todos.unshift(todo)
    },
    todoCheck(id) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.done = !todo.done
    },
    todoDelete(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    todoCheckAll(done) {
      this.todos.forEach(todo => todo.done = done)
    },
    todoClear() {
      this.todos = this.todos.filter(todo => !todo.done)
    }
  },
  watch: {
    todos: {
      deep: true, // 深度监视，当我监视数组中的对象的某个属性的变化它也会产生反应
      handler(newValue) { // newValue
        // 本地存储存的是key和value都是字符串
        // 数据存放在本地存储中
        localStorage.setItem("todos", JSON.stringify(newValue))
      }
    },
  }
}
</script>