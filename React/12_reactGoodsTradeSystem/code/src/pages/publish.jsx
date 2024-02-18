import React, { useState } from 'react';
import { Input, Space, Select, Cascader, Button, Form } from 'antd';
const { TextArea } = Input;
import { cityArray } from '../components/cityData';

const Publish = () => {
  const [selectedValue, setSelectedValue] = useState(true) // 是否允许修改邮费部分
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const selected = (value) => { // value = zishe / baoyou / ziti
    if (value === "zishe") {
      setSelectedValue(false)
    } else {
      setSelectedValue(true)
    }
  };
  const publishGoods = () => {
    console.log(myContent)
  }
  const saveDraft = () => {

  }
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
      initialValues={{
        fahuo: "baoyou",
        youfei: 0,
        yuanjia: 0,
        shoujia: 0
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="简介"
        name="jianjie"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <TextArea
          placeholder="请输入商品描述"
          showCount
          required
          maxLength={500}
          autoSize={{
            minRows: 4,
            maxRows: 4,
          }}
        />
      </Form.Item>

      <Form.Item
        label="地址"
        name="dizhi"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Cascader style={{ width: 200, }} options={cityArray} placeholder="Please select" />
      </Form.Item>

      <Form.Item label="发货方式">
        <Space.Compact>
          <Form.Item
            name={['fahuo', 'youfei']}
            noStyle
          >
            <Select
          style={{
            width: 80,
          }}
          onChange={selected}
          defaultValue={"baoyou"} // Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.
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
            name={['address', 'street']}
            noStyle
            rules={[
              {
                required: true,
                message: 'Street is required',
              },
            ]}
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">发布</Button>
          <Button onClick={saveDraft}>存草稿</Button>
        </Space>
      </Form.Item>

    </Form>
  );
};
export default Publish;
