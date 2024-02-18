import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme, Avatar, Dropdown } from 'antd';
import MySider from '../components/mySider';
import './index.less';
import MyHeader from '../components/myHeader';
import MyAvatar from './../components/myAvatar';

const { Header, Sider, Content } = Layout;

const App = (props) => { // 插槽props
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (
    props.location.pathname === '/login' || // 登录界面不出现该layout
    props.location.pathname === '/login/'
    ) {
    return <div>{props.children}</div> // 离开后台界面回到登录页面
  }
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light" // 黑底变白底
      >
        <div className="demo-logo-vertical" />
        <MySider />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center'
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
          <MyHeader />
          <MyAvatar />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto', // 界面溢出
          }}
        >
          {/* Content */}
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;