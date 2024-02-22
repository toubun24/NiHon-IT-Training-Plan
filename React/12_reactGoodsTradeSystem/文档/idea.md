## 实现细节
* 在列出【发布中】商品的页面，需求是想要做到按发布时间从近到远从上到下排序，这样能第一眼先看到最近发布的商品。一开始的思路是得到`res.data`后用`sort`对其倒序，但终归差点意思；后来才想到以前课程里曾额外添加json查询条件来实现直接获得目标数据的方式，因此`http://localhost:5000/goods?sellerId=3&_sort=publishTime&_order=desc&state_ne=0&state_ne=4`得以实现
* 商品详情页中，如果是自己发布的商品，则仅显示修改按钮；他人发布的商品则显示购买或收藏按钮，且可对发布者进行关注操作

## 细节思考
* 组件随浏览器大小缩放的动态变化
* json server里embed和expand都需要对应的名称+Id形式来写数据库后才能找到对应关系，但如果举例某个goods里既有sellerId又有buyerId信息（虽然我这里只有sellerId，所以直接改成userId就行），那要关联到user的话。。
* `http://localhost:5000/goods/16?_expand=user`怎么才能不对`password`之类的属性进行查询，否则即使setData时不将该字段写进去，后端也会把含有`password`这种信息的内容发送过来；如果是MySQL之类的语句查询的话我有搜到相关的处理方式，用URL方式查询时的处理方式暂时没找到
    ```
    {
    "userId": 3,
    "state": 1,
    "publishTime": 1708516893580,
    "introduction": "123",
    "yuanjia": 0,
    "shoujia": "123",
    "dizhi": [
        "天津市",
        "市辖区",
        "和平区"
    ],
    "tupian": "036033a8cfd69253.jpg",
    "id": 16,
    "user": {
        "username": "toubun",
        "state": 0,
        "password": "123",
        "id": 3,
        "balance": 100
    }
    }
    ```
