# Week 9 Report

## 学习内容及时长

* **2024.02.19 月曜日:** 1h55min
  * reactGTS-发布页 23:55-01:50

* **2023.02.21 水曜日:** 4h10min
  * reactGTS-发布中 19:45-20:40 21:25-22:40 23:20-01:20

* **2023.02.22 木曜日:** 
* **2023.02.23 金曜日:** 
* **2023.02.24 土曜日:** 
* **2023.02.25 日曜日:** 

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