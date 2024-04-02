<template>
    <div class="demo">
        <h2 @click="showName">学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
        <h2>xy:{{ x }},{{ y }}</h2>
    </div>
</template>

<script>
import { mixin, shareData } from "@/mixin" // 引入混合
export default {
    name: 'SchoolDemo',
    data() {
        console.log(this)
        return {
            name: 'testname',
            address: '@japan',
            x: 666 // 如果混合中配置了与data(或者配置了相同的methods)相同的属性值，则以你的配置的属性为主(而不以mixin为主)
        }
    },
    mounted(){
        console.log('另一种你好') // 但对于生命周期钩子是都会保存的(混合的钩子比你配置的钩子先跑)
    },
    mixins: [mixin, shareData] // []
}
</script>