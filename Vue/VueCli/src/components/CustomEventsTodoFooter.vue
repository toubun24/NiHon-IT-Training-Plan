<template>
    <div class="demo" v-show="total">
        <label>
            <input type="checkbox" v-model="isAll" />
        </label>
        <span>已完成{{ totalDone }}/全部{{ total }}</span>
        <button @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
export default {
    name: 'CustomEventsTodoFooter',
    // props: ['todos', 'todoCheckAll', 'todoClear'],
    props: ['todos'],
    computed: {
        total() {
            return this.todos.length
        },
        totalDone() {
            return this.todos.reduce((totalTodo, todo) => {
                return totalTodo + todo.done
            }, 0)
        },
        isAll: {
            get() {
                console.log(this.total,this.totalDone)
                return this.total === this.totalDone && this.totalDone > 0
            },
            set(value) {
                console.log("value",value)
                // this.todoCheckAll(value);
                this.$emit('todoCheckAll', value);
            }
        }
    },
    methods: {
        clearAll() {
            // this.todoClear();
            this.$emit('todoClear');
        }
    }
}
</script>