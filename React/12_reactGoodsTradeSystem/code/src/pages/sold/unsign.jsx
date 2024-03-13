import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification, Button, message, Input, Form, Badge } from 'antd';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'; // 时间戳格式化
import { useHistory, useParams } from 'umi';
import './all.less' // actions标签min-width

// trade.state: 订单进度，0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消

const colorList = [
  "gold", // 0 for 已下单待付款
  "cyan", // 1 for 已付款待发货
  "volcano", // 2 for 待收货
  "green", // 3 for 待评价
  "red", // 4 for 退款中
  "gray", // 5 for 已取消
  "geekblue", // 6 for 已退款
  "lime", // 7 for 已完成
]
const stateList = [
  "待付款", // 0 for 已下单待付款
  "待发货", // 1 for 已付款待发货
  "待收货", // 2 for 待收货
  "待评价", // 3 for 待评价
  "退货中", // 4 for 退款中
  "已取消", // 5 for 已取消
  "已退货", // 6 for 已退款
  "已完成", // 7 for 已完成
]
const handleList = [
  "-", // 0 for 已下单待付款
  "快递单号", // 1 for 已付款待发货
  "-", // 2 for 待收货
  "去评价", // 3 for 待评价
  "申诉处理", // 4 for 退款中
  "-", // 5 for 已取消
  "-", // 6 for 已退款
  "去评价", // 7 for 已完成
]
const allClosedStatus = [false, false, false, false, false, false, false, false]

const SoldAll = () => {
  const [listData, setListData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent).id // JSON.parse // .id
  const history = useHistory()
  const [clickId, setClickId] = useState();
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [mergedData, setMergedData] = useState([]);
  const [handlingId, setHandlingId] = useState();
  const [displayPrice, setDisplayPrice] = useState();
  const [isModalOpen1, setIsModalOpen1] = useState(allClosedStatus);
  // const [myBalance, setMyBalance] = useState();
  const [form] = Form.useForm();
  const [commentForm] = Form.useForm();

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/?sellerId=${myContent}&_sort=editTime&_order=desc&state=2`) // 按时间降序 // desc // state_ne
    const tradesData = res.data
    const requests = tradesData && tradesData.map(item => {
      return axios.get(`http://localhost:5000/goods/${item.goodId}`)
    });
    axios.all(requests).then(axios.spread((...responses) => {
      const goodsData = responses.map(response => {
        return response.data
      })
      setMergedData(tradesData.map((trade, index) => {
        const good = goodsData[index]
        return {
          ...trade,
          good: good,
        };
      }))
    }))
    const res2 = await axios.get(`http://localhost:5000/users/${myContent}`)
    // setMyBalance(res2.data.balance)
  }, []);
  const handleTrade = (itemId, itemState) => { // itemState: 0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
    if (itemState === 1) {
      form.resetFields() // 每次打开后重新初始化form内容
    }
    if (itemState === 3 || itemState === 7) {
      commentForm.resetFields() // 每次打开后重新初始化form内容
    }
    setHandlingId(itemId)
    setDisplayPrice(mergedData.find(obj => obj.id === itemId).price)
    setIsModalOpen1(prevState => {
      // 使用map方法创建一个新的数组，并在对应id的位置将值设置为true
      return prevState.map((isOpen, index) => {
        if (index === itemState) {
          return true; // 如果当前索引等于id，返回true
        }
        return isOpen; // 否则返回原值
      })
    })
  }
  const handleOk1 = async () => {
    try {
      const values = await form.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      // console.log('Form values:', values);
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 2,
        kuaidi: values.kuaidi
      })
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, state: 2 };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `请到【待收货】查看已发货商品`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen1(allClosedStatus);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleOk37 = async () => {
    try {
      const values = await commentForm.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      // console.log('Form values:', values);
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        commentBySeller: values.comment
      })
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, commentBySeller: values.comment };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `已完成互评`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen1(allClosedStatus);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleOk41 = async () => {
    const tradeInfo = mergedData.find(obj => obj.id === handlingId)
    const res0 = await axios.get(`http://localhost:5000/users/${tradeInfo.buyerId}`)
    const earnMoney = displayPrice - Number(tradeInfo.youfei) // 邮费不算赚到的
    await axios.patch(`http://localhost:5000/users/${tradeInfo.buyerId}`, {
      balance: res0.data.balance + earnMoney // 邮费不再归还
    })
    const res = await axios.get(`http://localhost:5000/users/${myContent}`)
    // console.log("res.data.balance",res.data.balance,"res.data.earn",res.data.earn,"displayPrice",displayPrice,"Number(tradeInfo.youfei)",Number(tradeInfo.youfei),"earnMoney",earnMoney)
    await axios.patch(`http://localhost:5000/users/${myContent}`, {
      balance: res.data.balance - earnMoney,
      earn: res.data.earn - earnMoney
    })
    const res2 = await axios.get(`http://localhost:5000/goods/${tradeInfo.goodId}`)
    console.log("res2.data.num", res2.data.num, "tradeInfo.num", tradeInfo.num)
    await axios.patch(`http://localhost:5000/goods/${tradeInfo.goodId}`, {
      num: Number(res2.data.num) + Number(tradeInfo.num) // 库存归还
    })
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      state: 6,
      argue: 2
    })
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: 6, argue: 2 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【已取消】查看已退货订单`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen1(allClosedStatus);
  };
  const handleOk42 = async () => {
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      argue: 3
    })
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, argue: 3 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【申诉中】查看相关订单`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen1(allClosedStatus);
  };
  const handleCancel = () => {
    setIsModalOpen1(allClosedStatus);
  };
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
            actions={[
              <a className="fixed-width-action" onClick={() => history.push(`/snapshots/${item.id}`)}>查看快照</a>,
              item.state === 1 && item.dot === true ?
                <Badge dot><a className="fixed-width-action" onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a></Badge>
                :
                (item.state === 3 || item.state === 7) && item.commentBySeller === "" ?
                  <a className="fixed-width-action" onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a>
                  :
                  item.state === 1 || (item.state === 4 && item.argue !== 3) ?
                    <a className="fixed-width-action" onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a>
                    :
                    <span className="fixed-width-action">-</span>,
            ]}
          >
            <Modal // 1 填写快递单号
              title="快递单号"
              open={isModalOpen1[1]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='submit' type="primary" onClick={handleOk1}>确认发货</Button>,
              ]}
            >
              <p>请尽快发货并填写快递单号：</p>
              <Form
                form={form}
              // initialValues={{ kuaidi: "" }}
              >
                <Form.Item
                  name="kuaidi"
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
            <Modal // 3 评价
              title="发表评价"
              open={isModalOpen1[3] || isModalOpen1[7]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='submit' type="primary" onClick={handleOk37}>发布评价</Button>,
              ]}
            >
              <p>请填写交易评价：</p>
              <Form
                form={commentForm}
              >
                <Form.Item
                  name="comment"
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
            <Modal // 4 申诉处理
              title="申诉处理"
              open={isModalOpen1[4]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk41}>同意退货</Button>,
                <Button key='reject' type="primary" onClick={handleOk42}>拒绝退货，申请仲裁</Button>,
              ]}
            >
              <p>是否确认退款</p>
            </Modal>
            <Skeleton avatar title={false} loading={item.good.loading} active>
              <List.Item.Meta
                avatar={<Avatar shape="square" size={96} src={require(`@/images/goods/${item.good.tupian}`)} onClick={() => history.push(`/goods/detail/${item.goodId}`)} style={{ cursor: 'pointer' }} />} // src require @/
                title={<a onClick={() => tradeDetail(item.id)}>订单详情-{item.good.introduction}</a>}
                description={
                  <>
                    <div style={{ color: "red" }}>¥ {item.price}</div>
                    <br />
                    <Space style={{ fontSize: 12 }}>
                      <div>
                        下单时间:{moment(item.orderTime).format('YY/MM/DD HH:mm:ss')}
                      </div>
                      <div>
                        快照时间:{item.editTime && item.editTime !== item.orderTime ? moment(item.editTime).format('YY/MM/DD HH:mm:ss') : "-"}
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
export default SoldAll;