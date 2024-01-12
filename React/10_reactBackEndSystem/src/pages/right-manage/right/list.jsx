import { Table, Tag, Button } from 'antd';
import { useState, useEffect } from 'react' // useEffect
import axios from 'axios'
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => { // render: 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
      return <b>{id}</b> // 加粗
    }
  },
  {
    title: '权限名称',
    dataIndex: 'label',
  },
  {
    title: '权限路径',
    dataIndex: 'key',
    render: (key) => {
      return <Tag color="magenta">{key}</Tag>
    }
  },
  {
    title: '开关',
    // dataIndex: '',
    render: () => {
      return <div>
        <Button type="primary" icon={<EditOutlined />}>修改</Button>
        <Button danger icon={<DeleteOutlined />}>删除</Button>
      </div>
    }
  },
];

const list = () => {
  const [table, setTable] = useState([])
  useEffect(
    () => {
      axios.get('http://localhost:5000/rights?_embed=children').then(
        response => {
          setTable(response.data)
        }
      )
    }, []
  )
  return (
    <>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} /> {/* pagination: 分页器 */}
    </>
  )
}

export default list