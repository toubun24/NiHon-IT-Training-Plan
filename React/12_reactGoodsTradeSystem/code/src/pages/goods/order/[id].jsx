import React, { useState, useRef, useEffect } from 'react';
import { Input, Space, Select, Cascader, Button, Form, notification, message, Upload, Card, InputNumber, Tooltip, Typography } from 'antd';
const { TextArea } = Input;
import axios from 'axios';
import { useHistory, useParams } from 'umi';
import { LoadingOutlined, PlusOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { cityArray } from './../../../components/cityData';
import MyBack from '../../../components/myBack';

const Order = () => {
  const [form] = Form.useForm();
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const history = useHistory()
  const [GoodsData, setGoodsData] = useState({});
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [totalPrice, setTotalPrice] = useState(0)
  const [numValue, setNumValue] = useState(1)

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/goods/${params.id}`)
    setGoodsData(res.data)
    const res2 = await axios.get(`http://localhost:5000/users/${myContent.id}`)
    form.setFieldsValue({
      shouhuo: {
        dizhi1: res2.data.location, // 直接使用从服务器获取的位置数据  
      },
      // num:1
    });
    setTotalPrice(Number(numValue) * Number(res.data.shoujia) + Number(res.data.youfei)) // 初始值 // Number
  }, [])
  const onFinish = async (values) => { // async
    await axios.post('http://localhost:5000/trades', {
      "buyerId": myContent.id,
      "sellerId": GoodsData.userId,
      "goodId": params.id,
      "price": totalPrice,
      "state": 0,//订单进度，0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
      "num": values.num,//交易商品数量
      "orderTime": Date.now(),
      "editTime": Date.now(),
      "note": values.beizhu,
      "dizhi1": values.shouhuo.dizhi1,
      "dizhi2": values.shouhuo.dizhi2,
      // 快照内容
      "publishTime": GoodsData.publishTime,
      "introduction": GoodsData.introduction,
      "yuanjia": GoodsData.yuanjia,
      "shoujia": GoodsData.shoujia,
      "dizhi": GoodsData.dizhi,
      "fahuofangshi": GoodsData.fahuofangshi,
      "youfei": GoodsData.youfei,
      "tupian": GoodsData.tupian, // values.tupian.file.name
      "finalEditTime": GoodsData.editTime,
      "tagList": GoodsData.tagList,
    })
    // console.log("GoodsData.num",GoodsData.num,"values.num",values.num,GoodsData.num == values.num)
    await axios.patch(`http://localhost:5000/goods/${params.id}`, {
      num: GoodsData.num - values.num,
      state: GoodsData.num == values.num ? 5 : GoodsData.state // 5已售罄 // ===时判定为false所以改为==就行了，可能是原格式不完全相同
    })
    // console.log("final2", tagIdList)
    history.push('/bought/all')
    notification.open({
      message: `下单成功`,
      description:
        `如有金额变动，请联系卖家修改订单`,
      // onClick: () => { console.log('Notification Clicked!'); },
      duration: 2,
      placement: "bottomRight"
    });
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleNumChange = (e) => { // e // onChange写在Input里
    // console.log("1",changedValues)
    const value = e.target.value // e.target.value
    setNumValue(Number(value))
    // setNumValue(value)
    // console.log("change",Number(numValue),Number(GoodsData.shoujia),Number(GoodsData.youfei))
    // setTotalPrice(Number(numValue) * Number(GoodsData.shoujia) + Number(GoodsData.youfei)); // Number
  }
  useEffect(() => {
    setTotalPrice(numValue * Number(GoodsData.shoujia) + Number(GoodsData.youfei));
  }, [numValue, GoodsData.shoujia, GoodsData.youfei]);

  return (
    <div>
      <MyBack />
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        initialValues={{
          num: 1,
        }}
      // onValuesChange={handleNumChange}
      >

        <Form.Item
          label="备注"
          name="beizhu"
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
          label="收货地址"
        >
          <Space.Compact>
            <Form.Item
              name={['shouhuo', 'dizhi1']} // fahuo
              noStyle
            >
              <Cascader style={{ width: 200, }} options={cityArray} />
            </Form.Item>
            <Form.Item
              name={['shouhuo', 'dizhi2']} // fahuo
              noStyle
              rules={[
                {
                  required: true,
                  message: '请填写详细地址',
                },
              ]}
            >
              <Input style={{ width: 200, }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="购买数量">
          <Space>
            <Form.Item // 单设item以免和说明文字混淆
              // label="购买数量"
              name="num"
              noStyle // 表单项后面跟说明
              // onChange={()=>onChange}
              rules={[
                {
                  required: true,
                  message: '请输入购买数量',
                },
                {
                  pattern: /^[1-9]\d*$/,
                  message: '数量格式不合规范'
                },
                () => ({
                  validator(_, value) { // validator
                    // console.log(value,GoodsData.num)
                    if (value > GoodsData.num) {
                      return Promise.reject(new Error('输入值超过了当前存货数量'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input onChange={handleNumChange} style={{ width: '80px' }} type="number" />
            </Form.Item>
            <span style={{ fontSize: '12px' }}> (当前存货数量为:{GoodsData.num})</span>
          </Space>
        </Form.Item>

        <Form.Item
          label="总金额">
          <div style={{ color: 'red' }}>¥{
            totalPrice // form.getFieldValue('name')引用表单值
          } <span style={{ color: 'black' }}>(含邮费<span style={{ color: 'red' }}>{GoodsData.youfei}</span>元)</span></div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
            <Button onClick={() => history.goBack()}>取消</Button>
            <Button type="primary" htmlType="submit" >下单</Button>
          </Space>
        </Form.Item>

      </Form>
    </div>
  );
};
export default Order;
