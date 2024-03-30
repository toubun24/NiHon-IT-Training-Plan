<template>
    <div class="demo">
        <input type="text" placeholder="请输入待办事项并按回车" v-model="inputValue" @keyup.enter="add" />
    </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
    name: 'CustomEventsTodoHeader',
    data() {
        return {
            inputValue: '',
        }
    },
    methods: {
        add() {
            // console.log(this.inputValue)
            if (!this.inputValue.trim()) {
                alert('输入不能为空')
                return
            }
            const todoItem = {
                id: nanoid(),
                title: this.inputValue,
                done: false
            }
            // this.todoAdd(todoItem)
            this.$emit('todoAdd', todoItem) // ,todoItem传参数
            this.inputValue = ''
        }
    },
    // props: ['todoAdd']
}
</script>