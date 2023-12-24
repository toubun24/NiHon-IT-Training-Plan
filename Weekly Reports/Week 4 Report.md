# Week 4 Report

## 学习内容及时长

* **2023.12.25 月曜日:** 
  * 代码复现 00:25-01:35
  * 日语影子跟读初中级Unit2 

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


## 遇见问题



## 下周计划


