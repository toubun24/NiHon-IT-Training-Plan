import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'; // 时间戳格式化
import { useHistory, useParams } from 'umi';

// trade.state: 订单进度，0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消

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
const handleList = [
  "付款", // 0 for 已下单待付款
  "催发货", // 1 for 已付款待发货
  "确认收货", // 2 for 待收货
  "去评价", // 3 for 待评价
  "查看进度", // 4 for 退款中
  "-", // 5 for 已取消
]

const BoughtAll = () => {
  const [listData, setListData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent).id // JSON.parse // .id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory()
  const [clickId, setClickId] = useState();
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [mergedData, setMergedData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/?buyerId=${myContent}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    const tradesData = res.data
    // setTradesData(res.data)
    // const res2 = await axios.get(`http://localhost:5000/goods/?buyerId=${params.id}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    // setTradeData(res2.data)
    // console.log("0",res.data)
    const requests = tradesData && tradesData.map(item => { console.log("item", item); return axios.get(`http://localhost:5000/goods/${item.goodId}`) });
    axios.all(requests).then(axios.spread((...responses) => { // axios.all // axios.spread // 和这一层可能也有关
      const goodsData = responses.map(response => {
        // console.log("!",response.data)
        return response.data // return
      })
      // setGoodsData(tmp)
      // console.log("tmp",tmp)
      setMergedData(tradesData.map((trade, index) => {
        const good = goodsData[index]
        return {
          ...trade,
          good: good,
        };
      }))
    }))
  }, []);
  const showModal = (itemId) => {
    setClickId(itemId)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setListData(listData.filter(data => data.id !== clickId)) // 页面不再显示
    axios.patch(`http://localhost:5000/goods/${clickId}`, {
      state: 4,
      editTime: Date.now()
    }).then(res => {
      notification.open({
        message: '通知',
        description:
          `请到【已下架】查看下架商品`,
        // onClick: () => { console.log('Notification Clicked!'); },
        duration: 2,
        placement: "bottomRight"
      });
    })
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleTrade = (itemId, itemState) => { // itemState: 0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
    history.push(`/goods/modify/${itemId}`)
  }
  const tradeDetail = (itemId) => {

    history.push(`/orders/${itemId}`)
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={mergedData}
        pagination={{ // 分页
          // onChange: (page) => { console.log(page); },
          pageSize: 6,
        }}
        // loading
        renderItem={(item) => (
          <List.Item
            actions={[<a onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a>, <a style={{ color: "red" }} onClick={() => { showModal(item.good.id) }}>删除</a>]}
          >
            <Modal title="是否删除商品？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>商品下架后，进行中和已完成的订单不受影响；下架的商品将在【已下架】中继续保留7天</p>
            </Modal>
            <Skeleton avatar title={false} loading={item.good.loading} active>
              <List.Item.Meta
                avatar={<Avatar shape="square" size={96} src={require(`@/images/goods/${item.good.tupian}`)} />} // src require @/
                title={<a onClick={() => tradeDetail(item.id)}>{item.good.introduction}</a>}
                description={
                  <>
                    <div style={{ color: "red" }}>¥ {item.price}</div>
                    <br />
                    <Space style={{ fontSize: 12 }}>
                      <div>
                        下单时间:{item.good.publishTime ? moment(item.orderTime).format('YY/MM/DD HH:mm:ss') : "-"}
                      </div>
                      <div>
                        最近修改:{item.good.editTime ? moment(item.editTime).format('YY/MM/DD HH:mm:ss') : "-"}
                      </div>
                    </Space>
                  </>
                }
              />
              <div><Tag color={colorList[item.state]}>{stateList[item.state]}</Tag></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
export default BoughtAll;