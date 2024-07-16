import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Image, Button, message, Modal, Form, Input } from 'antd';
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化

// 申诉状态，0无申诉，1申诉中，2卖方同意退货，3卖方驳回后等待管理员仲裁，4管理员支持买方退货，5管理员支持卖方驳回申诉，6申诉已撤销
const stateList = ['正常', '禁购', '禁售', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const colorList = ['green', 'orange', 'orange', 'red', 'gray']

const Unfinish = () => { // stateId: 1正常 2禁购 3禁售 4封禁 5注销 6管理 7超级管理 8禁用管理
  const [tradesData, setTradesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [handlingId, setHandlingId] = useState();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const tokenContent = localStorage.getItem('token')
  const myId = tokenContent == '' ? { myId: '' } : JSON.parse(tokenContent).id // JSON.parse // .id
  const myName = tokenContent == '' ? { myName: '' } : JSON.parse(tokenContent).username // JSON.parse // .id

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades?_sort=modifyTime&_order=desc&state=4&argue=3`) // 按发布时间降序 // desc // state_ne
    setTradesData(res.data)
    const res2 = await axios.get(`http://localhost:5000/users`)
    setUsersData(res2.data)
  }, []);

  const handleClick = (itemId, check1or2) => {
    setHandlingId(itemId)
    check1or2 === 1 ? setIsModalOpen1(true) : setIsModalOpen2(true)
  }
  const handleOk1 = async () => {
    try {
      const values = await form1.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      const tradeInfo = tradesData.find(obj => obj.id === handlingId)
      const res0 = await axios.get(`http://localhost:5000/users/${tradeInfo.buyerId}`)
      const earnMoney = tradeInfo.price - Number(tradeInfo.youfei) // 邮费不算赚到的
      await axios.patch(`http://localhost:5000/users/${tradeInfo.buyerId}`, {
        balance: res0.data.balance + earnMoney // 邮费不再归还
      })
      const res = await axios.get(`http://localhost:5000/users/${tradeInfo.sellerId}`)
      await axios.patch(`http://localhost:5000/users/${tradeInfo.sellerId}`, {
        balance: res.data.balance - earnMoney,
        earn: res.data.earn - earnMoney
      })
      const res2 = await axios.get(`http://localhost:5000/goods/${tradeInfo.goodId}`)
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log("res2.data.num", res2.data.num, "tradeInfo.num", tradeInfo.num)
      await axios.patch(`http://localhost:5000/goods/${tradeInfo.goodId}`, {
        num: Number(res2.data.num) + Number(tradeInfo.num) // 库存归还
      })
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 6,
        argue: 4,
        argueReply2: values.reply1,
        editTime: Date.now(),
        auditor: myName
      })
      const res3 = await axios.get(`http://localhost:5000/users/${myId}`)
      await axios.patch(`http://localhost:5000/users/${myId}`, {
        argueNum: res3.data.argueNum + 1,
      })
      setTradesData(tradesData.filter(data => data.id !== handlingId))
      message.info('仲裁完成，支持退货');
      setIsModalOpen1(false);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleOk2 = async () => {
    try {
      const values = await form2.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 7,
        argue: 5,
        argueReply2: values.reply2,
        editTime: Date.now(),
        auditor: myName
      })
      const res3 = await axios.get(`http://localhost:5000/users/${myId}`)
      await axios.patch(`http://localhost:5000/users/${myId}`, {
        argueNum: res3.data.argueNum + 1,
      })
      setTradesData(tradesData.filter(data => data.id !== handlingId))
      message.info('仲裁完成，驳回申诉');
      setIsModalOpen2(false);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const columns = [
    {
      title: '商品图片',
      key: 'tupian',
      dataIndex: 'tupian', // 就是title本身
      render: (title) => {
        return <Image width={64} src={require(`@/images/goods/${title}`)} />
      }
    },
    {
      title: '商品快照',
      key: 'introduction',
      dataIndex: 'introduction',
      // width: '25%',
      render: (title, item) => { // 预览页面 // item
        return <a href={`/snapshots/${item.id}`}>{title}</a>
      }
    },
    {
      title: '卖方用户及状态',
      key: 'sellerId',
      dataIndex: 'sellerId',
      render: (sellerId) => { // 预览页面 // item
        // console.log("sellerId", sellerId, "title", title, "item", item)
        const userInfo = usersData.find(obj => obj.id === sellerId)
        // console.log(usersData.find(obj => obj.id === sellerId))
        // const usernameValue=userInfo.username
        // const stateValue=userInfo.state
        return ( // 一格渲染多数据
          userInfo && // userInfo &&
          <Space>
            <a href={`/homepages/${sellerId}`}>{userInfo.username}</a>
            <Tag color={colorList[userInfo.stateId-1]}>{stateList[userInfo.stateId-1]}</Tag>
          </Space>
        )
      }
    },
    {
      title: '买方用户及状态',
      key: 'buyerId',
      dataIndex: 'buyerId',
      render: (buyerId) => { // 预览页面 // item
        const userInfo = usersData.find(obj => obj.id === buyerId)
        return ( // 一格渲染多数据
          userInfo && // userInfo&&
          <Space>
            <a href={`/homepages/${buyerId}`}>{userInfo.username}</a>
            <Tag color={colorList[userInfo.stateId-1]}>{stateList[userInfo.stateId-1]}</Tag>
          </Space>
        )
      }
    },
    {
      title: '订单详情',
      key: 'snapshot',
      // width: '20%',
      dataIndex: 'snapshot',
      render: (title, item) => { // 预览页面 // item
        return <a href={`/orders/${item.id}`}>查看</a>
      }
    },
    {
      title: '最近修改',
      key: 'modify',
      dataIndex: 'editTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.editTime - b.editTime,
      render: (title) => { // 预览页面 // item
        return <span>{title ? moment(title).format('YY/MM/DD HH:mm:ss') : "-"}</span>
      }
    },
    {
      title: '审核操作',
      key: 'action',
      render: (item) => ( // item.id
        <Space>
          <Button key='pass' type='primary' onClick={() => handleClick(item.id, 1)}>支持买方退货</Button>
          <Button key='notPass' danger onClick={() => handleClick(item.id, 2)}>驳回退货申诉</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} rowKey="id" dataSource={tradesData} pagination={{ pageSize: 5 }} />
      <Modal // 1 支持退货
        title="支持退货"
        open={isModalOpen1}
        closeIcon={false}
        footer={[ // footer
          <Button
            key='back'
            onClick={handleCancel} // 不能写()=>XXX，要注意()=>XXX()
          >
            返回
          </Button>,
          <Button
            key='ok'
            type="primary"
            onClick={() => handleOk1()} // 不能写()=>XXX，要注意()=>XXX()
          >
            确认无误
          </Button>,
        ]}
      >
        <p>是否确认支持买方的退货申诉</p>
        <Form
          form={form1}
        >
          <Form.Item
            name="reply1"
            rules={[
              {
                required: true,
                message: '内容不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal // 2 驳回申请
        title="驳回申请"
        open={isModalOpen2}
        closeIcon={false}
        footer={[ // footer
          <Button key='back' onClick={handleCancel}>返回</Button>,
          <Button key='ok' type="primary" onClick={handleOk2}>确认无误</Button>,
        ]}
      >
        <p>是否确认驳回买方的退货申诉</p>
        <Form
          form={form2}
        >
          <Form.Item
            name="reply2"
            rules={[
              {
                required: true,
                message: '内容不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};
export default Unfinish;