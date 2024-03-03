import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Statistic, Modal, QRCode, InputNumber, Form, Descriptions, Space, Tag } from 'antd';
import axios from 'axios';
import { LikeOutlined } from '@ant-design/icons';

const stateList = ['正常', '禁购', '禁售', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const colorList = ['green', 'orange', 'orange', 'red', 'gray']

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('https://ant.design/');
  const [form] = Form.useForm();
  const [goodsData, setGoodsData] = useState([]);
  const [viewData, setViewData] = useState([]); // 总浏览量
  const [dayData, setDayData] = useState() // 注册天数
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const [balanceData, setBalanceData] = useState()

  useEffect(() => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    // console.log(tokenContent);
    // console.log(myContent)
    axios.get(`http://localhost:5000/goods?userId=${myContent.id}`).then( // 按发布时间降序 // desc // state_ne
      res => {
        setGoodsData(res.data)
        const totalViews = res.data.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.view; // 对view项求和
        }, 0)
        setViewData(totalViews)
      }
    )
    axios.get(`http://localhost:5000/users/${myContent.id}`).then(
      res => {
        setBalanceData(res.data.balance)
      }
    )
    const nowTime = new Date()
    const nowDay = nowTime.setHours(0, 0, 0, 0)
    const registerTime = new Date(myContent.registerTime)
    const registerDay = registerTime.setHours(0, 0, 0, 0)
    const differenceInDays = Math.floor((nowDay - registerDay) / (1000 * 60 * 60 * 24))
    // console.log(differenceInDays)
    setDayData(differenceInDays)
  }, [])
  const showModal = () => {
    setIsModalOpen(true);
  };
  /*
  const handleOk = (values) => {
    console.log('submit', values);
    setIsModalOpen(false);
  };
  */
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      // console.log('Form values:', values);
      // console.log(information);
      await axios.patch(`http://localhost:5000/users/${myContent.id}`, { balance: balanceData + values.recharge })
      setBalanceData(balanceData + values.recharge)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    console.log('changed', value);
  };

  const items = [
    {
      key: '1',
      label: '用户名',
      children: (<Space>
        {myContent.username}
        <Tag color={colorList[myContent.state]}>{stateList[myContent.state]}</Tag>
      </Space>),
    },
    {
      key: '2',
      label: '常用地址',
      children: (<Space>{myContent.location}</Space>),
    },
    {
      key: '3',
      label: '注册天数',
      // children: (<div>{Math.floor(((new Date().setHours(0, 0, 0, 0)) - (new Date(information.registerTime).setHours(0, 0, 0, 0))) / (1000 * 60 * 60 * 24))}</div>), // Warning: Received NaN for the `children` attribute. If this is expected, cast the value to a string
      children: dayData
    },
    {
      key: '4',
      label: '获浏览量',
      children: viewData,
    },
    {
      key: '5',
      label: '获收藏量',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
    {
      key: '6',
      label: '获关注量',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
  ];

  return (
    <div>
      <Descriptions title="账户详情" items={items} extra={<Button type="primary">Edit</Button>} />
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="累计收益" value={112893} precision={2} />
        </Col>
        <Col span={4}>
          <Statistic title="账户余额" value={balanceData} precision={2} />
          <Button
            style={{
              marginTop: 16,
            }}
            type="primary"
            onClick={showModal}
          >
            充值
          </Button>
        </Col>
        <Col span={4}>
          <Statistic title="被收藏" value={1128} prefix={<LikeOutlined />} />
        </Col>
      </Row>


      <Modal
        title="充值中心"
        open={isModalOpen}
        footer={[ // footer
          <Button key="back" onClick={handleCancel}>取消充值</Button>,
          <Button key="submit" type="primary" onClick={handleOk}>确认充值</Button>,
        ]}
      >
        <p>请扫描二维码充值</p>
        <QRCode value={text || '-'} />
        <p>好吧这一块功能暂时不好实现，直接输入充值金额吧</p>
        <Form
          form={form}
          initialValues={{ recharge: 1 }}
        >
          <Form.Item name="recharge">
            <InputNumber min={1} max={1000} onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};
export default Homepage;