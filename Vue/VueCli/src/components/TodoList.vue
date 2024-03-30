<template>
    <!--ul-->
    <ul class="demo">
         <!--v-for="todoObj in todos"-->
        <TodoItem
            v-for="todoObj in todos"
            :key="todoObj.id"
            :todo="todoObj"
            :todoCheck="todoCheck"
            :todoDelete="todoDelete"
        />
    </ul>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
    name: 'TodoList',
    components: {
        TodoItem
    },
    props: ['todos', 'todoCheck', 'todoDelete'] // props
}
</script>