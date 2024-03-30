<template>
  <div>
    <CustomEventsTodoHeader @todoAdd="todoAdd" />
    <PubsubTodoList :todos="todos" :todoCheck="todoCheck" :todoDelete="todoDelete" />
    <CustomEventsTodoFooter :todos="todos" @todoCheckAll="todoCheckAll" @todoClear="todoClear" />
  </div>
</template>

<script>
import CustomEventsTodoHeader from "@/components/CustomEventsTodoHeader";
import PubsubTodoList from "@/components/PubsubTodoList";
import CustomEventsTodoFooter from "@/components/CustomEventsTodoFooter";
import pubsub from "pubsub-js" // npm install pubsub-js --save
export default {
  name: "App",
  components: {
    CustomEventsTodoHeader,
    PubsubTodoList,
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
    // todoDelete(id) {
    todoDelete(_, id) {
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
  },
  mounted() { // mounted
    this.pubId = pubsub.subscribe('todoDelete', this.todoDelete);
  },
  beforeMount() { // 被卸载注意解绑
    pubsub.unsubscribe(this.pubId); // 取消订阅的方式与取消定时器的方式是类似的，记住
  }
}
</script>