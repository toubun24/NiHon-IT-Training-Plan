import { Table, Tag, Button, Modal } from 'antd'; // Modal: 对话框
import { useState, useEffect } from 'react'; // useEffect
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

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
  const columns = [ // 涉及修改所以放到函数组件中
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
      render: (item) => { // item
        return <div>
          <Button type="primary" icon={<EditOutlined />}>修改</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }}>删除</Button>
        </div>
      }
    },
  ];
  // const destroyAll = () => { Modal.destroyAll(); };
  const comfirmedDelete = (item) => { // const
    if (item.grade === 1) {
      setTable(table.filter(data => data.id !== item.id)) // 过滤删除 // setTable: 放在组件函数体内 // state.filter
      // axios.delete('http://localhost:5000/rights/${item.id}') // 删数据库
    } else {
  
    }
  };
  const deleteItem = (item) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      // content: <Button onClick={destroyAll}>Click to destroy all</Button>,
      content: '确认删除？',
      onOk() {
        // console.log('OK');
        comfirmedDelete(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  return (
    <>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} /> {/* pagination: 分页器 */}
    </>
  )
}

export default list