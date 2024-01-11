import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons'; // UserOutlined
import { Dropdown, Space, Avatar } from 'antd'; // Avatar

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        超级管理员Admin
      </a>
    ),
  },
  {
    key: '4',
    danger: true,
    label: '退出登录',
  },
];

const App = () => (
  <Dropdown menu={{ items, }} >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        欢迎回来
        <DownOutlined />
        <Avatar icon={<UserOutlined />} />
      </Space>
    </a>
  </Dropdown>
);

export default App;