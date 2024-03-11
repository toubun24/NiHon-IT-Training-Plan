import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Image, Button, message, Modal } from 'antd';
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化

const stateList = ['正常', '禁购', '禁售', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const colorList = ['green', 'orange', 'orange', 'red', 'gray']
const argueList = [ // 申诉状态，0无申诉，1申诉中，2卖方同意退货，3卖方驳回后等待管理员仲裁，4管理员支持买方退货，5管理员支持卖方驳回申诉，6申诉已撤销
  "无申诉", // 0 for 无申诉
  "退货申诉中", // 1 for 申诉中
  "卖方同意退货", // 2 for 卖方同意退货
  "驳回等待仲裁", // 3 for 卖方驳回后等待管理员仲裁
  "仲裁支持退货", // 4 for 管理员支持买方退货
  "仲裁驳回申诉", // 5 for 管理员支持卖方驳回申诉
  "申诉已撤销", // 6 for 申诉已撤销
]
const argueColorList = [
  "gray", // 0 for 无申诉
  "geekblue", // 1 for 申诉中
  "cyan", // 2 for 卖方同意退货
  "volcano", // 3 for 卖方驳回后等待管理员仲裁
  "green", // 4 for 管理员支持买方退货
  "red", // 5 for 管理员支持卖方驳回申诉
  "gray", // 6 for 申诉已撤销
]

const Unfinish = () => {
  const [tradesData, setTradesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [handlingId, setHandlingId] = useState();

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades?_sort=modifyTime&_order=desc&argue_ne=0&argue_ne=1&argue_ne=2&argue_ne=3&argue_ne=6`) // 按发布时间降序 // desc // state_ne // (argue=4|argue=5)不行
    setTradesData(res.data)
    const res2 = await axios.get(`http://localhost:5000/users`)
    setUsersData(res2.data)
  }, []);

  const columns = [
    {
      title: '商品图片',
      key: 'tupian',
      dataIndex: 'tupian', // 就是title本身
      render: (_,item) => {
        // console.log(item.tupian)
        return item.tupian&&<Image width={64} src={require(`@/images/goods/${item.tupian}`)} />
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
            <Tag color={colorList[userInfo.state]}>{stateList[userInfo.state]}</Tag>
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
            <Tag color={colorList[userInfo.state]}>{stateList[userInfo.state]}</Tag>
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
      render: (title) => { // 预览页面 // item
        return <span>{title ? moment(title).format('YY/MM/DD HH:mm:ss') : "-"}</span>
      }
    },
    {
      title: '审核结果',
      key: 'action',
      render: (item) => ( // item.id
      <Tag color={argueColorList[item.argue]}>{argueList[item.argue]}</Tag>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} rowKey="id" dataSource={tradesData} pagination={{ pageSize: 5 }} />
    </div>
  )
};
export default Unfinish;