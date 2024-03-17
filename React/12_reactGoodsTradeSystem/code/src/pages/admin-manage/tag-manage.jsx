import React, { useEffect, useState } from 'react';
import { Table, Select, Tag, Input, message, Button, Modal, Form, Switch } from 'antd';
import axios from 'axios';

const tagManage = () => {
  const [tagsData, setTagsData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/tags`)
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