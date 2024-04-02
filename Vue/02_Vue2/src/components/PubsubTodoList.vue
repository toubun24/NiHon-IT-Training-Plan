<template>
    <ul class="demo">
        <!--<PubsubTodoItem
            v-for="todoObj in todos"
            :key="todoObj.id"
            :todo="todoObj"
            :todoCheck="todoCheck"
            :todoDelete="todoDelete"
        />-->
        <PubsubTodoItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" :todoCheck="todoCheck" />
    </ul>
</template>

<script>
import PubsubTodoItem from "@/components/PubsubTodoItem";
export default {
    name: 'TodoList',
    components: {
        PubsubTodoItem
    },
    //props: ['todos', 'todoCheck', 'todoDelete']
    props: ['todos', 'todoCheck']
}
</script>