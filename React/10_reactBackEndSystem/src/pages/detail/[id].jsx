// 根据发送来的[id]动态生成该预览页面
// yarn add moment // 结果把一堆别的依赖搞乱了，试试都保持npm

import { Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { useParams } from 'umi'; // useParams
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化
import { HeartTwoTone } from '@ant-design/icons';

const Detail = () => {
  const [newsInfo, setNewsInfo] = useState() // [] // 修改浏览量和点赞量
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  useEffect(() => {
    axios.get(`http://localhost:5000/news/${params.id}?_expand=category&_expand=role`).then(
      res => {
        // setNewsInfo(res.data)
        setNewsInfo({
          ...res.data,
          view: res.data.view + 1 // 每次访问或刷新则浏览量+1
        })
        return res.data // 每次访问或刷新则浏览量+1
      }
    ).then(res => { // 第二个then
      axios.patch(`http://localhost:5000/news/${params.id}`, {
        view: res.view + 1 // 每次访问或刷新则浏览量+1
      })
    })
  }, [params.id]) // [params.id]
  return (
    <div>
      {
        newsInfo && <div>
          <PageHeader // 先判断newsInfo取到数据后再展示PageHeader，否则会在还没有取到数据的情况下渲染并由于数据undefined报错
            // ghost={false}
            onBack={() => window.history.back()}
            title={newsInfo.title}
            subTitle={<div>
              {newsInfo.category.title}
              <HeartTwoTone twoToneColor="#eb2f96" style={{ paddingLeft: "10px" }} onClick={() => {
                setNewsInfo({
                  ...newsInfo,
                  star: newsInfo.star + 1
                })
                axios.patch(`http://localhost:5000/news/${params.id}`, {
                  star: newsInfo.star + 1
                })
              }} />
            </div>}
          // extra={[<Button key="3">Operation</Button>, <Button key="2">Operation</Button>, <Button key="1" type="primary">Primary</Button>,]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY/MM/DD HH:mm:ss') : "-"}</Descriptions.Item>
              <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
              <Descriptions.Item label="访问数量"><span style={{ color: 'green' }}>{newsInfo.view}</span></Descriptions.Item>
              <Descriptions.Item label="点赞数量"><span style={{ color: 'green' }}>{newsInfo.star}</span></Descriptions.Item>
              <Descriptions.Item label="评论数量"><span style={{ color: 'green' }}>0</span></Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div dangerouslySetInnerHTML={{
            __html: newsInfo.content
          }} style={{ border: '0.5px solid green', margin: '0 24px' }}>

          </div>
        </div>
      }
    </div>
  )
}
export default Detail