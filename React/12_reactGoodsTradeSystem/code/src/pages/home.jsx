import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Tabs } from 'antd';
import axios from 'axios';
import { BarsOutlined, HeartFilled, FireFilled, HourglassFilled } from '@ant-design/icons';
import MyList from '../components/myList';

const { Search } = Input;
const labelList = [
  "商品收藏",
  "热门商品",
  "最新发布"
]

const Home = () => {
  const [goodsData, setGoodsData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContentId = tokenContent == '' ? { myContentId: '' } : JSON.parse(tokenContent).id // JSON.parse
  const [searchData, setSearchData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchState, setSearchState] = useState(false);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/goods?_expand=user&state=2`)
    const tmpData = res.data
    setAllData(tmpData)
    const sortedData = tmpData.filter(item => item.starList.includes(myContentId)).sort((a, b) => {
      const lastA = a.starList[a.starList.length - 1];
      const lastB = b.starList[b.starList.length - 1];
      return lastB - lastA; // 倒序排序
    })
    setGoodsData([sortedData, [...tmpData].sort((a, b) => b.view - a.view), [...tmpData].sort((a, b) => b.publishTime - a.publishTime)]) // 对应后面的<MyList data={goodsData[i]}/>
  }, []);
  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onSearch = (value, _e, info) => {
    // const { value } = e.target;
    // console.log(value)
    if (value !== '') {
      setSearchState(true)
    } else {
      setSearchState(false)
      return
    }
    const newlist = allData.filter((item) => { // filter查询
      // console.log(item.introduction.toUpperCase(), "---", value.toUpperCase())
      return item.introduction.toUpperCase().includes(value.toUpperCase()) // includes
      // || item.toUpperCase().includes(e.target.value.toUpperCase())
    })
    // console.log(newlist)
    setSearchData(newlist)
  }
  //console.log(goodsData)
  const displaySwitch = () => {
    setSearchState(false)
  }
  // <Search style={{ width: "88%" }} placeholder="input search text" onSearch={onSearch} enterButton onChange={() => handlerInput()} />

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <Search
          placeholder="输入用户名进行搜索"
          style={{ width: "85%" }}
          enterButton // ={false}
          onSearch={onSearch}
        />
        <Button style={{ float: "right", width: "14%" }} onClick={() => displaySwitch()}><BarsOutlined /> 返回分类</Button>
      </div>
      {
        searchState ? <MyList data={searchData} /> : <></>
      }
      {
        !searchState ? <Tabs
          style={{ display: "flex" }}
          defaultActiveKey="2" // 热门商品
          centered
          items={[HeartFilled, FireFilled, HourglassFilled].map((Icon, i) => {
            const id = String(i + 1);
            return {
              label: labelList[id - 1],
              key: id,
              children: <div><MyList data={goodsData[i]} /></div>,
              icon: <Icon />
            };
          })}
        /> : <></>
      }
    </div>
  )
}
export default Home;