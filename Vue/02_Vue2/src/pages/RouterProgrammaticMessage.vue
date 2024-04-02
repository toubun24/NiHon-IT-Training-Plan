<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <router-link
          :to="{
            name: 'particulars',
            query: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }} </router-link
        >&nbsp;&nbsp;
        <!-- push & replace -->
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "RouterProgrammaticMessage",
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
  methods: {
    pushShow(m) {
      // console.log(this.$router); //router路由器 ==》管理 route路由(一系列key-value的规则)
      this.$router.push({
        // 这里与router-link的to属性配置形式是一样的
        name: "particulars",
        query: {
          id: m.id,
          title: m.title,
        },
      });
    },
    replaceShow(m) {
      this.$router.replace({
        // 这里与router-link的to属性配置形式是一样的
        name: "particulars",
        query: {
          id: m.id,
          title: m.title,
        },
      });
    },
  },
};
</script>

<style scoped></style>