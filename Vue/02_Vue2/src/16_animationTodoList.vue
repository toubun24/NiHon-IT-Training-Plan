<template>
  <div>
    <CustomEventsTodoHeader @todoAdd="todoAdd" />
    <AnimationTodoList :todos="todos" :todoCheck="todoCheck" />
    <CustomEventsTodoFooter :todos="todos" @todoCheckAll="todoCheckAll" @todoClear="todoClear" />
  </div>
</template>

<script>
import CustomEventsTodoHeader from "@/components/CustomEventsTodoHeader";
import AnimationTodoList from "@/components/AnimationTodoList";
import CustomEventsTodoFooter from "@/components/CustomEventsTodoFooter";
import pubsub from "pubsub-js"
export default {
  name: "App",
  components: {
    CustomEventsTodoHeader,
    AnimationTodoList,
    CustomEventsTodoFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {
    todoAdd(todo) {
      // console.log("add")
      this.todos.unshift(todo)
    },
    todoCheck(id) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.done = !todo.done
    },
    todoDelete(_, id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    todoCheckAll(done) {
      this.todos.forEach(todo => todo.done = done)
    },
    todoClear() {
      this.todos = this.todos.filter(todo => !todo.done)
    },
    todoUpdate(_, idTitle) { // pubsub => _,
      console.log("app", "id", idTitle[0], "title", idTitle[1])
      this.todos.forEach(todo => {
        if (todo.id === idTitle[0]) todo.title = idTitle[1];
      })
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
  mounted() {
    this.pubId = pubsub.subscribe('todoDelete', this.todoDelete);
    this.pubId2 = pubsub.subscribe('todoUpdate', this.todoUpdate);
  },
  beforeMount() {
    pubsub.unsubscribe(this.pubId);
    pubsub.unsubscribe(this.pubId2);
  }
}
</script>