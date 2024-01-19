import { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Backend() {
  return (
    <div>
      Backend
      <Content className="site-layout-background">
        {/* <Outlet /> */} {/* 子路由 */}
      </Content>
    </div>
  )
}
