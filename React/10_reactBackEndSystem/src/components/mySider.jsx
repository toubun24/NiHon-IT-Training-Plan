// cd G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\JSONServer
// json-server db.json --port 5000

import React, { useState, useEffect } from 'react'; // useState, useEffect
import {
  UserOutlined,
  UnorderedListOutlined,
  AimOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './mySider.less'
import { useHistory, useLocation } from 'umi'; // useHistory // useLocation
import axios from 'axios'; // axios
// import { responsiveArray } from 'antd/es/_util/responsiveObserver';

const { Sider } = Layout;
/*
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
*/
const getItem = (menuList) => {
  return menuList.map(item => {
    if (item.children && checkPagePermission(item) && item.children.length > 0) {
      return {
        key: item.key,
        label: item.label,
        children: getItem(item.children), // .map is not a function => .children
        icon: iconList[item.key], // icon // []
      }
    }
    return checkPagePermission(item) && {
      key: item.key,
      label: item.label,
      icon: iconList[item.key], // icon // []
    }
  })
}
const checkPagePermission = (item) => {
  return item.pagepermission === 1 // true/false
}
const iconList = {
  '/home': <AimOutlined />,
  '/user-manage': <UserOutlined />,
  '/user-manage/list': <UnorderedListOutlined />,
  '/right-manage': <AuditOutlined />,
  '/right-manage/role/list': <UnorderedListOutlined />,
  '/right-manage/right/list': <UnorderedListOutlined />,
}

const MySider = ({ collapsed }) => { // {collapsed}
  const { token: { }, } = theme.useToken();
  const history = useHistory(); // useHistory
  const [menuList, setMenuList] = useState([]) // menuList
  const location = useLocation() // useLocation
  useEffect(
    () => {
      axios.get('http://localhost:5000/rights?_embed=children').then(
        response => {
          console.log(response.data)
          setMenuList(response.data)
        }
      )
    }, []
  )
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="demo-logo-vertical">后台系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={['1']} // '/home'
            selectedKeys={[location.pathname]} // 当前选中的菜单项key数组 // location.pathname
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
            // defaultOpenKeys={['sub1']} // menu
            defaultOpenKeys={['/' + location.pathname.split('/')[1]]} // {[]} // 截取
            // items={items} // menu
            // items={menuList} // menuList
            items={getItem(menuList)}
            onClick={({ key }) => { history.push(key) }} // history // function({ item, key, keyPath, domEvent })
          />
        </div>
      </div>
    </Sider>
  );
};
export default MySider;