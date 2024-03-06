import React, { useState, useRef, useEffect } from 'react';
import { Input, Space, Select, Cascader, Button, Form, notification, message, Upload, Card, Image } from 'antd';
const { TextArea } = Input;
import axios from 'axios';
import { useHistory } from 'umi';
import { LoadingOutlined, PlusOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'umi'; // useParams
import { cityArray } from './../../../components/cityData';

const Modify = () => {
  const [form] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState(true) // 是否允许修改邮费部分
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const history = useHistory()
  // const [api] = notification.useNotification() // antd notification
  const [finishState, setFinishState] = useState()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const tagValue = Form.useWatch('biaoqian', form)
  // const [tagIdList, setTagIdList] = useState([])
  const formRef = useRef() // useRef // 不同渲染之间无法共享state状态值；采用useRef，作为组件实例的变量，保证获取到的数据肯定是最新的，且ref更改不会re-render
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [GoodsData, setGoodsData] = useState([]);
  // const [tags, setTags] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/goods/${params.id}`)
    setGoodsData(res.data)
    const tagIdData = res.data.tagList
    // console.log("tagIdData",tagIdData)
    const requests = tagIdData && tagIdData.map(id => { return axios.get(`http://localhost:5000/tags/${id}`) });
    let tmpTags=[]
    await axios.all(requests).then(axios.spread((...responses) => {
      tmpTags = responses.map(response => {
        return response.data.tagName
      })
      // setTags(tmp)
    }))
    // console.log("tmp",tmpTags)
    let { introduction, dizhi, fahuofangshi, youfei, yuanjia, shoujia } = res.data // 解构出所需数据
    formRef.current.setFieldsValue({ // 预填充默表单认值
      jianjie: introduction,
      biaoqian: tmpTags.join("#"),
      dizhi: dizhi,
      fangshi: fahuofangshi,
      youfei: youfei,
      yuanjia: yuanjia,
      shoujia: shoujia
    })
  }, [])
  const selected = (value) => { // value = zishe / baoyou / ziti
    if (value === "zishe") {
      setSelectedValue(false)
    } else {
      setSelectedValue(true)
    }
  };
  const onFinish = async (values) => { // async
    console.log(values)
    const tagIdList = []
    if (values.yuanjia < 0 || values.shoujia <= 0 || values.fahuo.fangshi === "zishe" && values.fahuo.youfei <= 0) {
      message.error('请输入正确的价格')
      return
    }
    const uniqueTag = Array.from(new Set(values.biaoqian.split('#'))) // 唯一化tagSet
    for (let item of uniqueTag) {
      const res = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
      if (res.data && res.data.length > 0 && item !== "") { // !== ""
        await axios.patch(`http://localhost:5000/tags/${res.data[0].id}`, { tagNum: res.data[0].tagNum + 1 })  // /num // res.data.
        tagIdList.push(res.data[0].id)
      } else if (item !== "") { // !== ""
        await axios.post('http://localhost:5000/tags', { "tagName": item, "tagNum": 1, }) // 新tag // 0=>1
        const res2 = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
        tagIdList.push(res2.data[0].id)
        // console.log(`http://localhost:5000/tags?tagName=${item}`, tagIdList, res2.data[0].id)
      }
    }
    await axios.post('http://localhost:5000/goods', {
      "userId": myContent.id,
      "state": finishState, // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架
      "publishTime": Date.now(),
      "introduction": values.jianjie,
      "yuanjia": values.yuanjia,
      "shoujia": values.shoujia,
      "dizhi": values.dizhi,
      "fahuofangshi": values.fahuo.fangshi ? values.fahuo.fangshi : 'baoyou',
      "youfei": values.fahuo.fangshi === 'zishe' ? values.fahuo.youfei : 0,
      "tupian": values.tupian[0].name, // values.tupian.file.name
      "editTime": Date.now(),
      "starList": [],
      "view": 0,
      "tagList": tagIdList
    })
    // console.log("final2", tagIdList)
    history.push(finishState === 0 ? '/published/draft' : '/published/publishing')
    notification.open({
      message: `${finishState === 0 ? '暂存' : '发布'}成功`,
      description:
        `请到${finishState === 0 ? '草稿箱' : '发布页'}查看`,
      // onClick: () => { console.log('Notification Clicked!'); },
      duration: 2,
      placement: "bottomRight"
    });
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const addTag = () => {
    // console.log("1",tagValue)
    // setTagList([...tagList,tagValue])
    // console.log("2",tagList)

    // console.log(tagValue, tagValue.split('#'))
    const uniqueArr = Array.from(new Set(tagValue.split('#')))
    // console.log(uniqueArr)
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      /*
      initialValues={{
        fangshi: "baoyou",
        youfei: 0,
        yuanjia: 0,
        shoujia: 0,
        dizhi: myContent.location ? myContent.location : []
      }}
      */
      ref={formRef}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >

      <Form.Item
        label="简介"
        name="jianjie"
        rules={[
          {
            required: true,
            message: '请输入商品描述',
          },
        ]}
      >
        <TextArea
          placeholder="请输入商品描述"
          showCount
          // required
          maxLength={500}
          autoSize={{
            minRows: 4,
            maxRows: 4,
          }}
        />
      </Form.Item>

      <Form.Item
        label="标签"
        name="biaoqian"
        rules={[
          {
            required: true,
            message: '请输入商品标签',
          },
        ]}
      >
        <Input
          placeholder="#分隔"
          onPressEnter={() => addTag()}
        />
      </Form.Item>

      <Form.Item
        label="地址"
        name="dizhi"
        rules={[
          {
            required: true,
            message: '请选择地址',
          },
        ]}
      >
        <Cascader style={{ width: 200, }} options={cityArray} />
      </Form.Item>

      <Form.Item label="发货方式">
        <Space.Compact>
          <Form.Item
            name={['fahuo', 'fangshi']} // fahuo
            noStyle
          >
            <Select
              style={{
                width: 80,
              }}
              onChange={selected}
              // defaultValue={"baoyou"} // Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.
              options={[
                {
                  value: 'zishe',
                  label: '自设',
                },
                {
                  value: 'baoyou',
                  label: '包邮',
                },
                {
                  value: 'ziti',
                  label: '自提',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={['fahuo', 'youfei']} // fahuo
            noStyle
          >
            <Input style={{ width: '50%' }} prefix="¥" suffix="RMB" type="number" disabled={selectedValue} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="原价"
        name="yuanjia"
      >
        <Input style={{ width: '120px' }} prefix="¥" suffix="RMB" type="number" />
      </Form.Item>

      <Form.Item
        label="售价"
        name="shoujia"
        rules={[
          {
            required: true,
            message: '请输入售价!',
          },
        ]}
      >
        <Input style={{ width: '120px' }} prefix="¥" suffix="RMB" type="number" />
      </Form.Item>

      <Form.Item
        label="修改图片"
        name="tupian"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Space.Compact>
          <Form.Item
            name={['tupian', 'tupianOld']} // fahuo
            noStyle
          >
            <Image
              style={{ width: 100, maxHeight: "100px", objectFit: "cover" }}
              alt="error"
              src={GoodsData.tupian ? require(`@/images/goods/${GoodsData.tupian}`) : "error"} // Error: Cannot find module './undefined'
              fallback="data:image/png;base64,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"
            />
          </Form.Item>
          <Form.Item
            name={['tupian', 'tupianNew']} // fahuo
            noStyle
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
        </Space.Compact>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit" onClick={() => setFinishState(1)}>发布</Button>
          <Button htmlType="submit" onClick={() => setFinishState(0)}>存草稿</Button>
        </Space>
      </Form.Item>

    </Form>
  );
};
export default Modify;
