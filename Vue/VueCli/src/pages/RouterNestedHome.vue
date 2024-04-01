<template>
    <h2>我是Home的内容</h2>
    <!-- new -->
    <div>
        <ul class="nav nav-tabs">
            <li>
                <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
            </li>
            <li>
                <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
            </li>
        </ul>
        <!-- router-view用于渲染当前路由匹配的组件 -->
        <router-view>
        </router-view>
    </div>
</template>

<script>
export default {
    name: "RouterNestedHome"
}
</script>

<style scoped></style>