import React, { useState, useEffect } from 'react';
import { Badge, Descriptions } from 'antd';
import { useParams } from 'umi'; // useParams
import axios from 'axios';


const Orders = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [tradeData, setTradeData] = useState({})


  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/${params.id}`)
    setTradeData(res.data)
  }, [])
  const items = [
    {
      key: '1',
      label: '商品名称',
      children: tradeData.id,
    },
    {
      key: '2',
      label: '成交金额',
      children: 'Prepaid',
    },
    {
      key: '3',
      label: '购买数量',
      children: 'YES',
    },
    {
      key: '4',
      label: 'Order time',
      children: '2018-04-24 18:00:00',
    },
    {
      key: '5',
      label: 'Usage Time',
      span: 2,
      children: '2019-04-24 18:00:00',
    },
    {
      key: '6',
      label: 'Status',
      span: 3,
      children: <Badge status="processing" text="Running" />,
    },
    {
      key: '7',
      label: 'Negotiated Amount',
      children: '$80.00',
    },
    {
      key: '8',
      label: 'Discount',
      children: '$20.00',
    },
    {
      key: '9',
      label: 'Official Receipts',
      children: '$60.00',
    },
    {
      key: '10',
      label: 'Config Info',
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
    },
  ];

  return (
    <Descriptions title="订单详情" layout="vertical" bordered items={items} />
  )
};
export default Orders;