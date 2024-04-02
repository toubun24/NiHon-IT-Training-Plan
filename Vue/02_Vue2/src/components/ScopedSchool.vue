<template>
    <div class="demo">
        <h2>学校名称:{{ name }}</h2>
        <h2>学校地址: {{ address }}</h2>
    </div>
</template>

<script>
export default {
    name: "ScopedSchool",
    data() {
        console.log(this);
        return {
            name: 'Osaka university',
            address: 'Tokyo'
        }
    },
}
</script>

<style scoped>
/*scoped代表局部的*/
.demo {
    background: skyblue;
}
</style>