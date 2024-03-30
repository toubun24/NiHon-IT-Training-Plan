<template>
    <div class="demo">
        <li>
            <label>
                <!--这里勾选和取消勾选使用的是change和click作为事件处理-->
                <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
                <!--v-model数据的双向绑定，checkbox使用v-model来双向绑定其是否被勾选,也可以实现效果但不推荐(因为其实修改了props中的数据)-->
                <!--<input type="checkbox" v-model="todo.done"/>-->
                <span>{{ todo.title }}</span>
            </label>
            <button @click="handleDelete(todo.id)">删除</button>
        </li>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: ['todo', 'todoCheck', 'todoDelete'], // props // todo
    methods: {
        handleCheck(id) {
            this.todoCheck(id);
            console.log("check3",id,this.todo)
        },
        handleDelete(id) {
            if (confirm(`确定删除编号为${id}的todo吗`)) { // confirm
                this.todoDelete(id);
            }
        }
    }
}
</script>