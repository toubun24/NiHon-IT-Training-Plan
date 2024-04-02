<template>
    <div class="demo">
        <!--@keyup.enter="add"-->
        <!--v-model="inputValue"-->
        <input type="text" placeholder="请输入待办事项并按回车" v-model="inputValue" @keyup.enter="add" />
    </div>
</template>

<script>
import { nanoid } from 'nanoid' // {}
export default {
    name: 'TodoHeader',
    data() {
        return {
            inputValue: '',
        }
    },
    methods: {
        add() {
            console.log(this.inputValue)
            if (!this.inputValue.trim()) { // trim
                alert('输入不能为空')
                return
            }
            const todoItem = {
                id: nanoid(), // nanoid
                title: this.inputValue, // trim
                done: false
            }
            this.todoAdd(todoItem)
            this.inputValue = ''
        }
    },
    props: ['todoAdd'] // props
}
</script>