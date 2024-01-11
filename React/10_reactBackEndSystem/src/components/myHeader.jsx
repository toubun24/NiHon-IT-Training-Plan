import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import MyDropdown from '../components/myDropdown'; // 下拉菜单

const { Header } = Layout;

const MyHeader = ({collapsed, setCollapsed}) => { // {collapsed, setCollapsed}
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Header
      style={{
        // padding: 0,
        padding: '0 16px',
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: 'right' }}> {/* 额外用<div>包裹并对其应用右浮动 */}
        <MyDropdown /> {/* 下拉菜单 */}
      </div>
    </Header>
  );
};
export default MyHeader;