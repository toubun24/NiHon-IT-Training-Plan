import React, { useEffect, useState } from 'react';
import { Table, Select, Tag, Input, message, Button, Modal, Form, Switch } from 'antd';
import axios from 'axios';
import OtherAvatar from '../../components/otherAvatar';
import moment from 'moment'; // 时间戳格式化

const { Option } = Select;

const stateList = ['正常', '禁购中', '禁售中', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const stateList2 = ['正常', '禁购', '禁售', '封禁']
const colorList = ['green', 'orange', 'orange', 'red', 'gray']
const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 10,
    },
  },
};

const tagManage = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [finalDataSource, setFinalDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tagsData, setTagsData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/tags`) // 不包含超级管理员的话http://localhost:5000/users?state_gte=5&state_ne=6
    setTagsData(res.data.filter(tag => tag.tagName !== ""))
  }, [])

  const onChange = async (handlingId, handlingState) => {
    // console.log(`switch to ${checked}`, id);
    await axios.patch(`http://localhost:5000/tags/${handlingId}`, {
      state: handlingState !== 1 ? 1 : 0,
    })
    setTagsData(tagsData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: handlingState !== 1 ? 1 : 0 };
      }
      return obj;
    }));
  };

  const columns = [
    {
      title: '标签名',
      dataIndex: 'tagName',
      key: 'tagName',
      render: (_, { id, tagName }) => (
        <Tag>{tagName}</Tag>
      )
    },
    {
      title: '相关商品件数',
      dataIndex: 'tagNum',
      key: 'tagNum',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.tagNum - b.tagNum,
      render: (_, { tagNum }) => (
        <span>{tagNum}</span>
      )
    },
    {
      title: '权限操作',
      dataIndex: 'state',
      key: 'action',
      render: (_, { state, id }) => (
        <Switch checked={state !== 1 ? true : false} onChange={() => onChange(id, state)} />
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={tagsData} columns={columns} rowKey="id" />
    </div>
  );
};

export default tagManage;

// 用户名排序
// 头像未更新
// 权限操作更改