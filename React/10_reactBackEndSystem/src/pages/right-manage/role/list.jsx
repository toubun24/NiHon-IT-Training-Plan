import { Table, Tag, Button, Modal, Tree } from 'antd'; // Tree
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]); // rights => checkedKeys
  const [rightsId, setRightsId] = useState(0); // rightsId => checkedKeys
  useEffect(
    () => {
      axios.get('http://localhost:5000/roles').then(
        response => {
          setTable(response.data)
        }
      )
    }, []
  )
  useEffect(
    () => {
      axios.get('http://localhost:5000/rights?_embed=children').then(
        response => {
          setTreeData(response.data) // replace all 'label' to 'title' in db.json
        }
      )
    }, []
  )
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '开关',
      render: (item) => {
        return <div>
          <Button type="primary" icon={<EditOutlined />} onClick={() => {
            setIsModalOpen(true);
            setCheckedKeys(item.rights) // rights => checkedKeys
            setRightsId(item.id) // rightsId => checkedKeys
          }} >修改</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }}>删除</Button>
        </div>
      }
    },
  ];
  const comfirmedDelete = (item) => {
    setTable(table.filter(data => data.id !== item.id))
    // axios.delete(`http://localhost:5000/roles/${item.id}`)
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
  const handleOk = () => {
    setIsModalOpen(false);
    setTable(table.map(item => {
      if (item.id === rightsId) { // rightsId => checkedKeys
        return {
          ...item,
          rights: checkedKeys,
        }
      }
      return item
    }))
    // axios.patch(`http://localhost:5000/roles/${rightsId}`, { rights: checkedKeys }) // rightsId => checkedKeys
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCheck = (check) => {
    setCheckedKeys(check);
  };

  return (
    <>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} /> {/* rowKey: 当renderItem自定义渲染列表项有效时，自定义每一行的key的获取方式 */}
      <Modal title="权限管理" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable // 节点前添加Checkbox复选框
          checkStrictly // checkable状态下节点选择完全受控（父子节点选中状态不再关联）
          checkedKeys={checkedKeys} // （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
          onCheck={onCheck} // 点击复选框触发
          treeData={treeData}
        />
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