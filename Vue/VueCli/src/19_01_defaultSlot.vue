<template>
  <div class="container">
    <SlotCategoryI title="美食">
      <img src="" alt="delicious food" />
    </SlotCategoryI>

    <SlotCategoryI title="游戏" :listData="games">
      <ul>
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
      </ul>
    </SlotCategoryI>

    <SlotCategoryI title="电影">
      <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video>
    </SlotCategoryI>
  </div>
</template>

<script>
import SlotCategoryI from "@/components/SlotCategoryI";
export default {
  name: "App",
  components: {
    SlotCategoryI // 默认插槽
  },
  data() {
    return {
      foods: ['火锅', '烧烤', '小龙虾', '牛排'],
      games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
      films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
    }
  }
}
</script>