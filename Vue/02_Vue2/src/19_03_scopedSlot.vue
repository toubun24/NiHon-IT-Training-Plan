<template>
  <div class="container">

    <!-- <SlotCategoryIII title="游戏" :listData="games"> -->
    <SlotCategoryIII title="游戏">
      <!-- <template v-slot:center> -->
      <!-- <template scope="{games}"> -->
      <!-- error  `scope` attributes are deprecated  vue/no-deprecated-scope-attribute -->
      <!-- 注意用"{...}"包裹 -->
      <template v-slot="{games}">
        <ol>
          <li v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ol>
      </template>
      <!-- <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">单机游戏</a>
          <a href="https://www.baidu.com">网络游戏</a>
        </div>
      </template> -->
    </SlotCategoryIII>

    <SlotCategoryIII title="美食" :foods="['火锅', '烧烤', '小龙虾', '牛排']"  
      :films="['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']">
      <!-- <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">经典</a>
          <a href="https://www.baidu.com">热门</a>
          <a href="https://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎来到影院观赏</h4>
      </template> -->
      <template v-slot="{foods}">
        <ul>
          <li v-for="food in foods" :key="food">{{ food }}</li>
        </ul>
        <ol>
          <li v-for="film in films" :key="film">{{ film }}</li>
        </ol>
      </template>
    </SlotCategoryIII>
  </div>
</template>

<script>
import SlotCategoryIII from "@/components/SlotCategoryIII";
export default {
  name: "App",
  components: {
    SlotCategoryIII // 作用域插槽
  },
  data() {
    return {
      foods: ['火锅', '烧烤', '小龙虾', '牛排'],
      // games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
      films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
    }
  }
}
</script>