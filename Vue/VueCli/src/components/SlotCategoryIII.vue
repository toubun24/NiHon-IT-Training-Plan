<template>
    <div class="category">
        <h3>{{ title }}</h3>
        <!-- <slot name="center">我是默认值</slot>
        <slot name="footer">我是默认值</slot> -->
        <slot :games="games" :foods="foods" :films="films">
            我是默认值
            <h4>食物:</h4>
            <ul>
                <li v-for="food in foods" :key="food">{{ food }}</li>
            </ul>
            <h4>电影:</h4>
            <ul>
                <li v-for="film in films" :key="film">{{ film }}</li>
            </ul>
        </slot>
    </div>
</template>

<script>
export default {
    name: "SlotCategoryIII", // 作用域插槽
    // props: ['listData', 'title'],
    props: ['listData', 'title', 'foods', 'films'],
    data() { // data
        return {
            // foods: ['火锅', '烧烤', '小龙虾', '牛排'],
            games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
            // films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
        }
    }
}
</script>

<style scoped>
.category {
    background: skyblue;
    width: 200px;
    height: 300px;
}

h3 {
    text-align: center;
    background: orange;
}

img {
    width: 100%;
}

video {
    width: 100%;
}
</style>