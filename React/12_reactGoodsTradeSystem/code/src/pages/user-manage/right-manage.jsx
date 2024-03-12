import React, { useEffect, useState } from 'react';
import { Table, Select, Tag } from 'antd';
import axios from 'axios';
import OtherAvatar from '../../components/otherAvatar';
import moment from 'moment'; // 时间戳格式化

const { Option } = Select;

const stateList = ['正常', '禁购中', '禁售中', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const stateList2 = ['正常', '禁购', '禁售', '封禁']
const colorList = ['green', 'orange', 'orange', 'red', 'gray']

const rightManage = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/users?state_lte=4`) // 不包含管理员
    setDataSource(res.data)
    setFilteredDataSource(res.data)
  }, [])

  const handleStateChange = (value) => {
    setSelectedState(value);
    if (value === 'all') {
      setFilteredDataSource(dataSource);
      console.log(dataSource)
    } else {
      setFilteredDataSource(dataSource.filter((item) => { return item.state == value })); // return // ==
      console.log(dataSource.filter((item) => { return item.state == value }))
    }
  };

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, { id }) => (
        <OtherAvatar userIdInfo={id} />
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (_, { id,username }) => (
        <a href={`/homepages/${id}`}>{username}</a>
      )
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (_, { state }) => (
        <Tag color={colorList[state]}>
          {stateList[state]}
        </Tag>
      )
    },
    {
      title: '地址',
      dataIndex: 'location',
      key: 'location',
      render: (_, { location }) => ( // 空格分隔
        <div>
          {location&&location.join(" ")}
        </div>
      )
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.registerTime - b.registerTime,
      render: (_, { registerTime }) => (
        <div>
          {moment(registerTime).format('YY/MM/DD HH:mm:ss')}
        </div>
      )
    },
    {
      title: '权限操作',
      dataIndex: 'state',
      key: 'action',
      render: (_, { state }) => (
        <Select
          value={stateList2[state]}
          style={{ width: 100 }}
          onChange={() => { }}
        >
          <Option value="0">{stateList2[0]}</Option>
          <Option value="1">{stateList2[1]}</Option>
          <Option value="2">{stateList2[2]}</Option>
          <Option value="3">{stateList2[3]}</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <Select
        value={selectedState}
        style={{ width: 100, float: "right" }}
        onChange={handleStateChange}
      >
        <Option value="all">全部</Option>
        <Option value="0">正常</Option>
        <Option value="1">禁购中</Option>
        <Option value="2">禁售中</Option>
        <Option value="3">封禁中</Option>
      </Select>
      <Table dataSource={filteredDataSource} columns={columns} />
    </div>
  );
};

export default rightManage;

// 用户名排序
// 头像未更新
// 权限操作更改