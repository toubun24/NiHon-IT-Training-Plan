// auditState === 1 && publishState <= 1

import { Table, Tag, Button, Modal, notification } from 'antd'; // Modal: 对话框
import { useState, useEffect } from 'react'; // useEffect
import axios from 'axios';
import { useHistory } from 'umi';

const list = () => {
  const [table, setTable] = useState([])
  const tokenContent = localStorage.getItem('token');
  const { username } = tokenContent == '' ? { username: '' } : JSON.parse(tokenContent) // JSON.parse
  const auditList = ['草稿箱', '审核中', '已通过', '未通过'] // auditState = 0 ~ 3
  const colorList = ['', 'orange', 'green', 'red']
  const [api] = notification.useNotification() // Warning: [antd: Notification] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.
  const history = useHistory()
  useEffect(
    () => {
      axios.get(`http://localhost:5000/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(
        response => {
          setTable(response.data)
        }
      )
    }, []
  )
  const columns = [ // 涉及修改所以放到函数组件中
    {
      title: '新闻标题',
      dataIndex: 'title', // label => title
      render: (title, item) => { // 预览页面 // item
        return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return category.title
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: '开关',
      // dataIndex: '',
      render: (item) => { // item
        return <div>
          {
            item.auditState === 1 && <Button onClick={() => {
              setTable(table.filter(data => data.id !== item.id))
              axios.patch(`http://localhost:5000/news/${item.id}`, {
                "auditState": 0 // 草稿箱
              }).then(res => {
                console.log(res.data)
                api.info({ // antd notification
                  message: `通知`,
                  description:
                    '请到草稿箱查看',
                  placement: 'buttomRight',
                });
              })
            }}>撤销</Button>
          }
          {
            item.auditState === 2 && <Button danger onClick={() => {
              axios.patch(`http://localhost:5000/news/${item.id}`, {
                "publishState": 2 // 已发布
              }).then(res => {
                console.log(res.data)
                history.push('/publish-manage/published') // 页面跳转
                api.info({ // antd notification
                  message: `通知`,
                  description:
                    '请到【发布管理/已发布】查看',
                  placement: 'buttomRight',
                });
              })
            }}>发布</Button>
          }
          {
            item.auditState === 3 && <Button type='primary' onClick={() => {
              history.push(`/news-manage/update/${item.id}`) // 页面跳转
            }}>更新</Button>
          }

        </div>
      }
    },
  ];

  return (
    <>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} /> {/* pagination: 分页器 */} {/* rowKey */}
    </>
  )
}

export default list