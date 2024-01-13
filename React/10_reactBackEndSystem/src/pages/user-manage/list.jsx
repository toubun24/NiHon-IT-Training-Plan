import { Table, Button, Modal, Switch } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const list = () => {
  const [table, setTable] = useState([]);
  useEffect(
    () => {
      axios.get('http://localhost:5000/users?_expand=role').then(
        response => {
          setTable(response.data)
        }
      )
    }, []
  )
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => { // region为空 => 全球
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return <b>{role.roleName}</b>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState', // roleState: true/false, 无render时则无渲染显示
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} />
      }
    },
    {
      title: '开关',
      render: (item) => {
        return <div>
          <Button type="primary" icon={<EditOutlined />} disabled={item.default}>修改</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }} disabled={item.default}>删除</Button>
        </div>
      }
    },
  ];
  const comfirmedDelete = (item) => {

  };
  const deleteItem = (item) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      onOk() {
        comfirmedDelete(item)
      },
      onCancel() {
      },
    });
  };

  return (
    <>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
    </>
  )
}

export default list;

/*
const list = () => {
    return (
        <>
            right-manage-role-list
        </>
    )
}

export default list;
*/

/*
const list = () => {
    return (
        <>
            user-manage-list
        </>
    )
}

export default list
*/