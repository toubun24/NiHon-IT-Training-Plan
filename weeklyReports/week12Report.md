# Week 12 Report

## 学习内容及时长

* **2024.03.05 火曜日:** 1h
  * reactGTS-个人主页 20:20-21:20

* **2023.03.06 水曜日:** 2h55min
  * reactGTS-个人主页 15:35-15:40 15:50-17:00 17:35-18:35
  * reactGTS-商品信息修改页 22:40-23:20

* **2023.03.07 木曜日:** 2h40min
  * reactGTS-商品信息修改页 18:15-18:40 18:50-20:05
  * reactGTS-草稿箱 21:25-21:45
  * reactGTS-已删除 21:45-21:55 22:20-22:35
  * reactGTS-商品详情页 22:45-23:00

* **2023.03.08 金曜日:** 4h20min
  * reactGTS-商品详情页 16:30-16:40
  * reactGTS-商品下单页 16:40-18:00 19:20-19:55 20:55-22:00
  * reactGTS-已买到-全部 22:40-23:20 01:25-01:55

* **2023.03.09 土曜日:** 
  * reactGTS-已买到-全部 15:35-17:15
  * reactGTS-订单详情页 20:15-21:15
  * reactGTS-用户主页展示 21:15-21:50
  * reactGTS-商品快照页 
  * reactGTS-商品收藏页 

* **2023.03.10 日曜日:** 


## 内容拓展


## 遇见问题
### 【已解决】Modal中的Form使用formRef=useRef(): Unhandled Rejection (TypeError): Cannot read properties of undefined (reading 'setFieldsValue')
* 一开始运行都正常，`modal`打开状态下的`form`中能够显示所需的默认值，但在刷新网页后开始报错，于是很快意识到问题出在还没有打开`modal`时，`form`是不存在的，而`formRef.current.setFieldsValue`被我写在了整个组件的`useEffect()`里，导致找不到对应的`formRef`，将该段语句写进触发打开`modal`的函数中即可
```JavaScript
const showModal2 = () => {
  setIsModalOpen2(true);
  axios.get(`http://localhost:5000/users/${myContent.id}`).then(
    res => {
      setBalanceData(res.data.balance)
      setFollowData(res.data.followerList.length)
      let { username, location } = res.data // 解构出所需数据
      formRef.current.setFieldsValue({ // 预填充默表单认值
        username,
        location
      })
    }
  )
};
```
### 【已解决】AntD Form组件中，数组形式的name属性来同时处理多个字段时的嵌套对象问题
* 借助文心一言，得到以下解答
```
在 Ant Design 的 Form 组件中，当你使用数组形式的 name 属性来同时处理多个字段时，你需要在 setFieldsValue 方法中提供与 name 数组相对应的嵌套对象。对于你的情况，fahuo 是一个对象，其中包含 fangshi 和 youfei 两个属性。

因此，你需要这样设置初始值：
```
```JavaScript
let { introduction, dizhi, fahuofangshi, youfei, yuanjia, shoujia } = res.data;  
  
formRef.current.setFieldsValue({  
  jianjie: introduction,  
  biaoqian: `#${tmpTags.join("#")}`,  
  dizhi: dizhi,  
  fahuo: { // fahuo 是一个对象，包含 fangshi 和 youfei 两个属性  
    fangshi: fahuofangshi, // 将 fahuofangshi 赋值给 fangshi  
    youfei: youfei // 将 youfei 赋值给 youfei  
  },  
  yuanjia: yuanjia,  
  shoujia: shoujia  
});
```
```
在上面的代码中，我们创建了一个 fahuo 对象，该对象具有 fangshi 和 youfei 两个属性，并将 fahuofangshi 和 youfei 的值分别赋给它们。这样，当 Form 组件渲染时，它将能够正确地找到并设置这两个字段的初始值。

请确保你的 res.data 中 fahuofangshi 和 youfei 的值与你期望设置到表单中的值相匹配，并且它们是字符串类型，因为 Select 和 Input 组件通常期望接收字符串类型的值。如果它们是其他类型，你可能需要进行适当的转换。
```

### 【已解决】AntD Form 输入金额数字的表单校验规则正则表达式
* 参考文心一言得到以下写法
```JavaScript
rules={[
  {
    pattern: /^(?!0\d)\d+(\.\d*)?$/,
    message: '金额格式不合规范'
  }
]}
```
* 完整版描述为
```
要匹配非零开头的数字，但允许0和以0开头的小数通过校验，你可以使用以下的正则表达式：
```
```
^(?!0\d)\d+(\.\d+)?$\
```
```
这个正则表达式的解释如下：

^：匹配字符串的开始。
(?!0\d)：是一个否定前瞻断言，确保接下来不是0后跟一个数字。这确保了字符串不是以0开头的非小数数字。
\d+：匹配一个或多个数字。
(\.\d+)?：匹配一个小数点后跟一个或多个数字（即小数部分），整个部分（包括小数点和数字）是可选的，这允许整数通过校验。
$：匹配字符串的结束。
请注意，这个正则表达式假设小数点只能出现一次，并且小数部分至少有一个数字。如果你希望允许小数点后没有数字（即允许.作为字符串的最后一个字符），则需要稍微修改正则表达式：
```
```
^(?!0\d)\d+(\.\d*)?$
```
```
在这个版本中，\.\d* 允许小数点后面有零个或多个数字。
这里是一个使用JavaScript进行测试的例子：
```
```JavaScript
const regex = /^(?!0\d)\d+(\.\d+)?$/;  
  
console.log(regex.test("123"));         // true，非零开头的整数  
console.log(regex.test("0.123"));       // true，以0开头的小数  
console.log(regex.test("0123"));        // false，以0开头的非小数数字  
console.log(regex.test("123.456"));     // true，非零开头的带小数数字  
console.log(regex.test("."));           // false，仅包含小数点  
console.log(regex.test("123."));        // true，整数部分后只有小数点（如果允许的话）  
console.log(regex.test("0."));          // true，以0开头，仅包含小数点（如果允许的话）
```
### 【已解决】AntD Form initialValues使用state赋值时无法显示初始值
* 参考文心一言：在您的示例中，`initialValues` 是在组件的渲染过程中定义的，而 `locationData` 是在 `useEffect` 钩子中异步获取的，因此 `initialValues` 可能会在 `locationData` 更新之前就已经被设置了。由于 `useEffect` 内部的 `await` 调用是异步的，`initialValues` 会使用 `locationData` 的初始值（一个空数组），而不是从服务器获取的值。为了解决这个问题，您可以在 `useEffect` 钩子中更新 `initialValues`。然而，由于 `initialValues` 是一个属性，它通常应该在组件的构造函数中或在函数组件的外部定义，并且一旦定义就不能更改。因此，您不能直接更新 `initialValues`。一个可行的解决方案是，在 `useEffect` 钩子中设置状态，然后在组件渲染时根据这个状态来设置表单的值。对于 `Form` 组件，您可以使用 `setFieldsValue` 方法来设置字段的值。在示例中，`useEffect` 钩子在组件挂载后执行，获取 `locationData`，并使用 `form.setFieldsValue` 方法来设置表单字段的值。注意，`form` 是通过 `Form.useForm()` 钩子获取的，并且 `useEffect` 钩子依赖 `form` 和 `myContent.id`，这意味着当 `myContent.id` 变化时，`useEffect` 会重新运行以获取新的位置数据。这样，您就可以确保在组件渲染时，表单字段的值已经被正确地设置为从服务器获取的位置数据了。
* 总结来说，就是如果初始值来自axios.get后的set的state，那么就采用`form.setFieldsValue`的写法
```jsx
useEffect(async () => {
  const res2 = await axios.get(`http://localhost:5000/users/${myContent.id}`)
  form.setFieldsValue({  
    shouhuo: {  
      dizhi: res2.data.location, // 直接使用从服务器获取的位置数据  
    },  
  });  
}, [])
```
而只有初始值是组件里本身写好的（比如0啊什么的默认字段）那么才能用`initialValues`

### 【已解决】AntD Card 同一行中用户头像名称靠左对齐而浏览量数据靠右对齐，同时在有限的总宽度上限制用户名称的最长宽度
* 基于文心一言，先解决第一个对齐问题：
为了实现`Space`组件中的内容靠左对齐，而另一个`span`元素中的内容靠右对齐，你可以使用Flexbox布局。在你的代码中，你需要将外部`div`元素转换为一个flex容器，并设置相应的对齐属性。
这里是一个例子，说明如何修改你的代码来实现所需的布局：
```jsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Space size={5}>
    <OtherAvatar userIdInfo={item.userId} size={"small"} />
    <span style={{ textAlign: 'right', textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.user.username}</span>
  </Space>
  <span style={{ fontSize: '10px', marginTop: '5.5px' }}>
    <EyeOutlined /> {item.view}
  </span>
</div>
```
在这个例子中，我添加了`style`属性到外部的`div`元素，并设置了`display: 'flex'`来启用Flexbox布局。`justifyContent: 'space-between'`确保子元素之间间隔均匀，并且第一个子元素（`Space`组件）靠左对齐，最后一个子元素（`span`元素）靠右对齐。`alignItems: 'center'`确保所有子元素在垂直方向上居中对齐。
注意，我已经移除了原先`span`元素中的`float: 'right'`样式，因为在Flexbox布局中，`float`属性不会生效。此外，我还移除了`width`属性，因为`justifyContent: 'space-between'`会自动处理空间分配，通常不需要显式设置宽度。
最后，请确保`Space`组件和`EyeOutlined`图标组件（假定来自`antd`库）能够正常工作，并且它们的样式不会干扰上述布局。如果`Space`组件内需要保持元素间的间隔，你可能不需要再对它应用额外的样式。如果需要调整`Space`组件内元素的对齐方式，你可能需要在`Space`组件或其子元素上应用额外的样式。
* 随后是用户名长度限制问题
要实现这样的布局，你需要更加精细地控制每个元素的宽度，并确保用户名的文本在超出一定长度时以省略号结尾。这可以通过在`Space`组件的`span`内使用`flex`布局以及为`span`设置最大宽度和`text-overflow: ellipsis`样式来实现。
```jsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Space size={5} style={{ flex: 1, overflow: 'hidden' }}>
    <OtherAvatar userIdInfo={item.userId} size={"small"} />
    <span style={{ textAlign: 'right', textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      <span style={{ maxWidth: '30px', textAlign: 'right', textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>
        {item.user.username}
      </span>
    </span>
  </Space>
  <span style={{ fontSize: '10px', marginTop: '5.5px' }}>
    <EyeOutlined /> {item.view}
  </span>
</div>
```