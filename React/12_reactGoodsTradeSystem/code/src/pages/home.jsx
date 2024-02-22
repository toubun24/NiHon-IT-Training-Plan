import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Tabs } from 'antd';
import axios from 'axios';
import { BarsOutlined, HeartFilled, FireFilled, HourglassFilled } from '@ant-design/icons';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const labelList = [
  "猜你喜欢",
  "热门商品",
  "最新发布"
]

const Home = () => (
  <div>
    <Search style={{ width: "88%" }} placeholder="input search text" onSearch={onSearch} enterButton />
    <Button style={{ float: "right", width: "10%" }}><BarsOutlined /> 分类</Button>
    <Tabs
      style={{ display: "flex" }}
      defaultActiveKey="1"
      centered
      items={[HeartFilled, FireFilled, HourglassFilled].map((Icon, i) => {
        const id = String(i + 1);
        return {
          label: labelList[id - 1],
          key: id,
          children: `Content of Tab Pane ${id}`,
          icon: <Icon />
        };
      })}
    />
  </div>


);
export default Home;