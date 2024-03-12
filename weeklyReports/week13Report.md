# Week 12 Report

## 学习内容及时长

* **2024.03.11 月曜日:** 
  * reactGTS-评价&申诉 09:40-11:20 17:45-18:30 18:45-19:20
  * reactGTS-申诉管理-待处理 19:40-20:00 22:05-23:45
  * reactGTS-申诉管理-已完成 23:45-24:00

* **2024.03.12 火曜日:** 
  * reactGTS-管理员界面差异 17:40-19:20
  * reactGTS-用户管理 19:20-19:30

* **2023.03.13 水曜日:** 

* **2023.03.14 木曜日:** 

* **2023.03.15 金曜日:** 

* **2023.03.16 土曜日:** 

* **2023.03.17 日曜日:** 

## 内容拓展


## 遇见问题
### 【已解决】React AntD 顶部`const [form] = Form.useForm();`而List.item组件分别调用modal中form的input时输入内容被保留了
* 解决方案：在`setIsModalOpen`前加上`form.resetFields()`，使得modal每次打开后重新初始化form内容
* 文心一言：
好的，如果您已经使用 `form.resetFields()` 成功重置了表单字段，那么您已经找到了一个有效的方法。这通常意味着您的 `Form` 实例是通过某种方式（比如通过 `useForm` 钩子或 `Form.useForm()` 方法）获取的，并且可以直接调用 `resetFields` 方法。
`form.current?.resetFields();` 这种写法通常是在您使用 `useRef` 钩子来引用一个组件实例时使用的。在 React 中，`useRef` 钩子用于访问 DOM 节点或存储可变值，它并不会返回组件的实例方法，而是返回一个可变的 ref 对象。
如果您尝试使用 `form.current?.resetFields();` 并且它不起作用，那可能是因为 `form` 这个 ref 并没有正确地引用到 `Form` 组件的实例，或者 `Form` 组件并没有提供 `resetFields` 这个方法。
既然您已经通过 `form.resetFields()` 实现了表单重置，那么就没必要使用 `form.current?.resetFields();` 这种写法了。
### React AntD Modal中使用Form 在卖方的【已卖出】-点击【申诉处理】后控制台警告: Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
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