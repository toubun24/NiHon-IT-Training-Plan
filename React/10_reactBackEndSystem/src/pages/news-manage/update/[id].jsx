// npm i @ant-design/pro-layout@7.17.16
// npm install -S react-draft-wysiwyg

import { PageHeader } from '@ant-design/pro-layout'; // npm i @ant-design/pro-layout@7.17.16
///import { PageContainer } from '@ant-design/pro-components';
import { Steps, Button, Form, Input, Select, message, notification } from 'antd'; // PageHeader
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MyEdit from '../../../components/myEdit';
import { useHistory, useParams } from 'umi'; // useParams

const Update = () => {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const formRef = useRef() // useRef // 不同渲染之间无法共享state状态值；采用useRef，作为组件实例的变量，保证获取到的数据肯定是最新的，且ref更改不会re-render
  const [step2Content, setStep2Content] = useState('') // 富文本内容
  const [step1Content, setStep1Content] = useState({}) // ({}): 对象
  const history = useHistory()
  const [api] = notification.useNotification() //  // antd notification
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值 // 同preview // 用于axios
  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(res => {
      setCategoryList(res.data)
    })
  })
  const handleNews = (auditNum) => { // 0 for 保存草稿, 1 for 提交审核
    axios.patch(`http://localhost:5000/news/${params.id}`, { // post => patch 仅更新 // /${params.id}
      ...step1Content,
      "content": step2Content, // 富文本内容
      "auditState": auditNum,  // 0 for 保存草稿, 1 for 提交审核, 2 for 审核通过
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
  useEffect(() => { // 同preview
    axios.get(`http://localhost:5000/news/${params.id}?_expand=category&_expand=role`).then(
      res => {
        let { title, categoryId, content } = res.data // 解构出所需的三项数据
        formRef.current.setFieldsValue({
          title,
          categoryId
        })
        setStep2Content(content)
      }
    )
  }, [params.id]) // [params.id]

  return (
    <div>
      <PageHeader
        title="新闻修改"
        onBack={() => window.history.back()} // onBack
      />
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
          <MyEdit getContent={(values) => {
            // console.log(values)
            setStep2Content(values) // 富文本内容
          }} content={step2Content} /> {/* 把填写好的step2Content传给MyEdit */}
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

export default Update;