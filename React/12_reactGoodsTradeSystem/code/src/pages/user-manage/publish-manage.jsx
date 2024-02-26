import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Image, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化

const stateList = ['正常', '禁购', '禁售', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const colorList = ['green', 'orange', 'orange', 'red', 'gray']

const PublishManage = () => {
  const [goodsData, setGoodsData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/goods?_expand=user&_sort=modifyTime&_order=desc&state=1`).then( // 按发布时间降序 // desc // state_ne
      res => {
        setGoodsData(res.data)
      }
    )
  }, []);
  const checkPass = (itemId) => {
    axios.patch(`http://localhost:5000/goods/${itemId}`, { // post => patch 仅更新 // /${params.id}
      "state": 2 // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架
    }).then(res => {
      setGoodsData(goodsData.filter(data => data.id !== itemId))
      message.info('审核通过');
    })
  }
  const checkNotPass = (itemId) => {
    axios.patch(`http://localhost:5000/goods/${itemId}`, { // post => patch 仅更新 // /${params.id}
      "state": 3 // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架
    }).then(res => {
      setGoodsData(goodsData.filter(data => data.id !== itemId))
      message.info('审核不通过');
    })
  }

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'tupian', // 就是title本身
      render: (title) => {
        return <Image width={64} src={require(`@/images/goods/${title}`)} />
      }
    },
    {
      title: '发布用户及状态',
      dataIndex: 'user', // 子对象嵌套写法
      render: (item) => { // 预览页面 // item
        return ( // 一格渲染多数据
          <Space>
            <a href={`/users/${item.id}`}>{item.username}</a>
            <Tag color={colorList[item.state]}>{stateList[item.state]}</Tag>
          </Space>
        )
      }
    },
    {
      title: '商品详情',
      dataIndex: 'introduction',
      width: '25%',
      render: (title, item) => { // 预览页面 // item
        return <a href={`/goods/detail/${item.id}`}>{title}</a>
      }
    },
    {
      title: '售价',
      width: '9%',
      dataIndex: 'shoujia',
      render: (title) => { // 预览页面 // item
        return <span>¥ {title}</span>
      }
    },
    {
      title: '最近修改',
      dataIndex: 'editTime',
      render: (title) => { // 预览页面 // item
        return <span>{title ? moment(title).format('YY/MM/DD HH:mm:ss') : "-"}</span>
      }
    },
    {
      title: '审核操作',
      key: 'action',
      render: (item) => ( // item.id
        <Space>
          <Button type='primary' onClick={() => checkPass(item.id)}>通过</Button>
          <Button danger onClick={() => checkNotPass(item.id)}>不通过</Button>
        </Space>
      ),
    },
    /*
    


    */
  ];


  return (
    <Table columns={columns} dataSource={goodsData} pagination={{ pageSize: 5 }} />
  )
};
export default PublishManage;