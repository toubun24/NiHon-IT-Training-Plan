// npm i @ant-design/pro-layout@7.17.16
// npm install -S react-draft-wysiwyg

import { PageHeader } from '@ant-design/pro-layout'; // npm i @ant-design/pro-layout@7.17.16
///import { PageContainer } from '@ant-design/pro-components';
import { Steps, Button, Form, Input, Select } from 'antd'; // PageHeader
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Edit from '../../components/myEdit';

const Add = () => {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const formRef = useRef() // ref
  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(res => {
      setCategoryList(res.data)
    })
  })
  return (
    <div>
      <PageHeader title="新闻编写" />
      <Steps
        current={current}
        items={[
          {
            title: '基本信息',
            description: '新闻标题，新闻分类',
          },
          {
            title: '新闻内容',
            description: '新闻主题内容',
            // subTitle: 'Left 00:00:08',
          },
          {
            title: '新闻提交',
            description: '保存草稿或提交审核',
          },
        ]}
      />
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: current === 0 ? '' : 'none' }}> {/* display: 控制标签显示与否 */}
          <Form
            name="basic"
            labelCol={{ span: 2, }} // 24栅格布局，此处左2右22
            wrapperCol={{ span: 22, }}
            ref={formRef} // ref
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: '请输入标题', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: '请输入分类', },]}
            >
              <Select>
                {
                  categoryList.map(item => {
                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div style={{display:current===1?'':'none'}}> {/* 第2页内容 */}
<Edit getContent={(values)=>{
  console.log(values)
}}/>
        </div>
        <div style={{display:current===2?'':'none'}}> {/* 第3页内容 */}
333
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        {
          current === 2 && <span>
            <Button type='primary'>保存草稿</Button>
            <Button danger>提交草稿</Button>
          </span>
        }
        {
          current < 2 && <Button type='primary' onClick={() => {
            if (current === 0) { // 验证第一步是否填完
              formRef.current.validateFields().then(
                res => {
                  setCurrent(current + 1)
                }
              )
            } else {
              setCurrent(current + 1)
            }
          }}>下一步</Button>
        }
        {
          current > 0 && <Button type='primary' onClick={() => {
            setCurrent(current - 1)
          }}>上一步</Button>
        }
      </div>
    </div>
  )
}

export default Add;