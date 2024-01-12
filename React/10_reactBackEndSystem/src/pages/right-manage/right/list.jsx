import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'; // Modal: 对话框
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
          const list = response.data
          list.forEach(item => {
            if (item.children.length === 0) {
              item.children = '' // ID栏拓展+号在没有子项时进行隐藏
            }
          })
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
          <Popover content={<div style={{ textAlign: 'center' }}>
            <Switch checked={item.pagepermission} onChange={() => { switchMethod(item) }} />
          </div>} title="页面配置项" trigger={item.pagepermission === undefined ? '' : "click"}>
            <Button type="primary" icon={<EditOutlined />} disabled={item.pagepermission === undefined}>修改</Button>
          </Popover>
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }}>删除</Button>
        </div>
      }
    },
  ];
  const switchMethod = (item) => { // 滑块滑动
    item.pagepermission = item.pagepermission === 1 ? 0 : 1
    setTable([...table])
    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, { // `` not '' // `http://localhost:5000/rights?id=${item.id}`返回的是数组[{}]而不是{}，会报错404
        pagepermission: item.pagepermission
      })
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, { // `` not '' // `http://localhost:5000/children?id=${item.id}`返回的是数组[{}]而不是{}，会报错404
        pagepermission: item.pagepermission
      })
    }
  };
  // const destroyAll = () => { Modal.destroyAll(); };
  const comfirmedDelete = (item) => { // const
    if (item.grade === 1) { // 删除大项
      setTable(table.filter(data => data.id !== item.id)) // 过滤删除 // setTable: 放在组件函数体内 // state.filter
      // axios.delete(`http://localhost:5000/rights/${item.id}`) // 删数据库
    } else { // 删除子项
      let list = table.filter(data => data.id === item.rightId) // let: 变量一旦初始化之后，还可以重新赋值；不存在变量提升
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setTable([...table]) // 不能直接给table，否则会不知道差别，需要展开再给回去
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