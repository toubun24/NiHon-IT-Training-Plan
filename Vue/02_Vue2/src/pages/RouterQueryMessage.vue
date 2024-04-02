<template>
  <div>
    <ul>
      <!-- <li>
                <a href="/message1">message001</a>&nbsp;&nbsp;
            </li>
            <li>
                <a href="/message2">message002</a>&nbsp;&nbsp;
            </li>
            <li>
                <a href="/message/3">message003</a>&nbsp;&nbsp;
            </li> -->
      <li v-for="m in messageList" :key="m.id">
        <!---跳转路由并携带query参数，to的字符串写法-->
        <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{ m.title }}</router-link>&nbsp;&nbsp;
        <!---跳转路由并携带query参数，to的对象写法-->
        <router-link
          :to="{
            path: '/home/message/detail',
            query: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }} </router-link
        >&nbsp;&nbsp;
      </li>
    </ul>
    <!-- new -->
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "RouterQueryMessage",
  // messageList
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
};
</script>

<style scoped></style>