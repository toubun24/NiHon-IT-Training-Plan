import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Statistic, Modal, QRCode, InputNumber, Form } from 'antd';
import axios from 'axios';
const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('https://ant.design/');
  const [information, setInformation] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const tokenContent = localStorage.getItem('token')
    tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
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
      await axios.patch(`http://localhost:5000/users/${information.id}`, { balance: information.balance + values.recharge })
      setInformation({ ...information, balance: information.balance + values.recharge })
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
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
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
        <Col span={12}>
          <Statistic title="Active Users" value={112893} loading />
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