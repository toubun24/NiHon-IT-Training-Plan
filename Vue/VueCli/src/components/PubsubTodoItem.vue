<template>
    <div class="demo">
        <li>
            <label>
                <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
                <span>{{ todo.title }}</span>
            </label>
            <button @click="handleDelete(todo.id)">删除</button>
        </li>
    </div>
</template>

<script>
import pubsub from "pubsub-js" // npm install pubsub-js --save
export default {
    name: 'PubsubTodoItem',
    // props: ['todo', 'todoCheck', 'todoDelete'],
    props: ['todo', 'todoCheck'],
    methods: {
        handleCheck(id) {
            this.todoCheck(id);
            console.log("check3",id,this.todo)
        },
        handleDelete(id) {
            if (confirm(`确定删除编号为${id}的todo吗`)) {
                // this.todoDelete(id);
                pubsub.publish('todoDelete', id)
            }
        }
    }
}
</script>