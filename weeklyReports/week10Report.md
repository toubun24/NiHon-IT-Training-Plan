# Week 10 Report

## 学习内容及时长

* **2024.02.19 月曜日:** 1h55min
  * reactGTS-发布页 23:55-01:50

* **2023.02.21 水曜日:** 6h35min
  * reactGTS-发布中 19:45-20:40 21:25-22:40 23:20-01:20
  * 上传备份UoE代码作业与整理合并Github仓库 01:20-03:45

* **2023.02.22 木曜日:** 4h
  * reactGTS-推荐搜索页 21:10-21:40 21:55-22:30
  * reactGTS-商品详情页 23:20-02:15

* **2023.02.23 金曜日:** 3h20min
  * reactGTS-商品详情页 19:10-20:20 22:25-00:35

* **2023.02.25 日曜日:** 4h25min
  * reactGTS-商品详情页 17:40-20:50 21:20-21:35 00:25-01:15
  * 整理报告 01:15-01:25

## 内容拓展
### 块元素和内联元素
https://blog.csdn.net/weixin_43912081/article/details/119708763

## 遇见问题
### reactGTS-publish页面 Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.


### 【已解决】reactGTS-publish页面 Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?
* 相关代码行
```JavaScript
<Form.Item
  label="商品图片"
  name="tupian"
  rules={[
    {
      required: true,
      message: '请上传商品图片',
    },
  ]}
>
  <Upload
  name="avatar"
  listType="picture-card"
  className="avatar-uploader"
  showUploadList={false}
  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
  beforeUpload={beforeUpload}
  onChange={handleChange}
  >
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="avatar"
        style={{
          width: '100%',
        }}
      />
    ) : (
      uploadButton
    )}
  </Upload>
</Form.Item>
```
* 尝试了[https://www.cnblogs.com/Carmena/p/14648112.html]提供的方法
```JavaScript
const normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

<Form.Item
  // ...
  getValueFromEvent={normFile}
>
```
但报错依然存在
* 参考[https://cloud.tencent.com/developer/article/2041899]，在前面的基础上还需要做补充
```JavaScript
<Form.Item
  // ...
  valuePropName="fileList" // new
  getValueFromEvent={normFile}
>
```
且注意修改调用方式
```JavaScript
axios.post('http://localhost:5000/goods', {
  // ...
  "tupian": values.tupian[0].name // values.tupian.file.name
})
```
随后问题解决

### 【已解决】商品详情页axios.get取不到数据，直接URL打开json显示数据正常 devScripts.js:226 WebSocket connection to 'ws://localhost:8000/dev-server/340/s4cc0pcq/websocket' failed: WebSocket is closed before the connection is established.
* 而且是突然开始这样的，之前都一切正常，商品详情页未完善时也能显示出单张图片和商品详情之类的，而且回到publishing页中各商品信息也能正常取回并显示，将`http://localhost:5000/goods/18?_expand=user`代入也能正常取回数据
* 在`[id]`商品详情页，只取数据+输出一行没问题，然后把组件慢慢加回去，结果显示又都是正常的了我晕，然后一刷新又坏了
* 从无内容到仅保留一条`{detailData.introduction}`文本标签展示，一直刷新都没问题；只要保留了其他的组件标签，刷新就会出事
* 换名字也没用，不是名称冲突的问题
* 经过测试，问题根源出在`{detailData.user.username}`和`src={require(``@/images/goods/${detailData.tupian}``)}`两句的调用上
* 确定要请求外援了，于是做了个最小测试样例
```JavaScript
import React, { useState, useEffect } from 'react';
import { Avatar, Flex, Image, Space } from 'antd';
import { useParams } from 'umi';
import axios from 'axios';

const Goods = () => {
  const params = useParams()
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/goods/${params.id}?_expand=user`).then(
      res => {
        setDetailData(res.data)
      }
    )
  }, [])
  console.log(`http://localhost:5000/goods/${params.id}?_expand=user`, detailData)
  return (
    <div>
      {
        detailData.user.username // TypeError: Cannot read properties of undefined (reading 'username')
      }
      {
        //detailData.user.id // TypeError: Cannot read properties of undefined (reading 'id')
      }
      <Image
        width={200}
        // src={require(`@/images/goods/${detailData.tupian}`)} // Error: Cannot find module './undefined'
      />
      <br />
      introduction{detailData.introduction}
      <br />
      shoujia{detailData.shoujia}
      <br />
      id{detailData.id}
    </div>
  )
}
export default Goods
```
还附带链接`http://localhost:5000/goods/18?_expand=user`下的数据格式
```
{
  "userId": 3,
  "state": 1,
  "publishTime": 1708524807903,
  "introduction": "【99新】asdakjdshasdasda",
  "yuanjia": "555",
  "shoujia": "222",
  "dizhi": [
    "青海省",
    "海东市",
    "民和回族土族自治县"
  ],
  "fahuofangshi": "zishe",
  "youfei": "123",
  "tupian": "ec739b3639b8329c.png",
  "id": 18,
  "user": {
    "username": "toubun",
    "state": 0,
    "password": "123",
    "id": 3,
    "balance": 100
  }
}
```
其中代码的注释部分就是有问题的地方。我们首先全部注释掉可能出现问题的地方，然后无论怎么刷新网页都能正常显示如下
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/DesktopScreenshot2024022301530282.png)
然后我们取消掉其中一个涉及问题的调用的注释，保存代码，可以正常运行显示（看左下角的控制台输出，应该是缓存什么的，导致数据还保存在里面着
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/DesktopScreenshot2024022301534259.png)
然后刷新网页，这次重新获取数据还没获取到就渲染然后报错了（但axios应该是有promise的异步呀，应该是获取完数据才做后续渲染的，还是说有什么要点我可能遗漏了或者哪里理解有偏差orz）(关于图片显示的代码，我在其他页面是可以正常运行使用过的，所以应该不是代码写法语法什么的问题，而还是跟数据还缺失就开始渲染有关)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/DesktopScreenshot2024022301535512.png)
而且下面没截到图的部分还带有黄色警告提示
```
WebSocket connection to 'ws://localhost:8000/dev-server/102/jck1yqwf/websocket' failed: WebSocket is closed before the connection is established.
```
* 参考链接[React-未正确渲染子对象](https://cloud.tencent.com/developer/ask/sof/323389?from=16139)，单独获取子对象即可
```JavaScript
const [detailData, setDetailData] = useState({}); // 注意这里是对象所以用{}
  const [userData, setUserData] = useState({}); // new
  useEffect(() => {
    axios.get(`http://localhost:5000/goods/${params.id}?_expand=user`).then(
      res => {
        setDetailData(res.data)
        setUserData(res.data.user) // new
      }
    )
  }, [])
```
图片的话，不涉及子对象问题，引入antd自带的[容错处理](https://ant-design.antgroup.com/components/image-cn#image-demo-fallback)即可（虽然不知道`fallback`为什么非得这么大段
```JavaScript
<Image
  width={200}
  src={detailData.tupian ? require(`@/images/goods/${detailData.tupian}`) : "error"} // Error: Cannot find module './undefined'
  fallback="data:image/png;base64,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"
/>
```
* 另附
```JavaScript
{ detailData && detailData.length !== 0 && detailData.map(item => return (<div>item.user.username</div>))}
```
* https://blog.csdn.net/qq_43506776/article/details/109897423
* 