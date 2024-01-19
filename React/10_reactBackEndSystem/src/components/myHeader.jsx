import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import MyDropdown from '../components/myDropdown'; // 下拉菜单
import useCollapsed from '../models/useCollapsed'; // hox

const { Header } = Layout;

//const MyHeader = ({collapsed, setCollapsed}) => { // {collapsed, setCollapsed}
const MyHeader = () => { // hox
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {collapsed, changeCollapsed} = useCollapsed(); // hox // {}方式解构 // changeCollapsed
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
        // icon={collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed}/>} // hox // 必须点小图标才能触发onClick
        // onClick={() => setCollapsed(!collapsed)}
        onClick={changeCollapsed} // 整个按钮范围均可触发
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