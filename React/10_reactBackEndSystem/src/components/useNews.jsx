import { useState, useEffect } from 'react'
import axios from 'axios';
import { notification } from 'antd'

const useNews = (publishState) => { // 取出数据存到table数组传给发布管理
  const [table, setTable] = useState([])
  const tokenContent = localStorage.getItem('token');
  const { username } = tokenContent == '' ? { username: '' } : JSON.parse(tokenContent) // JSON.parse
  const [api] = notification.useNotification()
  useEffect(() => {
    axios.get(`http://localhost:5000/news?author=${username}&publishState=${publishState}&_expand=category`).then(
      res => {
        setTable(res.data)
      })
  }, [publishState, username])
  const handleDelete = (id) => {
    setTable(table.filter(data => data.id !== id))
    axios.delete(`http://localhost:5000/news/${id}`).then(
      res => {
        api.info({ // antd notification
          message: '通知',
          description:
            '此新闻已删除',
          placement: 'buttomRight',
        });
      }
    )
  }
  const handleSunset = (id) => {
    setTable(table.filter(data => data.id !== id))
    axios.patch(`http://localhost:5000/news/${id}`, {
      "publishState": 3
    }).then(
      res => {
        api.info({ // antd notification
          message: '通知',
          description:
            '请到【发布管理/已下线】查看',
          placement: 'buttomRight',
        });
      }
    )
  }
  const handlePublish = (id) => {
    setTable(table.filter(data => data.id !== id))
    axios.patch(`http://localhost:5000/news/${id}`, {
      "publishState": 2,
      "publishTime": Date.now()
    }).then(
      res => {
        api.info({ // antd notification
          message: '通知',
          description:
            '请到【发布管理/已发布】查看',
          placement: 'buttomRight',
        });
      }
    )
  }
  return {
    table,
    handleDelete,
    handleSunset,
    handlePublish
  }
}
export default useNews