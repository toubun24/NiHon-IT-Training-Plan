// import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiderMenu from '../../components/SiderMenu'
import Top from '../../components/Top'
import { Layout } from 'antd'
import './index.css'

const { Content } = Layout;

export default function Backend() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <SiderMenu collapsed={collapsed} />
      <Layout className="site-layout">
        <Top collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet /> {/* 子路由 */}
        </Content>
      </Layout>
    </Layout>
  )
}
