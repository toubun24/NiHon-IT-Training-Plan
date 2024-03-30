<template>
    <div class="demo">
        <h2>学校名称:{{ name }}</h2>
        <h2>学校地址: {{ address }}</h2>
    </div>
</template>

<script>
export default {
    name: "GlobalEventSchool",
    data() {
        console.log(this);
        return {
            name: 'Osaka university',
            address: 'Tokyo'
        }
    },
    mounted() {
        console.log('School', this);
        this.$bus.$on('hello', (data) => {
            console.log(`我是School组件,我收到了数据,${data}`);
        })
    },
    // beforeDestroy() { // error  The `beforeDestroy` lifecycle hook is deprecated. Use `beforeUnmount` instead  vue/no-deprecated-destroyed-lifecycle
    beforeUnmount() {
        this.$bus.$off('hello'); //销毁解绑
    }
}
</script>

<style scoped>
/*scoped代表局部的*/
.demo {
    background: skyblue;
    padding: 5px
}
</style>