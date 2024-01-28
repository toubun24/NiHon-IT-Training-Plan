# Week 5 Report

## 学习内容及时长

* **2024.01.22 月曜日:**
  * 联动活动线下搬砖一天

* **2023.01.23 火曜日:** 
  * 基于敏捷开发模式自命题设计管理系统 04:55-05:40 06:00-06:55 07:20-08:00 9:00-9:10 17:25-18:10 19:00-19:40
  * MySQL介绍 18:10-18:50
  * MySQL快速入门 18:50-19:00

* **2023.01.24 水曜日:** 
  * reactGTS-Introduction 15:35-15:45 16:30-16:50 17:00-17:25 17:35-19:00 00:45-02:40
  * reactGTS-项目配置 02:40-03:05
  * reactGTS-注册登录页面 03:05-03:35

* **2023.01.25 木曜日:** 
  * 棚拍一整天orz
  * reactGTS-注册登录页面 02:40-05:40

* **2023.01.26 金曜日:** 
  * 漫展orz

* **2023.01.27 土曜日:** 
  * 参加婚礼

* **2023.01.28 日曜日:** 
  * 参加婚礼
  * reactGTS-注册登录页面 20:35-20:50 21:25-22:20 22:30-23:40 23:45-00:35

## 学习笔记
### MySQL介绍
* SQL需要与数据库管理系统（DBMS）一起使用，DBMS负责管理数据库，SQL则用于与数据库进行交互

### MySQL快速入门
* 常见的 MySQL 数据类型：
  > INT: 整数类型，可存储范围为-2147483648到2147483647的整数 \
  > VARCHAR: 可变长度字符串类型，可存储最大长度为65535个字符的字符串 \
  > CHAR: 定长字符串类型，可存储最大长度为255个字符的字符串 \
  > DECIMAL: 定点数类型，可存储精度高达65个数字的小数 \
  > DATE: 日期类型，存储年、月、日信息 \
  > DATETIME: 日期时间类型，存储年、月、日、时、分、秒信息，如“2023-03-23 10:30:00” \
  > TIMESTAMP: 时间戳类型，存储时间戳信息





## 内容拓展
### 

## 遇见问题

### 【已解决】AntD注册页面警告:"A `Form.Item` with a `name` prop must have a single child element. For information on how to render more complex form items, see https://u.ant.design/complex-form-item."，同时确认密码时只会提示'Please confirm your password!'
* 提示语句来自于
```JavaScript
rules={[
  {
    required: true, // 必填样式设置。如不设置，则会根据校验规则自动生成
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      // console.log(getFieldValue('password'))
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The new password that you entered do not match!'));
    },
  }),
]}
```
且`console.log(value)`输出为`undefined`，说明根本没有接收到我第二次输入的确认密码值
* 重新直接粘贴源代码无此问题，说明是本地实现的时候代码出现问题，随后找到原因，在所谓'child element'后面添加了一行注释导致的
```JavaScript
<Input.Password visibilityToggle={false}/> {/* {...} */}
```
把注释换行就解决了

### 【已解决】AntD弹出通知报错:"Unhandled Rejection (TypeError): getPrefixCls is not a function"；调整后变为警告:"Warning: [antd: Notification] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead."
* 完整报错信息
```
Unhandled Rejection (TypeError): getPrefixCls is not a function
▶ 2 stack frames were collapsed.
(anonymous function)
./src/pages/register.jsx:62
  59 |   "password": values.password,
  60 | }).then(res => {
  61 |   history.push('/login') // /
> 62 |   api.info({ // antd notification
     | ^  63 |     message: '通知',
  64 |     description:
  65 |       '注册成功',

Uncaught (in promise) TypeError: getPrefixCls is not a function
    at Object.notify [as open] (useNotification.js:23:1)
    at hookApiRef.current.<computed> [as info] (useNotification.js:38:1)
    at register.jsx:62:1
```
* 根据浏览器控制台报错找到报错位置
```JavaScript
// ...
export default function createUseNotification(getNotificationInstance, getRCNoticeProps) {
  var useNotification = function useNotification() {
    var getPrefixCls; // getPrefixCls
    // ...
  }
  function notify(args) {
    var customizePrefixCls = args.prefixCls;
    var mergedPrefixCls = getPrefixCls('notification', customizePrefixCls); //getPrefixCls
    // ...
  }
}
```
注意到`package.json`还没有专门去安装过antd(虽然已经可以从antd引入模块使用了，应该是umi已经集成好了)，抱着试一试的心态安装@5.13.2，发现报错变为警告
```
Warning: [antd: Notification] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.
```
* 直接粘贴官方文档给出的按钮式的弹出信息是可以实现的；尝试删掉页面跳转的部分
```JavaScript
history.push('/login')
```
也变得可以实现，也就是说主要是由于页面发生了跳转，该弹出框到新页面弹出这件事不符合React18的规范了
* 相关官方文档链接：[App包裹组件](https://ant.design/components/app-cn)
* 解决：直接使用静态方法即可(虽然官方说是不推荐)。[静态方法（不推荐）](https://ant-design.antgroup.com/components/notification-cn#notification-demo-basic)中代码为(此处我又变为使用message方法了，但和notification语法结构是一样的)
```JavaScript
import React from 'react';
import { Button, notification } from 'antd';
const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const App = () => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);
export default App;
```
* 另：我甚至尝试过用`history.push('/login', {isRegisterValue: true})`的方式传值给`login.jsx`，让其根据`isRegisterValue`的值来在`useEffect()`里判断是否弹出消息框，但`const Login = ({ isRegisterValue })`并没能接收到该传值，可能哪里还有点问题，或者直接redux应该也是可以的，只是会麻烦许多

### 【已解决】setState()报错:"Error: Too many re-renders. React limits the number of renders to prevent an infinite loop."
* 源代码部分
```JavaScript
const [isRegister, setIsRegister] = useState(false)
setIsRegister(isRegisterValue)
```
* 解决：不能把`setIsRegister()`直接写在组件体内，写进`useEffect()`或其他函数中即可

### AntD <Form.Item> validator无法实现重名校验且警告"Warning: `callback` is deprecated. Please return a promise instead."和"Uncaught (in promise) Error: Username already exist"
* 源码部分
```JavaScript
<Form.Item
  name="username"
  label="Username"
  tooltip="What do you want others to call you?"
  rules={[
    {
      required: true,
      message: 'Please input your nickname!',
      whitespace: true,
      validateTrigger: 'onBlur', // onSubmit
      validator:
        (value) => {
          axios.get(`http://localhost:5000/users?username=${value}`).then(res => {
            if (res.data.length !== 0) { 
              return Promise.resolve()
            }
            return Promise.reject(new Error('Username already exist'))
          })
        }
    }
  ]}
>
  <Input />
</Form.Item>
```
* 报错信息为
```
Warning: `callback` is deprecated. Please return a promise instead.
```
```
Unhandled Rejection (Error): Username already exist
(anonymous function)
./src/pages/register.jsx:106
  103 |         if (res.data.length !== 0) {
  104 |           return Promise.resolve()
  105 |         }
> 106 |         return Promise.reject(new Error('Username already exist'))
      | ^  107 |       })
  108 |     }
  109 | }
```
* 参考链接：[antd-rule](https://ant-design.antgroup.com/components/form-cn#rule)