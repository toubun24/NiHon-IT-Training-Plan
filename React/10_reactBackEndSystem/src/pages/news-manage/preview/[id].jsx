// 根据发送来的[id]动态生成该预览页面
// yarn add moment // 结果把一堆别的依赖搞乱了，试试都保持npm

import { Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { useParams } from 'umi'; // useParams
import axios from 'axios';
import moment from 'moment'; // 时间戳格式化

const preview = () => {
  const [newsInfo, setNewsInfo] = useState() // []
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const auditList = ['未审核', '审核中', '已通过', '未通过'] // auditState 0-3
  const publishList = ['未发布', '待发布', '已发布', '已撤回'] // publishState 0-3
  useEffect(() => {
    axios.get(`http://localhost:5000/news/${params.id}?_expand=category&_expand=role`).then(
      res => {
        setNewsInfo(res.data)
      }
    )
  }, [params.id]) // [params.id]
  return (
    <div>
      {
        newsInfo && <div>
          <PageHeader // 先判断newsInfo取到数据后再展示PageHeader，否则会在还没有取到数据的情况下渲染并由于数据undefined报错
            // ghost={false}
            onBack={() => window.history.back()}
            title={newsInfo.title}
            subTitle={newsInfo.category.title}
          // extra={[<Button key="3">Operation</Button>, <Button key="2">Operation</Button>, <Button key="1" type="primary">Primary</Button>,]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY/MM/DD HH:mm:ss') : "-"}</Descriptions.Item>
              <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
              <Descriptions.Item label="审核状态"><span style={{ color: 'red' }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
              <Descriptions.Item label="发布状态"><span style={{ color: 'red' }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
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
export default preview