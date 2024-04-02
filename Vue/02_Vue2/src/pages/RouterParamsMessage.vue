<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <router-link
          :to="{
            name: 'particulars',
            // 注意如果你这里使用params传递参数,不能配置path，只能配置name,一定要注意
            // query: {
            params: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }} </router-link
        >&nbsp;&nbsp;
      </li>
    </ul>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "RouterParamsMessage",
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