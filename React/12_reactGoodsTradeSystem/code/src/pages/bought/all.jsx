import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification, Button, message, Form, Input } from 'antd';
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
  "red", // 4 for 申诉中
  "gray", // 5 for 已取消
  "geekblue", // 6 for 已退款
  "lime", // 7 for 已完成
]
const stateList = [
  "待付款", // 0 for 已下单待付款
  "待发货", // 1 for 已付款待发货
  "待收货", // 2 for 待收货
  "待评价", // 3 for 待评价
  "申诉中", // 4 for 申诉中
  "已取消", // 5 for 已取消
  "已退货", // 6 for 已退款
  "已完成", // 7 for 已完成
]
const handleList = [
  "付款", // 0 for 已下单待付款
  "催发货", // 1 for 已付款待发货
  "确认收货", // 2 for 待收货
  "去评价", // 3 for 待评价
  "申诉进度", // 4 for 申诉中
  "-", // 5 for 已取消
  "-", // 6 for 已退款
  "-", // 7 for 已完成
]
const cancelList = [
  "取消订单", // 0 for 已下单待付款
  "退款", // 1 for 已付款待发货
  "查询物流", // 2 for 待收货
  "退货申诉", // 3 for 待评价
  "撤销申诉", // 4 for 申诉中
  "-", // 5 for 已取消
  "-", // 6 for 已退款
  "退货申诉", // 7 for 已完成
]
const allClosedStatus = [false, false, false, false, false, false, false, false]
const argueList = [ // // 申诉状态，0无申诉，1申诉中，2卖方同意退货，3卖方驳回后等待管理员仲裁，4管理员支持买方退货，5管理员支持卖方驳回申诉，6申诉已撤销
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

const BoughtAll = () => {
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
  const [isModalOpen2, setIsModalOpen2] = useState(allClosedStatus);
  const [myBalance, setMyBalance] = useState();
  const [myKuaidi, setMyKuaidi] = useState();
  const [commentForm] = Form.useForm();
  const [argueForm] = Form.useForm();
  const [myArgue, setMyArgue] = useState();

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/?buyerId=${myContent}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    const tradesData = res.data
    // setTradesData(res.data)
    // const res2 = await axios.get(`http://localhost:5000/goods/?buyerId=${params.id}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    // setTradeData(res2.data)
    // console.log("0",res.data)
    const requests = tradesData && tradesData.map(item => {
      // console.log("item", item)
      return axios.get(`http://localhost:5000/goods/${item.goodId}`)
    });
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
    const res2 = await axios.get(`http://localhost:5000/users/${myContent}`)
    setMyBalance(res2.data.balance)
  }, []);
  const handleTrade = (itemId, itemState) => { // itemState: 0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
    commentForm.resetFields() // 每次打开后重新初始化form内容
        setHandlingId(itemId)
    setDisplayPrice(mergedData.find(obj => obj.id === itemId).price)
    setMyArgue(mergedData.find(obj => obj.id === itemId).argue)
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
  const handleTrade2 = (itemId, itemState) => {
    argueForm.resetFields() // 每次打开后重新初始化form内容
    setHandlingId(itemId)
    setIsModalOpen2(prevState => {
      // 使用map方法创建一个新的数组，并在对应id的位置将值设置为true
      return prevState.map((isOpen, index) => {
        if (index === itemState) {
          return true; // 如果当前索引等于id，返回true
        }
        return isOpen; // 否则返回原值
      })
    })
  };
  const handleOk01 = async () => {
    if (myBalance < displayPrice) {
      message.info('账户余额不足！')
      return
    } else {
      await axios.patch(`http://localhost:5000/users/${myContent}`, {
        balance: myBalance - displayPrice
      })
      const tradeInfo = mergedData.find(obj => obj.id === handlingId)
      // console.log(mergedData.find(obj => obj.id === handlingId))
      const res = await axios.get(`http://localhost:5000/users/${tradeInfo.sellerId}`)
      const earnMoney = displayPrice - Number(tradeInfo.youfei) // 邮费不算赚到的
      await axios.patch(`http://localhost:5000/users/${tradeInfo.sellerId}`, {
        balance: res.data.balance + earnMoney,
        earn: res.data.earn + earnMoney
      })
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 1
      })
      setMyBalance(myBalance - displayPrice)
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, state: 1 };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `请到【待发货】查看已支付商品`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen1(allClosedStatus);
    }
  };
  const handleOk02 = async () => {
    const tradeInfo = mergedData.find(obj => obj.id === handlingId)
    const res = await axios.get(`http://localhost:5000/goods/${tradeInfo.goodId}`)
    await axios.patch(`http://localhost:5000/goods/${tradeInfo.goodId}`, {
      num: res.data.num + tradeInfo.num // 库存归还
    })
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      state: 5
    })
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: 5 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【已取消】查看已撤销订单`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen2(allClosedStatus);
  };
  const handleOk11 = async () => {
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      dot: true
    })
    message.info('已催卖家发货')
    setIsModalOpen1(allClosedStatus);
  };
  const handleOk12 = async () => {
    // console.log("myBalance",myBalance,"displayPrice",displayPrice)
    await axios.patch(`http://localhost:5000/users/${myContent}`, {
      balance: myBalance + displayPrice
    })
    const tradeInfo = mergedData.find(obj => obj.id === handlingId)
    const res = await axios.get(`http://localhost:5000/users/${tradeInfo.sellerId}`)
    const earnMoney = displayPrice - Number(tradeInfo.youfei) // 邮费不算赚到的
    // console.log("res.data.balance",res.data.balance,"res.data.earn",res.data.earn,"displayPrice",displayPrice,"Number(tradeInfo.youfei)",Number(tradeInfo.youfei),"earnMoney",earnMoney)
    await axios.patch(`http://localhost:5000/users/${tradeInfo.sellerId}`, {
      balance: res.data.balance - earnMoney,
      earn: res.data.earn - earnMoney
    })
    await axios.patch(`http://localhost:5000/goods/${tradeInfo.goodId}`, {
      num: res.data.num + tradeInfo.num // 库存归还
    })
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      state: 6
    })
    setMyBalance(myBalance + displayPrice)
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: 6 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【退款中】查看退款进度`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen2(allClosedStatus);
  };
  const handleOk21 = async () => {
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      state: 3
    })
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: 3 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【待评价】查看已收货商品`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen1(allClosedStatus);
  };
  const handleOk31 = async () => {
    try {
      const values = await commentForm.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 7,
        commentByBuyer: values.comment
      })
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, state: 7, commentByBuyer: values.comment };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `请到【已完成】查看已完成订单`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen1(allClosedStatus);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleOk32 = async () => { // 申诉状态，0无申诉，1申诉中，2卖方同意退货，3卖方驳回后等待管理员仲裁，4管理员支持买方退货，5管理员支持卖方驳回申诉，6申诉已撤销
    try {
      const values = await argueForm.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 4,
        argue: 1
      })
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, state: 4, argue: 1 };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `请到【申诉中】查看订单退货申诉进度`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen2(allClosedStatus);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };
  const handleOk42 = async () => {
    await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
      state: 7,
      argue: 6
    })
    setMergedData(mergedData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: 7, argue: 6 };
      }
      return obj;
    }));
    notification.open({
      message: '通知',
      description:
        `请到【已完成】查看已完成订单`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen2(allClosedStatus);
  };
  const handleCancel = () => {
    setIsModalOpen1(allClosedStatus);
    setIsModalOpen2(allClosedStatus);
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
              item.state !== 5 && item.state !== 6 && item.state !== 7 ?
                <a className="fixed-width-action" onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a>
                :
                <span className="fixed-width-action">-</span>,
              item.state === 2 ?
                <a className="fixed-width-action" onClick={() => {
                  setMyKuaidi(mergedData.find(obj => obj.id === item.id).kuaidi)
                  handleTrade2(item.id, item.state)
                }}>{cancelList[item.state]}</a>
                :
                item.state !== 5 && item.state !== 6 ?
                  <a className="fixed-width-action" style={{ color: "red" }} onClick={() => { handleTrade2(item.id, item.state) }}>{cancelList[item.state]}</a>
                  :
                  <span className="fixed-width-action">-</span>
            ]}
          >
            <Modal // 01 付款
              title="订单支付"
              open={isModalOpen1[0]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='ok' type="primary" onClick={handleOk01}>现在支付</Button>,
              ]}
            >
              <p>待支付金额：{displayPrice} (当前账户余额：{myBalance})</p>
            </Modal>
            <Modal // 02 取消订单
              title="取消订单"
              open={isModalOpen2[0]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk02}>撤销订单</Button>,
              ]}
            >
              <p>是否确认取消订单</p>
            </Modal>
            <Modal // 11 催发货
              title="催发货"
              open={isModalOpen1[1]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk11}>我是急急国王，速速发货</Button>,
              ]}
            >
              <p>是否催促卖家尽快发货</p>
            </Modal>
            <Modal // 12 退款
              title="申请退款"
              open={isModalOpen2[1]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk12}>继续退款</Button>,
              ]}
            >
              <p>是否确认退款</p>
            </Modal>
            <Modal // 21 确认收货
              title="确认收货"
              open={isModalOpen1[2]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk21}>确认收货</Button>,
              ]}
            >
              <p>确认收货前请仔细检查商品状态</p>
            </Modal>
            <Modal // 22 查询物流
              title="查询物流"
              open={isModalOpen2[2]}
              closeIcon={false}
              footer={[ // footer
                // <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleCancel}>确认</Button>,
              ]}
            >
              <p>物流单号：{myKuaidi}</p>
            </Modal>
            <Modal // 31 评价
              title="发表评价"
              open={isModalOpen1[3]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='submit' type="primary" onClick={handleOk31}>发布评价</Button>,
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
            <Modal // 32 申诉
              title="订单申诉"
              open={isModalOpen2[3]||isModalOpen2[7]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='submit' type="primary" onClick={handleOk32}>确认申诉</Button>,
              ]}
            >
              <p>请填写申诉理由：</p>
              <Form
                form={argueForm}
              >
                <Form.Item
                name="argue"
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
            <Modal // 41 申诉进度
              title="查看申诉进度"
              open={isModalOpen1[4]}
              closeIcon={false}
              footer={[ // footer
                // <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleCancel}>确认</Button>,
              ]}
            >
              <p>当前申诉状态：<Tag color={argueColorList[myArgue]}>{argueList[myArgue]}</Tag></p>
            </Modal>
            <Modal // 42 撤销申诉
              title="撤销申诉"
              open={isModalOpen2[4]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>返回</Button>,
                <Button key='ok' type="primary" onClick={handleOk42}>确认撤销</Button>,
              ]}
            >
              <p>是否确认撤销申诉</p>
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
export default BoughtAll;