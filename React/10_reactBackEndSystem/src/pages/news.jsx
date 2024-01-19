import { PageHeader } from '@ant-design/pro-layout'; // npm i @ant-design/pro-layout@7.17.16
import { Card, Col, Row, List } from 'antd';
import {useState,useEffect} from 'react';
import axios from 'axios';
import _ from 'lodash'

const news = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/news?publishState=2&_expand=category').then( // &_
      res => {
        // setList(res.data)
        setList(Object.entries(_.groupBy(res.data, item => item.category.title))) // lodash
      }
    )
  })
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <PageHeader
        title="新闻编写"
        subTitle="查看"
      />
      <div style={{ narginTop: '30px' }}>
        <Row gutter={[16, 16]}> {/* {16} */}
          {
            list.map(item => {
              return <Col span={8} key={item[0]}>
                <Card title={item[0]} bordered={true} hoverable={true}> {/* hoverable: 焦点阴影效果 */}
                  <List
                    size="small"
                    dataSource={item[1]}
                    pagination={{ pageSize: 2 }}
                    renderItem={(data) => <List.Item><a href={`/detail/${data.id}`}>{data.title}</a></List.Item>}
                  />
                </Card>
              </Col>
            })
          }
        </Row>
      </div>
    </div>
  )
}
export default news