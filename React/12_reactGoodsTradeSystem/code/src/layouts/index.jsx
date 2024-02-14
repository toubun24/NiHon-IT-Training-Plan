import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme, Menu } from 'antd';
import MySider from '../components/mySider';
import './index.less';
import MyHeader from '../components/myHeader';

const { Header, Sider, Content } = Layout;

const App = (props) => { // 插槽props
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
         <MyHeader/>
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