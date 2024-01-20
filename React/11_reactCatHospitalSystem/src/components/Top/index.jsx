import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Space, Avatar, Modal } from 'antd';
import React, { useState } from 'react';
import './index.css';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Top = ({ collapsed, setCollapsed }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleClick = () => {
    setIsModalVisible(true) // 点击退出后显示对话框
  }
  const handleOK = () => {
    console.log('clickOK')
    setIsModalVisible(false) // 暂时还没写完所以先false
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          danger: true,
          label: '退出登录',
          onClick: handleClick,
        },
      ]}
    />
  )

  return (
    <div>
      <Header
        className="site-layout-background"
        style={{
          // padding: 0,
          padding: '0 16px', // 防止太过靠边
        }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
        <span style={{ float: 'right' }}>
          {/* warning.js:19 Warning: [antd: Dropdown] `overlay` is deprecated. Please use `menu` instead. */}
          {/* 但修改后报错: Uncaught Error: React.Children.only expected to receive a single React element child. 原来是antd版本大于4.24.0时才需要，而我这"antd": "^4.22.3"，不改了，就是警告还一直在哼 */}
          <Dropdown overlay={menu}>
            {/* <a onClick={(e) => e.preventDefault()}> */}
            {/*
              Compiled with warnings. [eslint]
              src\components\Top\index.jsx
              Line 55:13:
              The href attribute is required for an anchor to be keyboard accessible.
              Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles.
              Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
              jsx-a11y/anchor-is-valid
            */}
            <Space>
              <span className='avatar'>
                <Avatar
                  // src="http://joeschmoe.io/api/v1/random"
                  // src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                  // size="small"
                  icon={<UserOutlined />}
                />
              </span>
              <DownOutlined />
            </Space>
            {/* </a> */}
          </Dropdown>
        </span>
      </Header>
      <Modal title="退出登录" open={isModalVisible} onOk={handleOK} onCancel={handleCancel} okType='danger'>
        <p>请确定是否退出登录？</p>
      </Modal>
    </div>
  );
};
export default Top;