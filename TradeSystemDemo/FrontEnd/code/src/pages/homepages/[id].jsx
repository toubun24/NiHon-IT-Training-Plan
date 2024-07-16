import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row, Statistic, Modal, QRCode, InputNumber, Form, Descriptions, Space, Tag, Upload, Input, Cascader } from 'antd';
import axios from 'axios';
import { EyeOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'umi';
import { cityArray } from './../../components/cityData';
import OtherAvatar from '../../components/otherAvatar';
import MyBack from './../../components/myBack';

const stateList = ['正常', '禁购', '禁售', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const colorList = ['green', 'orange', 'orange', 'red', 'gray']

const Homepages = () => { // stateId: 1正常 2禁购 3禁售 4封禁 5注销 6管理 7超级管理 8禁用管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [text, setText] = useState('https://ant.design/');
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  // const [goodsData, setGoodsData] = useState([]);
  const [viewData, setViewData] = useState([]); // 总浏览量
  const [dayData, setDayData] = useState() // 注册天数
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const [balanceData, setBalanceData] = useState()
  const [starData, setStarData] = useState()
  const [followData, setFollowData] = useState()
  const formRef = useRef() // useRef // 不同渲染之间无法共享state状态值；采用useRef，作为组件实例的变量，保证获取到的数据肯定是最新的，且ref更改不会re-render
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userData, setUserData] = useState([]);
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值

  useEffect(() => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    // console.log(tokenContent);
    // console.log(myContent)
    axios.get(`http://localhost:5000/goods?userId=${params.id}`).then( // 按发布时间降序 // desc // state_ne
      res => {
        // setGoodsData(res.data)
        const totalViews = res.data.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.view; // 对view项求和
        }, 0)
        setViewData(totalViews)
        const totalStars = res.data.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.starList.length; // 对view项求和
        }, 0)
        setStarData(totalStars)
      }
    )
    axios.get(`http://localhost:5000/users/${params.id}`).then( // 按发布时间降序 // desc // state_ne
      res => {
        setUserData(res.data)
        setBalanceData(res.data.balance)
        setFollowData(res.data.followerList.length)
        const nowTime = new Date()
        const nowDay = nowTime.setHours(0, 0, 0, 0)
        const registerTime = new Date(res.data.registerTime) // res.data.registerTime
        const registerDay = registerTime.setHours(0, 0, 0, 0)
        const differenceInDays = Math.floor((nowDay - registerDay) / (1000 * 60 * 60 * 24))
        // console.log("differenceInDays",differenceInDays)
        setDayData(differenceInDays)
      }
    )
  }, [])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
    axios.get(`http://localhost:5000/users/${myContent.id}`).then(
      res => {
        let { username, location } = res.data // 解构出所需数据
        formRef.current.setFieldsValue({ // 预填充默表单认值
          username,
          location
        })
      }
    )
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
      console.log('Form values:', values);
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
  /*
  const onChange = (value) => {
    console.log('changed', value);
  };
  */
  const handleOk2 = async () => {
    try {
      const values = await formRef.current.validateFields(); // formRef.current.validateFields()
      console.log("ok", values)
      await axios.patch(`http://localhost:5000/users/${myContent.id}`, {
        username: values.username,
        location: values.location ? values.location : '',
        avatar: values.touxiang ? values.touxiang[0].name : userData.avatar, // 未上传头像则继续使用原头像
      })
      setUserData({
        ...userData,
        username: values.username,
        location: values.location ? values.location : '',
        avatar: values.touxiang ? values.touxiang[0].name : userData.avatar, // 未上传头像则继续使用原头像
      })
      setIsModalOpen2(false)
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
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

  const items = [
    {
      key: '1',
      label: '用户名',
      children: (<Space>
        {userData.username}
        <Tag color={colorList[userData.stateId-1]}>{stateList[userData.stateId-1]}</Tag>
      </Space>),
    },
    {
      key: '2',
      label: '常用地址',
      children: (<Space>{userData.location}</Space>),
    },
    {
      key: '3',
      label: '注册天数',
      // children: (<div>{Math.floor(((new Date().setHours(0, 0, 0, 0)) - (new Date(information.registerTime).setHours(0, 0, 0, 0))) / (1000 * 60 * 60 * 24))}</div>), // Warning: Received NaN for the `children` attribute. If this is expected, cast the value to a string
      children: dayData
    },
    {
      key: '4',
      label: (<Space><EyeOutlined />获浏览量</Space>),
      children: viewData,
    },
    {
      key: '5',
      label: (<Space><StarOutlined />获收藏量</Space>),
      children: starData,
    },
    {
      key: '6',
      label: (<Space><TeamOutlined />获关注量</Space>),
      children: followData,
    },
  ];

  return (
    <div>
      <div><MyBack/></div>
      <br/>
      <Row gutter={24}>
        {params.id == myContent.id ? // ==
          <Col span={4}>
            <Statistic title="累计收益" value={0} precision={2} />
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
          :
          <Col span={4}>
            <OtherAvatar userIdInfo={params.id} size={128} />
          </Col>}
        <Col span={20}>
          <Descriptions title="账户详情" items={items} extra={params.id == myContent.id ? // ==
            <Button type="primary" onClick={showModal2}>修改</Button>
            :
            <></>} />
        </Col>
      </Row>

      <Modal
        title="充值中心"
        open={isModalOpen}
        closeIcon={false}
        // destroyOnClose={true}
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
            <InputNumber min={1} max={1000} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="修改账户信息"
        open={isModalOpen2}
        closeIcon={false}
        footer={[ // footer
          <Button key="back" onClick={handleCancel2}>取消修改</Button>,
          <Button key="submit" type="primary" onClick={handleOk2}>确认修改</Button>,
        ]}
      >
        <Form
          form={form2}
          // initialValues={{ username: 1 }}
          ref={formRef}
        >
          <Form.Item
            name="username"
            label="修改用户名称"
          >
            <Input // form.getFieldValue(): 从form.item取值
              style={{ width: 300, }}
            />
          </Form.Item>
          <Form.Item
            label="修改常用地址"
            name="location"
          >
            <Cascader style={{ width: 200, }} options={cityArray} />
          </Form.Item>
          <Form.Item
            label="上传新头像"
            name="touxiang"
            valuePropName="fileList"
            getValueFromEvent={normFile}
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

        </Form>
      </Modal>
    </div>
  )
};
export default Homepages;