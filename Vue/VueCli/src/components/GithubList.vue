<template>
    <div class="GithubList" v-show="info.users.length" v-for="user in info.users" :key="user.login">
        <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" style='width: 100px' />
        </a>
        <p class="card-text">{{ user.login }}</p>
    </div>
    <!---欢迎词-->
    <h1 v-show="info.isFirst">Welcome!</h1>
    <!--加载中--->
    <h1 v-show="info.isLoading">Loading...</h1>
    <!---错误信息-->
    <h1 v-show="info.errMsg">Something has been wrong, errorMessage: {{ info.errMsg }}</h1>
    <!--空值搜索：Something has been wrong, errorMessage: Request failed with status code 422-->
</template>

<script>
import pubsub from 'pubsub-js';
export default {
    name: "GithubList",
    data() {
        return {
            info: {
                isFirst: true,
                users: [],
                isLoading: false,
                errMsg: '',
            }
        }
    },
    mounted() {
        this.pubId = pubsub.subscribe('updateData', (_, dataObj) => { // _,
            console.log(`我是list，接到了数据data:`, this.info.users)
            this.info = { ...this.info, ...dataObj } // 解构赋值
        });
    },
    beforeUnmount() {
        pubsub.unsubscribe(this.pubId);
    }
}
</script>