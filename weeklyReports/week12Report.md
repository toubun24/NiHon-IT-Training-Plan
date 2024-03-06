# Week 12 Report

## 学习内容及时长

* **2024.03.05 火曜日:** 
  * reactGTS-个人主页 20:20-21:20

* **2023.03.06 水曜日:** 
  * reactGTS-个人主页 15:35-15:40 15:50-17:00 17:35-18:30
  * reactGTS-商品信息修改页 

* **2023.03.07 木曜日:** 


* **2023.03.08 金曜日:** 


* **2023.03.09 土曜日:** 


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