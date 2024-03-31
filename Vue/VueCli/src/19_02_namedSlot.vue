<template>
  <div class="container">
    <SlotCategoryII title="美食">
      <!-- <img src="" alt="delicious food" /> -->
      <!-- <img slot="center" src="" alt="delicious food" />
      <a href="https://www.baidu.com" slot="footer">百度</a> -->
      <!-- error  `slot` attributes are deprecated  vue/no-deprecated-slot-attribute -->
      <template v-slot:center>·
        <img src="" alt="delicious food" />
      </template>
      <template v-slot:footer>
        <a href="https://www.baidu.com">百度</a>
      </template>
    </SlotCategoryII>

    <SlotCategoryII title="游戏" :listData="games">
      <!-- <ul>
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
      </ul> -->
      <!-- <ul slot="center">
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
      </ul>
      <div slot="footer" class="foot">
        <a href="https://www.baidu.com">单机游戏</a>
        <a href="https://www.baidu.com">网络游戏</a>
      </div> -->
      <!-- error  `slot` attributes are deprecated  vue/no-deprecated-slot-attribute -->
      <template v-slot:center>
        <ul>
          <li v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ul>
      </template>
      <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">单机游戏</a>
          <a href="https://www.baidu.com">网络游戏</a>
        </div>
      </template>
    </SlotCategoryII>

    <SlotCategoryII title="电影">
      <!-- <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video>
      <video slot="center" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video> -->
      <!-- 但是注意v-slot仅仅只能被用在组件上或者template标签上 -->
      <!-- <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">经典</a>
          <a href="https://www.baidu.com">热门</a>
          <a href="https://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎来到影院观赏</h4>
      </template> -->
      <!-- error  `slot` attributes are deprecated  vue/no-deprecated-slot-attribute -->
      <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">经典</a>
          <a href="https://www.baidu.com">热门</a>
          <a href="https://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎来到影院观赏</h4>
      </template>
    </SlotCategoryII>
  </div>
</template>

<script>
import SlotCategoryII from "@/components/SlotCategoryII";
export default {
  name: "App",
  components: {
    SlotCategoryII // 具名插槽
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