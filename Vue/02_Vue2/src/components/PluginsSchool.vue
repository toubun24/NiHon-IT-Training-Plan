<template>
    <div>
        <!--<h2>学校名称:{{ name | mySlice }}</h2>-->
        <h2>学校名称:{{ mySlice }}</h2>
        <h2>学校地址: {{ address }}</h2>
        <button @click="test">点我测试一下hello</button>
    </div>
</template>

<script>
export default {
    name: "PluginsSchool",
    data() {
        console.log(this);
        return {
            name: 'Osaka university',
            address: 'Tokyo'
        }
    },
    methods: {
        test() {
            this.hello();
        }
    }
}
</script>