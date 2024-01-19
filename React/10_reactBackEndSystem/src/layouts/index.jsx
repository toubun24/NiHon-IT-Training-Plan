// https://ant-design.antgroup.com/components/layout-cn // 自定义触发器
// npm install --save nprogress // https://github.com/rstacruz/nprogress

import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import MySider from '../components/mySider'; // 侧边栏
import MyHeader from '../components/myHeader'; // 顶部栏
import NProgress from 'nprogress'; // nprogress
import 'nprogress/nprogress.css' // nprogress

const { Content } = Layout;

const App = (props) => { // props
  NProgress.start(); // nprogress
  useEffect(() => {
    NProgress.done();
  })
  // const [collapsed, setCollapsed] = useState(false); // Error: Rendered more hooks than during the previous render. // hox in MyHeader
  const { // Error: Rendered more hooks than during the previous render.
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (props.location.pathname === '/login' || props.location.pathname === '/login/') {
    return <div>{props.children}</div> // 离开后台界面回到登录页面
  }
  /*
  const [collapsed, setCollapsed] = useState(false); // useState
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  */
  return (
    <Layout>
      {/* <MySider collapsed={collapsed} /> */} {/* 侧边栏 */} {/* collapsed={collapsed} */}
      <MySider /> {/* hox */}
      <Layout>
        {/* <MyHeader collapsed={collapsed} setCollapsed={setCollapsed} /> */} {/* collapsed={collapsed}  setCollapsed={setCollapsed} */}
        <MyHeader /> {/* hox */}
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