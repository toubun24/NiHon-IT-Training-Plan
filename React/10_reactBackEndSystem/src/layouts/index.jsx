// https://ant-design.antgroup.com/components/layout-cn // 自定义触发器

import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import MySider from '../components/mySider'; // 侧边栏
import MyHeader from '../components/myHeader'; // 顶部栏

const { Content } = Layout;

const App = (props) => { // props
  if (props.location.pathname === '/login' || props.location.pathname === '/login/') {
    return <div>{props.children}</div> // 离开后台界面回到登录页面
  }
  const [collapsed, setCollapsed] = useState(false); // useState
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <MySider collapsed={collapsed} /> {/* 侧边栏 */} {/* collapsed={collapsed} */}
      <Layout>
        <MyHeader collapsed={collapsed} setCollapsed={setCollapsed} /> {/* collapsed={collapsed}  setCollapsed={setCollapsed} */}
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
          {props.children} {/* 插槽 */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;

/*
const index = (props) => { // props
  return (
      <div>
          {props.children}
      </div>
  )
}

export default index
*/