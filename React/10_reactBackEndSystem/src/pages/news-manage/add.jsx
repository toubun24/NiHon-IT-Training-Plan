// npm i @ant-design/pro-layout@7.17.16
// npm install -S react-draft-wysiwyg

import { PageHeader } from '@ant-design/pro-layout'; // npm i @ant-design/pro-layout@7.17.16
///import { PageContainer } from '@ant-design/pro-components';
import { Steps, Button, Form, Input, Select, message, notification } from 'antd'; // PageHeader
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Edit from '../../components/myEdit';
import { useHistory } from 'umi';

const Add = () => {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const formRef = useRef() // ref
  const [step2Content, setStep2Content] = useState('') // 富文本内容
  const [step1Content, setStep1Content] = useState({}) // ({}): 对象
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const history = useHistory()
  const [api] = notification.useNotification() // antd notification
  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(res => {
      setCategoryList(res.data)
    })
  })
  const handleNews = (auditNum) => { // 0 for 保存草稿, 1 for 提交审核
    axios.post('http://localhost:5000/news', {
      ...step1Content,
      "content": step2Content, // 富文本内容
      "region": myContent.region ? myContent.region : "全球", // JSON.parse(localStorage.getItem('token')), or undefined
      "author": myContent.username, // JSON.parse(localStorage.getItem('token')), or undefined
      "roleId": myContent.roleId, // JSON.parse(localStorage.getItem('token')), or undefined
      "auditState": auditNum,  // 0 for 保存草稿, 1 for 提交审核, 2 for 审核通过
      "publishState": 0,
      "createTime": Date.now(), // 时间戳
      "star": 0,
      "view": 0,
      // "id": 123,
      // "publishTime": 123456
    }).then(res => {
      history.push(auditNum === 0 ? '/news-manage/draft' : '/audit-manage/list') // /
      api.info({ // antd notification
        message: `通知`,
        description:
          `请到${auditNum === 0 ? '草稿箱' : '审核列表'}查看`,
        placement: 'buttomRight',
      });
    })
  }

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
            labelCol={{ span: 2, }} // 24栅格布局，此处左2右22 // 小窗时文字会被遮挡
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
                  categoryList.map(item => { // devScripts.js:6523 Warning: `children` should be `Select.Option` or `Select.OptGroup` instead of `Option`.
                    return <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div style={{ display: current === 1 ? '' : 'none' }}> {/* 第2页内容 */}
          <Edit getContent={(values) => {
            // console.log(values)
            setStep2Content(values) // 富文本内容
          }} />
        </div>
        <div style={{ display: current === 2 ? '' : 'none' }}> {/* 第3页内容 */}
          333
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        {
          current === 2 && <span>
            <Button type='primary' onClick={() => handleNews(0)}>保存草稿</Button>
            <Button danger onClick={() => handleNews(1)}>提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button type='primary' onClick={() => {
            if (current === 0) { // 验证第一步是否填完
              formRef.current.validateFields().then(
                res => {
                  // console.log(res) // title和categoryId
                  setStep1Content(res)
                  setCurrent(current + 1)
                }
              )
            } else { // current !== 0 => current === 1
              if (step2Content === '' || step2Content.trim() === '<p></p>') {
                message.error('请输入内容')
              } else {
                setCurrent(current + 1)
              }
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