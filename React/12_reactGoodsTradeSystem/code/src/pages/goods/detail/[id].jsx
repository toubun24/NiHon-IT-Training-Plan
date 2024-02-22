import React, { useState, useEffect } from 'react';
import { Avatar, Flex, Image, Space } from 'antd';
import { useParams } from 'umi'; // useParams
import axios from 'axios';

const Goods = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [detailData, setDetailData] = useState([]); // 商品详情信息

  useEffect(() => {
    axios.get(`http://localhost:5000/goods/${params.id}?_expand=user`).then( // http://localhost:5000/goods/${params.id}?_expand=user
      res => {
        setDetailData(res.data) // goods/${params.id}不需要[0]，goods/id=${params.id}需要[0]
      }
    )
  }, [])
  console.log(`http://localhost:5000/goods/${params.id}?_expand=user`, detailData)
  return (
    <div>
      {
        detailData.user.username // TypeError: Cannot read properties of undefined (reading 'username')
      }
      {
        //detailData.user.id // TypeError: Cannot read properties of undefined (reading 'id')
      }
      <Image
        width={200}
        // src={require(`@/images/goods/${detailData.tupian}`)} // Error: Cannot find module './undefined'
      />
      <br />
      introduction{detailData.introduction}
      <br />
      shoujia{detailData.shoujia}
      <br />
      id{detailData.id}
    </div>
  )
}
export default Goods
