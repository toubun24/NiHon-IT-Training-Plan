import { Button, Space, Tag, Tooltip, Tree, Table, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RightRole() {
  const [data, setData] = useState([]) // roles?_expand=rights data
  const [idEdit, setIdEdit] = useState([]) // 储存当前正在处理的权限的id
  const [rightEdit, setRightEdit] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [allCheckedKeys, setAllCheckedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([]) // （受控）展开指定的树节点
  // const [checkedKeys, setCheckedKeys] = useState(['0-0-0'])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [halfCheckedKeys, setHalfCheckedKeys] = useState([])
  useEffect(() => {
    axios.get('http://localhost:7890/roles?_expand=rights').then(res => {
      // console.log(res.data)
      setData(res.data) // roles?_expand=rights data
    })
  }, [])
  const handleClick = (item) => { // Button
    setIdEdit(item.rightsId) // 储存当前正在处理的权限的id
    axios.get(`http://localhost:7890/rights/${item.rightsId}`).then(res => { // 复选框选中状态从json读取
      let arr = []
      res.data.children.forEach(child => { // 父节点=>子节点
        child.children.forEach(item => { // 子节点=>孙节点
          if (item.right === 1) { // 孙节点存在权限时
            return arr.push(item.key) // 路径名: "/": 管理页面, "/user:": 人员管理, "/user/list": 用户列表
          }
        })
      })
      setRightEdit(res.data) // 储存请求到的数据用于对话框控件点击确定后，通过put请求将json中的数据替换
      setAllCheckedKeys(arr) // 非最低级子节点的复选框，树形控件都会自动处理，所以这里只处理最低一级的子节点权限
    })
    setIsModalVisible(true)
    setTreeData(item.rights.children) // 树形控件结构直接从传来的数据读取
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'katagaki',
      render: (dataIndex, record) => {
        let color = record.rightsId === 2 ? 'geekblue' : 'green'
        if (record.rightsId === 1) {
          color = 'red'
        }
        return (
          <Tag color={color} key={dataIndex}>
            {dataIndex}
          </Tag>
        )
      }
    },
    {
      title: '操作',
      render: (_, record) => ( // _
        <Space size="middle">
          <Tooltip title="修改权限">
            <Button shape="circle" icon={<SettingOutlined />} onClick={() => handleClick(record)} />
          </Tooltip>
        </Space>
      )
    }
  ]
  const onExpand = (expandedKeysValue) => { // 似乎是自动传值
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  // 
  const onCheck = (checkedKeysValue, e) => {
    // console.log('onCheck', checkedKeysValue);
    // setCheckedKeys(checkedKeysValue);
    setHalfCheckedKeys(e.halfCheckedKeys)
    setAllCheckedKeys(checkedKeysValue)
  };
  const onSelect = (selectedKeysValue, info) => { // 04:50
    // console.log('onSelect', info);
    // setSelectedKeys(selectedKeysValue);
    if (info.node.rank === 2) { // 如果rank很深或不统一，则用node.children是否存在来判断是否还存在子节点
      if (info.node.checked) {
        setAllCheckedKeys(allCheckedKeys.filter(item => {
          return !info.node.key.includes(item)
        }))
      } else {
        setAllCheckedKeys([...allCheckedKeys, info.node.key])
      }
    } else {
      if (info.node.checked) { // 如果是全选中状态，则取消所有选中
        let arr = allCheckedKeys
        arr = arr.filter(item => {
            return item !== info.node.key
        })
        info.node.children.forEach(child=>{
          arr=arr.filter(item=>{
            return item!==child.key
          })
        })
        setAllCheckedKeys(arr)
      } else { // 如果是非全选中状态，则更新为全选中
        let arr = allCheckedKeys
        info.node.children.forEach(child => {
          if (!arr.includes(child.key)) {
            arr.push(child.key)
          }
        })
        setAllCheckedKeys(arr)
      }
    }
    setSelectedKeys(selectedKeysValue)
  };
  const handleOk = () => {
    setIsModalVisible(false);
    let arr = rightEdit // 避免多次组件更新，创建一个临时变量arr
    arr.children.forEach(child => {
      if (allCheckedKeys.includes(child.key)) {
        child.right = 1
        child.children.forEach(item => {
          if (allCheckedKeys.includes(item.key)) {
            item.right = 1
          } else {
            item.right = 0
          }
        })
      } else {
        child.right = 0
        child.children.forEach(item => {
          if (allCheckedKeys.includes(item.key)) {
            item.right = 1
            child.right = 1
          } else {
            item.right = 0
          }
        })
      }
    })
    axios.put(`http://localhost:7890/rights/${idEdit}`, arr).then(res => {
      // console.log(res)
    })
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} /> {/* data: roles?_expand=rights */}
      <Modal title="Basic Modal" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          onExpand={onExpand} // 展开/收起节点时触发
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          // checkedKeys={checkedKeys}
          checkedKeys={{ checked: allCheckedKeys, halfChecked: halfCheckedKeys }} // 半选中状态
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </Modal>
    </div>
  )
}
