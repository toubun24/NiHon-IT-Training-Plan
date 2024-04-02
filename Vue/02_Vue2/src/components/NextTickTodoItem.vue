<template>
    <div class="demo">
        <li>
            <label>
                <!--<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />-->
                <input type="text" :value="todo.title" v-show="todo.isEdit" @blur="handleBlur(todo, $event)"
                    ref="inputTitle" />
                <!--<span>{{ todo.title }}</span>-->
                <span v-show="!todo.isEdit">{{ todo.title }}</span>
            </label>
            <button @click="handleDelete(todo.id)">删除</button>
            <button v-show="!todo.isEdit" @click="handleEdit(todo)">编辑</button>
        </li>
    </div>
</template>

<script>
import pubsub from "pubsub-js"
export default {
    name: 'NextTickTodoItem',
    props: ['todo', 'todoCheck'],
    methods: {
        handleCheck(id) {
            this.todoCheck(id);
            // console.log("check3", id, this.todo)
        },
        handleDelete(id) {
            if (confirm(`确定删除编号为${id}的todo吗`)) {
                pubsub.publish('todoDelete', id)
            }
        },
        handleEdit(todo) {
            // // todo.isEdit = true; // 注意这里添加的数据并不是响应式的 一定清楚
            if (Object.prototype.hasOwnProperty.call(todo, 'isEdit')) {
                todo.isEdit = true;
            } else {
                // this.$set(todo, 'isEdit', true); //保证初次加入的时候存在响应式的数据
                todo.isEdit = true; // 在 Vue 3 中，只要 myObject 是响应式的（例如，它是一个 reactive 或 ref 的结果），那么新添加的 newProperty 也将是响应式的
            }
            // 自动获取焦点
            // this.$refs.inputTitle.focus(); //此时你这行代码执行了，但是注意vue并没有重新解析模版(input并没有出现在页面上，dom节点并没有被更新)，它一定要等这个回调函数执行完之后才会去重新渲染模版
            // 使用nextTick来解决
            this.$nextTick(() => {
                //这里的回调函数注意是在dom节点被更新之后才会运行的
                this.$refs.inputTitle.focus();
            })
            console.log(todo);
        },
        // 失去焦点回调
        handleBlur(todo, e) {
            todo.isEdit = false; // 注意我在这里确保你身上一定存在isEdit属性
            if (!e.target.value.trim()) {
                alert('输入不能为空');
                return;
            }
            // this.$bus.$emit('updateTodo', todo.id, e.target.value);
            console.log(todo.id, e.target.value)
            pubsub.publish('todoUpdate', [todo.id, e.target.value])
        }
    }
}
</script>