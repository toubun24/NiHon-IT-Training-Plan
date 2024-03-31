<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyword" @keyup.enter="searchUsers" />&nbsp;
            <button @click="searchUsers">Search</button>
        </div>
    </section>
</template>

<script>
import pubsub from "pubsub-js";
import axios from "axios"; // npm install axios --save
export default {
    name: "GithubSearch",
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        searchUsers() {
            // this.$bus.$emit('updateListData', {
            //     isFirst: false,
            //     isLoading: true,
            //     errMsg: '',
            //     users: []
            // })
            pubsub.publish('updateData', {
                isFirst: false,
                isLoading: true,
                errMsg: '',
                users: []
            });
            axios.get(`https://api.github.com/search/users?q=${this.keyword}`)
                .then(res => {
                    console.log(res.data.items);
                    // this.$bus.$emit("updateListData", {
                    //     isLoading: false,
                    //     errMsg: '',
                    //     users: res.data.items
                    // });
                    pubsub.publish('updateData', {
                        isLoading: false,
                        errMsg: '',
                        users: res.data.items
                    });
                })
                .catch(e => {
                    console.log(`请求失败:${e.message}`)
                    // this.$bus.$emit("updateListData", {
                    //     isLoading: false,
                    //     errMsg: e.message,
                    //     users: []
                    // });
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