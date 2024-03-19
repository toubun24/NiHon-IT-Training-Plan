# Week 13 Report

## 学习内容及时长

* **2024.03.11 月曜日:** 5h15min
  * reactGTS-评价&申诉 09:40-11:20 17:45-18:30 18:45-19:20
  * reactGTS-申诉管理-待处理 19:40-20:00 22:05-23:45
  * reactGTS-申诉管理-已完成 23:45-24:00

* **2024.03.12 火曜日:** 3h55min
  * reactGTS-管理员界面差异 17:40-19:20
  * reactGTS-用户管理 19:20-19:30 22:50-00:55

* **2023.03.13 水曜日:** 4h
  * reactGTS-用户管理 16:30-17:20
  * reactGTS-用户权限作用实装 17:20-18:10
  * reactGTS-商品发布权限作用实装 19:45-20:05
  * reactGTS-已买到/已卖出-其他 20:05-20:15
  * reactGTS-申诉-卖家和管理员评论 20:40-21:05
  * reactGTS-订单修改时间 21:05-21:10
  * reactGTS-已买到/已卖出-组件化 21:10-21:15 23:35-00:05
  * reactGTS-商品搜索筛选 00:05-00:50

* **2023.03.16 土曜日:** 3h35min
  * reactGTS-超级管理员-账号管理&审查员记名 08:15-09:00 18:00-19:55
  * reactGTS-超级管理员-标签管理 21:40-21:55 23:40-00:20

* **2023.03.17 日曜日:** 5h
  * reactGTS-网页路径可访问权限 19:05-20:15 22:10-01:03 02:12-02:57
  * 整理报告 02:57-03:10
  * reactGTS-全局变量 
  * reactGTS-窗口滚动条 
  * reactGTS-登录界面
  * reactGTS-主题色
  * reactGTS-报告

## 内容拓展


## 遇见问题
### 【已解决】React AntD 顶部`const [form] = Form.useForm();`而List.item组件分别调用modal中form的input时输入内容被保留了
* 解决方案：在`setIsModalOpen`前加上`form.resetFields()`，使得modal每次打开后重新初始化form内容
* 文心一言：
好的，如果您已经使用 `form.resetFields()` 成功重置了表单字段，那么您已经找到了一个有效的方法。这通常意味着您的 `Form` 实例是通过某种方式（比如通过 `useForm` 钩子或 `Form.useForm()` 方法）获取的，并且可以直接调用 `resetFields` 方法。
`form.current?.resetFields();` 这种写法通常是在您使用 `useRef` 钩子来引用一个组件实例时使用的。在 React 中，`useRef` 钩子用于访问 DOM 节点或存储可变值，它并不会返回组件的实例方法，而是返回一个可变的 ref 对象。
如果您尝试使用 `form.current?.resetFields();` 并且它不起作用，那可能是因为 `form` 这个 ref 并没有正确地引用到 `Form` 组件的实例，或者 `Form` 组件并没有提供 `resetFields` 这个方法。
既然您已经通过 `form.resetFields()` 实现了表单重置，那么就没必要使用 `form.current?.resetFields();` 这种写法了。
### 【已解决】React AntD Modal中使用Form 在卖方的【已卖出】-点击【申诉处理】后控制台警告: Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
* `form.resetFields()`对全部action都做了初始化，但其实只需要对涉及了form的特定state的action打开modal前进行初始化即可
```jsx
const handleTrade = (itemId, itemState) => { // itemState: 0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
    if (itemState === 1) {
      form.resetFields() // 每次打开后重新初始化form内容
    }
    if (itemState === 3 || itemState === 7) {
      commentForm.resetFields() // 每次打开后重新初始化form内容
    }
    setHandlingId(itemId)
    setDisplayPrice(mergedData.find(obj => obj.id === itemId).price)
    setIsModalOpen1(prevState => {
      // 使用map方法创建一个新的数组，并在对应id的位置将值设置为true
      return prevState.map((isOpen, index) => {
        if (index === itemState) {
          return true; // 如果当前索引等于id，返回true
        }
        return isOpen; // 否则返回原值
      })
    })
  }
```
### 【已解决】React AntD Table: Warning: Each child in a list should have a unique "key" prop.
* 给前面的子项加`key`加了个遍也没用，连包含的`Button`都给加了也不行，最后发现是指每个数据行(row)的key
```jsx
<Table columns={columns} dataSource={goodsData} pagination={{ pageSize: 5 }} />
```
添加`rowKey="id"`
```jsx
<Table columns={columns} rowKey="id" dataSource={goodsData} pagination={{ pageSize: 5 }} />
```
即可

### 【已解决】Umi 约定式动态路由`/[id].jsx`权限控制在`@/wrappers/Auth.jsx`中无法匹配
* 首先是关于`_layout.jsx`
```jsx
const index = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
index.wrappers = ['@/wrappers/Auth']
export default index
```
经测试，在嵌套路由下使用正常，但在一级路径(`/pages/XXX.jsx`)下无效，于是手动给它们的文件末尾添加
```jsx
XXX.wrappers = ['@/wrappers/Auth']
export default XXX;
```
即可正常实现权限控制功能。但无论是`_layout.jsx`还是直接写入`XXX.wrappers = ['@/wrappers/Auth']`（现在来看以我的理解来说，两者其实是等价的了，只是同一文件夹下多个嵌套路由时，前者更省事，不用一个个去加），都无法实现动态路由的权限控制。
* 先贴出`Auth.jsx`代码
```jsx
import { Redirect, useLocation } from 'umi'; // useLocation

const Auth = (props) => {
  const location = useLocation()
  const tokenContent = localStorage.getItem('token')
  const { state: { rights } } = tokenContent == '' ? { state: { rights: [] } } : JSON.parse(tokenContent)
  rights.push('/')
  if (tokenContent) {
    if(rights.includes(location.pathname)) {
      return <div>{props.children}</div>;
    }
    return <Redirect to="/404" />;
  }
  return <Redirect to="/login" />;
};

export default Auth;
```
关键在于`rights.includes(location.pathname)`这里的判断，动态路由的`location.pathname`会返回数字，而不是我json数据库里面记录的`"XXX/:id"`(虽然[官方文档](https://v3.umijs.org/zh-CN/docs/convention-routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)里面也是让这样写，但路径返回的依然是实际id值)，所以这里的判断永远不可能为真
* 解决思路：参考文心一言，手动在`Auth.jsx`中对获取到的路径做正则表达式匹配
```jsx
import { Redirect, useLocation } from 'umi'; // useLocation

const Auth = (props) => { // props: any in TS
  const location = useLocation() // useLocation: 拿到当前路径
  const tokenContent = localStorage.getItem('token')
  const { state: { rights } } = tokenContent == '' ? { state: { rights: [] } } : JSON.parse(tokenContent) // JSON.parse
  const { pathname } = location;
  const matchPath = pathname.match(/^(.*?)\/(\d+)$/);
  const matchedPath = matchPath ? matchPath[1] : null
  const matchId = pathname.match(/\/(\d+)$/);
  const matchedId = matchId ? matchId[1] : null
  console.log(matchedPath, matchedId)
  // console.log(rights) // 权限列表
  rights.push('/') // 加一个斜杠
  const rights2 = rights.map(right => `${right}/${matchedId}`);
  console.log(rights2, pathname)
  // if (localStorage.getItem('token')) { // 有token则遵循../index.jsx跳转到home
  if (tokenContent) {
    if (rights.includes(pathname) || rights2.includes(pathname)) { // checked.includes: 确保目标地址被包含在权限列表中 // rights.includes(pathname)
      return <div>{props.children}</div>;
    }
    return <Redirect to="/404" />;
  }
  return <Redirect to="/login" />;
};

export default Auth;
```
* 但这样也仅仅是实现了动态路由的权限控制，还没有细化到特定的userId只能访问特定的id的订单详情或修改特定的id商品信息
打算`const Auth = async (props) => {`然后`const res = await axios.get(``http://localhost:5000/goods?_expand=user&userId=${id}``)`然后取商品id，但设为异步函数后报错
```
Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
```
所以如何去判定只能再想想了，如果把每个user所属的商品id写入token，那每次增删商品都还需要对token进行修改，也不太合理，之后再想想，后面的内容放到下一周的相关问题中去