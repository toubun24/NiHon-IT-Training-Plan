import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons'; // UserOutlined
import { Dropdown, Space, Avatar } from 'antd'; // Avatar
import { useHistory } from 'umi'; // history

const MyDropdown = () => {
  const history = useHistory(); // history
  // console.log('dorp-token',token)
  // const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token')) // SyntaxError: Unexpected end of JSON input (token为空)
  const tokenContent = localStorage.getItem('token');
  const { role: { roleName }, username } = tokenContent == '' ? { role: { roleName: '' }, username: "" } : JSON.parse(tokenContent) // JSON.parse
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer"> {/* 超级管理员Admin {roleName} {username} */}
          {roleName} {username}
        </a>
      ),
    },
    {
      key: '4',
      danger: true,
      // label: '退出登录',
      label: (
        <a onClick={() => {
          localStorage.setItem('token', '') // 清空token
          history.push('/login')
        }}>
          退出登录
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items, }} >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          欢迎回来
          <DownOutlined />
          <Avatar icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  )
}

export default MyDropdown;