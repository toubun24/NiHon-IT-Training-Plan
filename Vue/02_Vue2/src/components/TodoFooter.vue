<template>
    <!--v-show="total"用于根据表达式的真假值来切换元素的display CSS属性。如果表达式的值为真，则元素会被显示；如果为假，则元素会被隐藏-->
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
    name: 'TodoFooter',
    props: ['todos', 'todoCheckAll', 'todoClear'], // props
    computed: {
        total() {
            return this.todos.length
        },
        totalDone() {
            return this.todos.reduce((totalTodo, todo) => { // reduce()对数组中的每个元素执行一个reducer函数,并将结果累积为一个单一的输出
                return totalTodo + todo.done // 隐式类型转换，true == 1
            }, 0)
        },
        isAll: { // v-model
            get() {
                console.log(this.total,this.totalDone)
                return this.total === this.totalDone && this.totalDone > 0
            },
            set(value) { // value注意要么为true，要么为false，因为你是把它应用在了checkbox上
                console.log("value",value)
                this.todoCheckAll(value);
            }
        }
    },
    methods: {
        clearAll() {
            this.todoClear();
        }
    }
}
</script>