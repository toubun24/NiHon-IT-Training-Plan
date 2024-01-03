# Week 5 Report

## 学习内容及时长

* **2024.01.01 月曜日:** 4h15min
  * 代码复现 21:05-22:45 23:20-00:40 00:50-01:20
  * 软件工程师常用日本语初级中(P66-P70) 19:50-20:15
  * 日语影子跟读初中级Unit3 20:15-20:35

* **2023.01.02 火曜日:** 3h45min
  * 代码复现 17:30-18:30 20:05-21:55
  * 软件工程师常用日本语初级中(P71-P75) 16:10-16:40
  * 日语影子跟读初中级Unit3 16:40-17:05

* **2023.01.03 水曜日:** 4h25min
  * 代码复现 16:45-18:55
  * 软件工程师常用日本语初级下(P76-P80) 15:30-15:55
  * 日语影子跟读初中级Unit4 15:55-16:05
  * Mobx状态管理 00:20-02:00

* **2023.01.04 木曜日:** 
  * 软件工程师常用日本语初级下(P81-P85) 
  * 日语影子跟读初中级Unit4 
  * TS基本语法 

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

4. `npm --save`
* 将安装的包添加到项目的package.json文件的dependencies字段中
* 当运行`npm install <package-name>`时，默认情况下，npm会将安装的包保存到项目的node_modules目录中，但不会将其添加到package.json文件中。这意味着如果将项目分享给其他人或在其他环境中部署项目时，其他人或其他环境需要手动运行`npm install`来安装依赖。为了简化依赖管理，你可以使用--save选项来告诉npm将安装的包添加到package.json文件中的dependencies字段中。这样，其他人或其他环境只需要运行npm install即可安装项目的所有依赖



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

4. 【已解决】原示例代码**24_mobx2**(在复现代码仓库中则是**25_mobx3-src**)运行后首先缺少`mobx-react`包，需要`npm install mobx-react`；其次，无报错信息且显示出相关组件后，对按钮进行操作发现显示的数值并未得到更新，一直是0；而控制台中的组件信息下，`store`的`count`是能够变化的（但不是实时变化，每次需要重新进出一次那个界面才会更新），或者对源代码进行修改后重新保存渲染也会使得网页显示的`<h2>当前和为:{this.props.store.count}</h2>`直接得到更新渲染，说明不是传值的问题，是渲染不到位的问题；查询之后发现应该是新版本的mobx6导致的渲染问题。在`store.jsx`中，`@observable count = 0`后面添加以下代码即可
```JavaScript
constructor(){
    makeObservable(this)
}
```


## 下周计划


