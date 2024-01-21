import React, { useEffect, useState } from 'react'
import { Table, Tag, Switch } from 'antd';
import axios from 'axios';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export default function RightPage() {
  const [data, setData] = useState([])
  const [userinfo, setUserinfo] = useState([])
  const { rightsId, id } = JSON.parse(localStorage.getItem('token')) // token获取当前登录中的用户信息
  useEffect(() => {
    axios.get(`http://localhost:7890/rights/${rightsId}`).then(res => { // 模拟本地拿到用户id和rghtsId 
      // console.log(res.data);
      let arr = []
      arr = res.data.children.filter(child => { // 筛除根路径无权限的项,然后加载到表格中
        child.children = child.children.filter(item => {
          return item.right === 1
        })
        return child.right === 1
      })
      setData(arr)
    })
    axios.get(`http://localhost:7890/staff/${id}`).then(res => { // 获取用户信息：隐藏、显示哪些页面
      // console.log(res.data);
      setUserinfo(res.data)
    })
  }, [id, rightsId])
  const handlechange = (checked, record) => {
    // console.log("1", checked, "2", record)
    let obj = userinfo;
    if (checked) { // 选中时在showed数组中添加该行的key
      obj.showed.push(record.key) // 把后端传来的数据重新推出来显示
    } else { // 未选中时在showed数组中剔除该行的key
      obj.showed = obj.showed.filter(item => { // 并未在后端进行删除
        return item !== record.key
      }
      )
    }
    //更新userinfo
    setUserinfo(obj)
    //将更新后的数据发送至json
    axios.patch(`http://localhost:7890/staff/${id}`, {
      showed: obj.showed
    })
    // console.log(obj.showed);
  }
  const columns = [
    {
      title: '页面',
      dataIndex: 'title',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      render: (rank) => {
        return (
          <Tag color={rank === 1 ? 'gold' : 'blue'}>{rank === 1 ? 'Rank-1' : 'Rank-2'}</Tag>
        )
      }
    },
    {
      title: 'Router',
      dataIndex: 'key',
      render: (key, record) => {
        return (
          <Tag color={record.rank === 1 ? 'gold' : 'blue'}>{key}</Tag>
        )
      }
    },
    {
      title: '显示状态',
      // dataIndex: 'showed',
      render: (_, record) => {
        return (
          userinfo !== undefined ? <Switch
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={userinfo.showed.includes(record.key)}
            onChange={(checked) => handlechange(checked, record)}
          /> : <></>)
      }
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
