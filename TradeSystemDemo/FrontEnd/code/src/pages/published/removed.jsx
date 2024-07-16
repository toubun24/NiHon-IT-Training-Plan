import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'; // 时间戳格式化
import { useHistory } from 'umi';

const Removed = () => {
  const [listData, setListData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent).id // JSON.parse
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory()
  const [clickId, setClickId] = useState();
  // const [dayData, setDayData] = useState() // 删除天数

  useEffect(() => {
    axios.get(`http://localhost:5000/goods?userId=${myContent}&_sort=editTime&_order=desc&state_gte=4&state_lte=6&state_ne=5`).then( // 按发布时间降序 // desc // state_ne // _gte _lte
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
    // 找listData中id为itemId的，确认删除时间
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setListData(listData.filter(data => data.id !== clickId)) // 页面不再显示
    axios.delete(`http://localhost:5000/goods/${clickId}`).then(res => {
      notification.open({
        message: '通知',
        description:
          `已彻底删除商品`,
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
  const goodsBack = (itemId) => {
    setListData(listData.filter(data => data.id !== itemId)) // 页面不再显示
    axios.patch(`http://localhost:5000/goods/${itemId}`, {
      state: 0, // 恢复至草稿箱
      editTime: Date.now()
    }).then(res => {
      notification.open({
        message: '通知',
        description:
          `请到【草稿箱】查看恢复商品`,
        // onClick: () => { console.log('Notification Clicked!'); },
        duration: 2,
        placement: "bottomRight"
      });
    })
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
          actions={[
          item.state===6?
          <span style={{ textDecoration: 'line-through',color:'black' }}>恢复</span>
          :
          <a onClick={() => { goodsBack(item.id) }}>恢复</a>
          ,
          <a style={{ color: "red" }} onClick={() => { showModal(item.id) }}>彻底除外</a>
        ]}
        >
          <Modal title="是否彻底删除商品？" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      最近修改:{item.editTime ? moment(item.editTime).format('YY/MM/DD HH:mm:ss') : "-"}
                    </div>
                  </Space>
                </>
              }
            />
                      </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default Removed;