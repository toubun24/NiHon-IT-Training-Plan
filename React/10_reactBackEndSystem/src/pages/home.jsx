import { useState, useEffect } from 'react';
import { Card, Col, Row, Avatar, Divider, List, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Meta } = Card;

const Home = () => {
  const [viewList, SetViewList] = useState([])
  const [starList, SetStarList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(
      res => (
        SetViewList(res.data)
      )
    )
  }, [])
  useEffect(() => { // 各写一个useEffect
    axios.get('http://localhost:5000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(
      res => (
        SetStarList(res.data)
      )
    )
  }, [])
  const tokenContent = localStorage.getItem('token');
  const { username, region, role: { roleName } } = tokenContent == '' ? { username: '', region: '', role: { roleName: '' } } : JSON.parse(tokenContent) // JSON.parse
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="最常浏览" bordered={false}>
            <List
              size="small"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              // bordered
              dataSource={viewList}
              renderItem={(item) => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="点赞最多" bordered={false}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            // style={{ width: 300, }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} // 随机获取一个头像
              title={username} // {}
              description={
              <div>
                <span>{region?region:'全球'}</span>
                <span style={{paddingLeft:'2vh'}}>{roleName}</span>
              </div>
            }
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
Home.wrappers = ['@/wrappers/Auth'] // 如果不是通过localhost8000而是直接通过后缀名访问的话可能也会涉及权限判断 // home.
export default Home;