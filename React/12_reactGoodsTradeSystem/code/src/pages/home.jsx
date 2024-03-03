import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Tabs } from 'antd';
import axios from 'axios';
import { BarsOutlined, HeartFilled, FireFilled, HourglassFilled } from '@ant-design/icons';
import MyList from '../components/myList';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const labelList = [
  "猜你喜欢",
  "热门商品",
  "最新发布"
]

const Home = () => {
  const [goodsData, setGoodsData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/goods?_expand=user`).then(
      res => {
        const tmpData=res.data
        setGoodsData([tmpData,[...tmpData].sort((a, b) => b.view - a.view),[...tmpData].sort((a, b) => b.publishTime - a.publishTime)]) // 对应后面的<MyList data={goodsData[i]}/>
      }
    )
  }, []);
  const handlerInput = (event) => {
    const newlist = goodsData.introduction.filter(item => { // filter查询
      return item.toUpperCase().includes(event.target.value.toUpperCase()) // includes
      // || item.toUpperCase().includes(event.target.value.toUpperCase())
    })
    setGoodsData(newlist)
  }
  //console.log(goodsData)

  return (
    <div>
      <Search style={{ width: "88%" }} placeholder="input search text" onSearch={onSearch} enterButton onInput={() => handlerInput()} />
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
            children: <div><MyList data={goodsData[i]}/></div>,
            icon: <Icon />
          };
        })}
      />
      </div>
  )
}
export default Home;