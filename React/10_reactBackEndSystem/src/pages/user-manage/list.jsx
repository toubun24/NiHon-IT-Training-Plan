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
  const [open2, setOpen2] = useState(false); // Update
  const ref = useRef(); // forwardRef => useRef
  const ref2 = useRef(); // forwardRef => useRef // Update
  const [current, setCurrent] = useState(); // 点击所在item的id
  const [isActive2, setIsActive2] = useState(); // 是否是超级管理员类别下的区域设置
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
      filters: [
        ...region.map(item=>({
          text: item.title,
          value: item.value,
        })),
        {
          text: '全球',
          value: '',
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.region === value,
      render: (region) => { // region为空 => 全球
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        // return <b>{role.roleName}</b> // ?.可选链操作符 // 及时拿到"角色名称"信息，而无需刷新
        return <b>{role?.roleName}</b>
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
          <Button type="primary" icon={<EditOutlined />} disabled={item.default} onClick={() => { handleUpdate(item) }}>修改</Button> {/* onClick={()=>{}} */}
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }} disabled={item.default}>删除</Button>
        </div>
      }
    },
  ];
  const comfirmedDelete = (item) => {
    setTable(table.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`) // delete user
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
  const handleUpdate = (item) => {
    setTimeout(() => {
      setOpen2(true) // Update
      if (item.roleId === 1) { // 超级管理员
        setIsActive2(true) // 处于超级管理员类别下的区域设置（禁用）
      } else { // 其他管理员
        setIsActive2(false) // 不处于超级管理员类别下的区域设置（不禁用）
      }
      // console.log(ref2)
      ref2.current.setFieldsValue(item)
    }, 1) // 即使设置为0，只要使用了setTimeout()就会形成异步
    setCurrent(item)
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
          // console.log('ok')
          // console.log(ref)
          ref.current.validateFields().then(response => {
            // console.log(response)
            setOpen(false) // 确认后关闭弹窗
            ref.current.resetFields() // 重置一组字段到initialValues
            axios.post('http://localhost:5000/users', { // 添加数据
              ...response,
              "roleState": true,
              "default": false,
            }).then(response2 => {
              // console.log(response2)
              setTable([...table, {
                ...response2.data,
                role: role.filter(item => item.id === response.roleId)[0] // 及时拿到"角色名称"信息，而无需刷新 // 注释掉这行则需要等待刷新
              }])
            })
          }).catch(
            err => console.log(err)
          )
        }}
      >
        <MyForm region={region} role={role} ref={ref} /> {/* forwardRef => ref */}
      </Modal>
      <Modal
        open={open2}
        title="修改用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setOpen2(false)
          setIsActive2(!isActive2) // 只是为了使值发生变化以触发MyForm中Effect更新，反正窗口此时已经关闭，数值如何已经不重要了
        }}
        onOk={() => {
          ref2.current.validateFields().then(response => { // ref2 for update
            setOpen2(false)
            setTable(table.map(item => {
              if (item.id === current.id) { // 匹配id
                return {
                  ...item,
                  ...response,
                  role: role.filter(item2 => item2.id === response.roleId)[0]
                }
              } else {
                return item
              }
            }))
            setIsActive2(!isActive2) // 只是为了使值发生变化以触发MyForm中Effect更新，反正窗口此时已经关闭，数值如何已经不重要了
            axios.patch(`http://localhost:5000/users/${current.id}`, response)
          })
        }}
      >
        <MyForm region={region} role={role} ref={ref2} isActive2={isActive2} /> {/* ref2 for update */}
      </Modal >
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