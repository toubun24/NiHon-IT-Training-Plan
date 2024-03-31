<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyword"
                @keyup.enter="searchUsers" />&nbsp;
            <button @click="searchUsers">Search</button>
        </div>
    </section>
</template>

<script>
import pubsub from "pubsub-js";
// import axios from "axios";
export default {
    name: "GithubSearch",
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        searchUsers() {
            pubsub.publish('updateData', {
                isFirst: false,
                isLoading: true,
                errMsg: '',
                users: []
            });
            // axios.get(`https://api.github.com/search/users?q=${this.keyword}`)
            this.$http.get(`https://api.github.com/search/users?q=${this.keyword}`) // Vue 2
                .then(res => {
                    console.log(res.data.items);
                    pubsub.publish('updateData', {
                        isLoading: false,
                        errMsg: '',
                        users: res.data.items
                    });
                })
                .catch(e => {
                    console.log(`请求失败:${e.message}`)
                    pubsub.publish('updateData', {
                        isLoading: false,
                        errMsg: e.message,
                        users: []
                    });
                });
        }
    }
}
</script>