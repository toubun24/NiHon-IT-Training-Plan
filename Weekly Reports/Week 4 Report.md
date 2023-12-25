# Week 4 Report

## 学习内容及时长

* **2023.12.25 月曜日:** 
  * 代码复现 00:25-01:35 02:45-04:15
  * 软件工程师常用日本语初级中(P41-P45) 16:10-16:50
  * 日语影子跟读初中级Unit2 16:50-17:05

* **2023.12.26 火曜日:** 




* **2023.12.27 水曜日:** 




* **2023.12.28 木曜日:** 



* **2023.12.29 金曜日:** 



* **2023.12.30 土曜日:** 



* **2023.12.31 日曜日:** 

  * 样式化组件与单元测试 
  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 

## 学习笔记



## 内容拓展
1. PubSub `token` for subscriber
```JavaScript
componentDidMount(){
    this.token = PubSub.subscribe('search',(_,stateObj) => {
        this.setState(stateObj)
    })
}
componentWillUnmount(){
    PubSub.unsubscribe(this.token)
}
```

2. react-router-dom安装: `npm install react-router-dom`



## 遇见问题
1. **08_路由NavLink的使用-src**复现时，高亮样式没能体现出来，因为复现的样式过于简陋，而示例代码中嵌套了一大堆设定过特定`className`的标签，但并没有对应的css文件，运行后却又能体现出样式来，不知道是在哪里对这些class定义的样式的，先暂放一下吧
* v6已删除`activeClassName`属性，或许版本不同有所影响


## 下周计划


