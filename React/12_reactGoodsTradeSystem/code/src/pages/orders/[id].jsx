import React, { useState, useEffect } from 'react';
import { Badge, Descriptions, Tag, Tooltip } from 'antd';
import { useHistory, useParams } from 'umi'; // useParams
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化
import MyBack from './../../components/myBack';

const colorList = [
  "gold", // 0 for 已下单待付款
  "cyan", // 1 for 已付款待发货
  "volcano", // 2 for 待收货
  "green", // 3 for 待评价
  "red", // 4 for 退款中
  "gray", // 5 for 已取消
]
const stateList = [
  "待付款", // 0 for 已下单待付款
  "待发货", // 1 for 已付款待发货
  "待收货", // 2 for 待收货
  "待评价", // 3 for 待评价
  "退款中", // 4 for 退款中
  "已取消", // 5 for 已取消
]
const fahuofangshiList = {
  "zishe": "邮费: ¥",
  "baoyou": "包邮",
  "ziti": "仅限自提"
}

const Orders = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [tradeData, setTradeData] = useState({})
  const [tags, setTags] = useState([]);
  const [sellerData, setSellerData] = useState({})
  const [buyerData, setBuyerData] = useState({})
  const history = useHistory()

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/${params.id}`)
    setTradeData(res.data)
    const res2 = await axios.get(`http://localhost:5000/users/${res.data.sellerId}`)
    setSellerData(res2.data)
    const res3 = await axios.get(`http://localhost:5000/users/${res.data.buyerId}`)
    setBuyerData(res3.data)
    const tagIdData = res.data.tagList
    const requests = tagIdData && tagIdData.map(id => { return axios.get(`http://localhost:5000/tags/${id}`) });
    axios.all(requests).then(axios.spread((...responses) => {
      const tmp = responses.map(response => {
        return response.data.tagName
      })
      setTags(tmp)
    }))
  }, [])
  const ClickTag = (index) => {
    // console.log(tagData[index])
    history.push(`/goods/tag/${tagData[index]}`)
  }

  const items = [
    {
      key: '1',
      label: '商品详情',
      children: <a onClick={() => history.push(`/goods/detail/${tradeData.goodId}`)}>{tradeData.introduction}</a>,
    },
    {
      key: '2',
      label: '成交金额',
      children: "¥" + tradeData.price,
    },
    {
      key: '3',
      label: '购买数量',
      children: tradeData.num,
    },
    {
      key: '4',
      label: '发货方式及费用',
      children: <div>{fahuofangshiList[tradeData.fahuofangshi]}{tradeData.fahuofangshi === "zishe" ? tradeData.youfei : ""}</div>,
    },
    {
      key: '5',
      label: '订单状态',
      children: <Tag color={colorList[tradeData.state]}>{stateList[tradeData.state]}</Tag>,
    },
    {
      key: '6',
      label: '商品标签',
      children: <div>
      {
        tags && tags.length > 0 && tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              style={{
                userSelect: 'none',
                cursor: "pointer"
              }}
              color="gray"
              onClick={() => ClickTag(index)}
            >
              <span>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        }
        )
      }
    </div>,
    },
    {
      key: '7',
      label: '下单时间',
      children: moment(tradeData.orderTime).format('YY/MM/DD HH:mm:ss'),
    },
    {
      key: '8',
      label: '快照时间',
      children: moment(tradeData.finalEditTime).format('YY/MM/DD HH:mm:ss'),
    },
    {
      key: '9',
      label: '卖方用户',
      children: sellerData.username,
    },
    {
      key: '10',
      label: '买方用户',
      children: buyerData.username,
    },
    {
      key: '11',
      label: '发货地址',
      children: tradeData.dizhi?tradeData.dizhi.join(" "):"-",
    },
    {
      key: '12',
      label: '收货地址',
      children: tradeData.dizhi1&&<div>{tradeData.dizhi1.join(" ")+ ' ' + tradeData.dizhi2}</div>,
    },
    {
      key: '13',
      label: '备注',
      span: 4,
      children: tradeData.note?tradeData.note:"-",
    },

  ];

  return (
    <div>
      <Descriptions title={<div><MyBack/>订单详情</div>} layout="vertical" bordered items={items} column={4} />
    </div>
  )
};
export default Orders;