## 实现细节
* 在列出【发布中】商品的页面，需求是想要做到按发布时间从近到远从上到下排序，这样能第一眼先看到最近发布的商品。一开始的思路是得到`res.data`后用`sort`对其倒序，但终归差点意思；后来才想到以前课程里曾额外添加json查询条件来实现直接获得目标数据的方式，因此`http://localhost:5000/goods?sellerId=3&_sort=publishTime&_order=desc&state_ne=0&state_ne=4`得以实现

## 细节思考
* 组件随浏览器大小缩放的动态变化