# Week 5 Report

## 学习内容及时长

* **2024.01.01 月曜日:** 
  * 代码复现 21:05-22:45 23:20-00:40 00:50-01:20
  * 软件工程师常用日本语初级中(P66-P70) 19:50-20:15
  * 日语影子跟读初中级Unit3 20:15-20:35

* **2023.01.02 火曜日:** 
  * 代码复现 17:30-18:30
  * 软件工程师常用日本语初级中(P71-P75) 16:10-16:40
  * 日语影子跟读初中级Unit3 16:40-17:05

* **2023.01.03 水曜日:** 
  * 代码复现 
  * 软件工程师常用日本语初级下(P76-P80) 
  * 日语影子跟读初中级Unit4 

* **2023.01.04 木曜日:** 

* **2023.01.05 金曜日:** 

* **2023.01.06 土曜日:** 

* **2023.01.07 日曜日:** 

  * 样式化组件与单元测试 
  * Redux-Saga 
  * React传送门与引用传递 
  * GraphQL 
  * DvaJS 
  * UmiJS 

## 学习笔记




## 内容拓展
1. 二进制和八进制
* ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b(或0B)和0o(或0O)表示
* 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法，如`Number('0o10')`

2. `<dl>`, `<dt>`, `<dd>`
* `<dl>`: Definition List (定义列表)
* `<dt>`: Definition Term（定义项）
* `<dd>`: Definition Description（定义描述）
* 这三个标签必须同时出现，而且dt，dd必须嵌套在dl内。dt和dd是同级关系，并不是嵌套关系。dd必须紧跟在dt之后，dd前可以有多个dt，但dd前面必须至少有一个dt。dt后面至少需要有一个dd。dt和dd是多对多的关系

3. `rcc`, `rfc`

## 遇见问题
1. 【已解决】**3_swiper-同步.jsx**中，关于Swiper的引入，示例代码使用的是
```JavaScript
import Swiper, { Navigation, Pagination } from "swiper";
```
然而报错
```
export 'Navigation' (imported as 'Navigation') was not found in 'swiper' (possible exports: Swiper, default)
export 'Pagination' (imported as 'Pagination') was not found in 'swiper' (possible exports: Swiper, default)
```
现在已经比较有经验了，一看就是版本问题导致引入方式发生了改变，于是去官网参考了新的引入方式()
```JavaScript
import { Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
```
然而依然报错
```
swiper_react__WEBPACK_IMPORTED_MODULE_1__.Swiper is not a constructor
TypeError: swiper_react__WEBPACK_IMPORTED_MODULE_1__.Swiper is not a constructor
```
去掉`/react`部分后则又能运行通过了
```JavaScript
import { Swiper } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
```

2. **5_swiper组件**中，原本的[轮播图链接](https://m.maizuo.com/gateway?type=2&cityId=442000&k=5402781)已失效，去[官网](https://m.maizuo.com/)查看后发现网站中已经不再进行轮播图的显示，遂去b站之类的地方找轮播图，其中有的网站找半天找不到轮播图的模块(可能是找的方法还不够成熟)，有的网站找到了轮播图模块，但`Headers`中并未暴露出axios所需的`X-Client-Info`和`X-Host`，可能是网站做了什么保密手段？还不太熟悉这一块的内容，暂且搁置一下，手动将轮播图的url写进`state`得以先实现

3. 【已解决】**09_useRef**中，`myRef.current`在`useCallback`中
```JavaScript
const push = useCallback(() => {
            setlist([...list,myRef.current.value])
            myRef.current.value = ''
        },[list,myRef.current]
    )
```
会出现警告：`React Hook useCallback has an unnecessary dependency: 'myRef.current'. Either exclude it or remove the dependency array. Mutable values like 'myRef.current' aren't valid dependencies because mutating them doesn't re-render the component react-hooks/exhaustive-deps`，修改为以下片段后警告消失
```JavaScript
const push = useCallback(() => {
            setlist([...list,myRef.current.value])
            myRef.current.value = ''
        },[list] // ,myRef.current
    )
```



## 下周计划


