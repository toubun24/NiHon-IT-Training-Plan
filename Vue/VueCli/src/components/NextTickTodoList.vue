<template>
    <ul class="demo">
        <NextTickTodoItem
            v-for="todoObj in todos"
            :key="todoObj.id"
            :todo="todoObj"
            :todoCheck="todoCheck"
            :todoDelete="todoDelete"
        />
    </ul>
</template>

<script>
import NextTickTodoItem from "@/components/NextTickTodoItem";
export default {
    name: 'TodoList',
    components: {
        NextTickTodoItem
    },
    props: ['todos', 'todoCheck', 'todoDelete']
}
</script>