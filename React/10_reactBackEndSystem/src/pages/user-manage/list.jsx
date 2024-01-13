import { Table, Button, Modal, Switch, Form, Input, Select } from 'antd'; // Switch, Form, Input, Select
import { useState, useEffect, useRef } from 'react'; // forwardRef => useRef
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import MyForm from '../../components/myForm'; // MyForm

const { confirm } = Modal;

const list = () => {
  const [table, setTable] = useState([]);
  const [open, setOpen] = useState(false); // visible => open
  const [region, setRegion] = useState([]); // MyForm
  const [role, setRole] = useState([]); // MyForm
  const ref = useRef(); // forwardRef => useRef
  const ref2 = useRef(); // forwardRef => useRef
  useEffect(
    () => {
      axios.get('http://localhost:5000/users?_expand=role').then(
        response => {
          setTable(response.data)
        }
      )
    }, []
  )
  useEffect( // setRegion
    () => {
      axios.get('http://localhost:5000/regions').then(
        response => {
          setRegion(response.data)
        }
      )
    }, []
  )
  useEffect( // setRole
    () => {
      axios.get('http://localhost:5000/roles').then(
        response => {
          setRole(response.data)
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
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)} />
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
    setTable(table.filter(data => data.id !== item.id))
    // axios.delete(`http://localhost:5000/users/${item.id}`) // users
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
  const handleChange = (item) => {
    item.roleState = !item.roleState
    setTable([...table])
    axios.patch(`http://localhost:5000/users/${item.id}`, { roleState: item.roleState })
  };

  return (
    <>
      <Button type='primary' onClick={() => { setOpen(true) }} style={{ float: 'right' }}>添加用户</Button>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
      <Modal
        open={open}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        // onCancel={setOpen(false)} // Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
        onCancel={() => { setOpen(false) }} // () => {}
        onOk={() => {
          // form.validateFields().then((values) => { form.resetFields(); onCreate(values); }).catch((info) => { console.log('Validate Failed:', info); });
          console.log('ok')
          console.log(ref)
        }}
      >
        <MyForm region={region} role={role} ref={ref} /> {/* forwardRef => ref */}
      </Modal>
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