import React from 'react';
import {
  UserOutlined,
  UnorderedListOutlined,
  AimOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './mySider.less'
import { useHistory } from 'umi'; // useHistory
import axios from 'axios' // axios

const { Sider } = Layout;
function getItem(label, key, icon, children, type) { // menu
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('首页', '/home', <AimOutlined />),
  getItem('用户管理', '/userManage', <UserOutlined />, [
    getItem('用户列表', '/userManage/userList', <UnorderedListOutlined />),
  ]),
  getItem('权限管理', '/rightManage', <AuditOutlined />, [
    getItem('角色列表', '/rightManage/role/roleList', <UnorderedListOutlined />),
    getItem('权限列表', '/rightManage/right/rightList', <UnorderedListOutlined />),
  ]),
];

const MySider = ({ collapsed }) => { // {collapsed}
  const { token: { }, } = theme.useToken();
  const history = useHistory(); // useHistory
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical">
        后台系统
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        /*
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        */
        defaultOpenKeys={['sub1']} // menu
        items={items} // menu
        onClick={({ key }) => {
          history.push(key) // history
        }} // function({ item, key, keyPath, domEvent })
      />
    </Sider>
  );
};
export default MySider;