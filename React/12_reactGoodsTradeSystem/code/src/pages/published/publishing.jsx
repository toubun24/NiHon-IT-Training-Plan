import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'; // 时间戳格式化
import { useHistory } from 'umi';

const colorList = [
  "-", // 0 for nothing
  "volcano", // 1 for 待审核
  "green", // 2 for 发布中
  "red", // 3 for 审核未通过
  "-", // 4 for 已下架
]
const stateList = [
  "-", // 0 for nothing
  "待审核", // 1 for 待审核
  "发布中", // 2 for 发布中
  "未通过", // 3 for 审核未通过
  "-", // 4 for 已下架
]

const Publishing = () => {
  const [listData, setListData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent).id // JSON.parse
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory()
  const [clickId, setClickId] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/goods?userId=${myContent}&_sort=publishTime&_order=desc&state_ne=0&state_ne=4`).then( // 按发布时间降序 // desc // state_ne
      res => {
        // const tmpData = res.data
        // const tmpData2 = [...tmpData].sort((a, b) => b.id - a.id); // 倒序
        // setListData(tmpData2)
        setListData(res.data)
      }
    )
  }, []);
  const showModal = (itemId) => {
    setClickId(itemId)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setListData(listData.filter(data => data.id !== clickId)) // 页面不再显示
    axios.patch(`http://localhost:5000/goods/${clickId}`, {
      "state": 4
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
  const goodsModify = (itemId) => {

    history.push(`/goods/modify/${itemId}`)
  }
  const goodsDetail = (itemId) => {

    history.push(`/goods/detail/${itemId}`)
  }

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={listData}
      pagination={{ // 分页
        // onChange: (page) => { console.log(page); },
        pageSize: 6,
      }}
      // loading
      renderItem={(item) => (
        <List.Item
          actions={[<a onClick={() => { goodsModify(item.id) }}>修改</a>, <a style={{ color: "red" }} onClick={() => { showModal(item.id) }}>删除</a>]}
        >
          <Modal title="是否删除商品？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>商品下架后，进行中和已完成的订单不受影响；下架的商品将在【已下架】中继续保留7天</p>
          </Modal>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={96} src={require(`@/images/goods/${item.tupian}`)} />} // src require @/
              title={<a onClick={() => goodsDetail(item.id)}>{item.introduction}</a>}
              description={
                <>
                  <div style={{ color: "red" }}>¥ {item.shoujia}</div>
                  <br />
                  <Space style={{ fontSize: 12 }}>
                    <div>
                      <EyeOutlined /> {item.view}
                    </div>
                    <div>
                      发布时间:{item.publishTime ? moment(item.publishTime).format('YY/MM/DD HH:mm:ss') : "-"}
                    </div>
                    <div>
                      最近修改:{item.editTime ? moment(item.editTime).format('YY/MM/DD HH:mm:ss') : "-"}
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
  );
};
export default Publishing;