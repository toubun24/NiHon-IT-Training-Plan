import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'; // Modal: 对话框
import { useState, useEffect } from 'react'; // useEffect
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const Draft = () => {
  const [table, setTable] = useState([])
  const tokenContent = localStorage.getItem('token');
  const { username } = tokenContent == '' ? { username: '' } : JSON.parse(tokenContent) // JSON.parse
  useEffect(
    () => {
      axios.get(`http://localhost:5000/news?author=${username}&auditState=0&_expand=category`).then(
        res => {
          setTable(res.data)
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
      title: '新闻标题',
      dataIndex: 'title', // label => title
      render:(title, item)=>{ // 预览页面 // item
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
      title: '开关',
      // dataIndex: '',
      render: (item) => { // item
        return <div>
          <Button icon={<EditOutlined />} >修改</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }}>删除</Button>
        </div>
      }
    },
  ];
  // const destroyAll = () => { Modal.destroyAll(); };
  const comfirmedDelete = (item) => { // const
    setTable(table.filter(data => data.id !== item.id)) // 过滤删除 // setTable: 放在组件函数体内 // state.filter
    axios.delete(`http://localhost:5000/news/${item.id}`) // 删数据库
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
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} /> {/* pagination: 分页器 */} {/* rowKey: item => */}
    </>
  )
}

export default Draft

/*
const Category = () => {
    return (
<div>
Draft
</div>
    )
}

export default Category;
*/