<template>
  <div>
    <!--<TodoHeader :todoAdd="todoAdd" />-->
    <CustomEventsTodoHeader @todoAdd="todoAdd" />
    <TodoList :todos="todos" :todoCheck="todoCheck" :todoDelete="todoDelete" />
    <!--<TodoFooter :todos="todos" :todoCheckAll="todoCheckAll" :todoClear="todoClear" />-->
    <CustomEventsTodoFooter :todos="todos" @todoCheckAll="todoCheckAll" @todoClear="todoClear" />
  </div>
</template>

<script>
import CustomEventsTodoHeader from "@/components/CustomEventsTodoHeader";
import TodoList from "@/components/TodoList";
import CustomEventsTodoFooter from "@/components/CustomEventsTodoFooter";
export default {
  name: "App",
  components: {
    CustomEventsTodoHeader,
    TodoList,
    CustomEventsTodoFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
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
      deep: true,
      handler(newValue) {
        localStorage.setItem("todos", JSON.stringify(newValue))
      }
    },
  }
}
</script>