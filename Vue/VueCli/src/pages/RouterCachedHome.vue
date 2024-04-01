<template>
  <h2>我是Home的内容</h2>
  <div>
    <ul class="nav nav-tabs">
      <li>
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/news"
          >News</router-link
        >
      </li>
      <li>
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/message"
          >Message</router-link
        >
      </li>
    </ul>
    <!--keep-alive中include的值代表要缓存的组件，比如下面代表在Home组件中要缓存News组件(组件名)-->
    <!--如果要缓存多个路由组件就改写为:include="['News', 'Message']"或不写include-->
    <!-- <keep-alive include="RouterCachedNews">
      <router-view> </router-view>
    </keep-alive> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "RouterCachedHome",
};
</script>

<style scoped></style>