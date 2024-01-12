import { Table } from 'antd';
import { useState, useEffect } from 'react' // useEffect
import axios from 'axios'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '权限名称',
    dataIndex: 'label',
  },
  {
    title: '权限路径',
    dataIndex: 'key',
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
      <Table dataSource={table} columns={columns} />
    </>
  )
}

export default list