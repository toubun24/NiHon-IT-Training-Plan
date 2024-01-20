import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate
import './index.css'

/*
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
*/

const { Sider } = Layout;
const rootSubmenuKeys = ['/user', '/right', '/inStock', '/todo', '/archives']; // submenu keys of first level
const iconList = { // 图标映射表
  '/user': <AppstoreOutlined />,
  '/right': <MailOutlined />,
  '/inStock': <SettingOutlined />,
  '/todo': <MailOutlined />,
  '/archives': <AppstoreOutlined />,
}

const SiderMenu = ({ collapsed }) => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).children // JSON.parse(...).children
    setItems(token.map(item => {
      if (item.right === 1 && item.showed === 1) {
        return {
          key: item.key,
          label: item.title,
          icon: iconList[item.key],
          children: item.children.map(item => {
            if (item.right === 1 && item.showed === 1) {
              return {
                key: item.key,
                label: item.title,
              }
            }
            return {}
          })
        }
      }
      return {}
    }))
  }, [])
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const navigate = useNavigate()
  const handleClick = (item) => { // 点击后跳转路径
    navigate(item.key)
  }

  const onOpenChange = (keys) => { // 只展开当前父级菜单：点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
      <div className="logo" />
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          // width: 256,
          // width: 200, // 设置该项后侧边栏缩小不完全
        }}
        items={items}
        onClick={(item) => { handleClick(item) }}
      />
    </Sider>
  );
};
export default SiderMenu;