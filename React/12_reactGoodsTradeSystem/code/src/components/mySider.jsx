import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, AuditOutlined, FormOutlined, DeleteOutlined, MoneyCollectOutlined, CarryOutOutlined, UserOutlined, CustomerServiceOutlined, CrownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { useHistory, useLocation } from 'umi';

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const iconList = {
  '/published': <CloudUploadOutlined />,
  '/published/publishing': <AuditOutlined />,
  '/published/draft': <FormOutlined />,
  '/published/removed': <DeleteOutlined />,
  '/sold': <MoneyCollectOutlined />,
  '/bought': <CarryOutOutlined />,
  '/user-manage': <UserOutlined />,
  '/argue-manage': <CustomerServiceOutlined />,
  '/admin-manage': <CrownOutlined />,
}

const MySider = () => { // stateId: 1正常 2禁购 3禁售 4封禁 5注销 6管理 7超级管理 8禁用管理
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const [menuList, setMenuList] = useState([])
  const [userState, setUserState] = useState()
  const history = useHistory()
  const location = useLocation()
  const tokenContent = localStorage.getItem('token')
  const myContentId = tokenContent == '' ? { myContentId: '' } : JSON.parse(tokenContent).id // JSON.parse // .id

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(
      response => {
        setMenuList(response.data)
      }
    )
    axios.get(`http://localhost:5000/users/${myContentId}`).then(
      response => {
        setUserState(Number(response.data.stateId)) // Number
      }
    )
  }, [])
  // const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  const getItem = (menuList) => {
    return menuList.map(item => {
      // console.log(userState, item.visible, item.visible.includes(userState))
      // if (item.children && item.children.length > 0) {
      if (item.children && item.children.length > 0 && item.visible.includes(userState)) {
        return {
          key: item.key,
          label: item.title, // label => title
          children: getItem(item.children), // .map is not a function => .children
          icon: iconList[item.key], // icon // []
        }
      }
      // return {
      return item.visible.includes(userState) && {
        key: item.key,
        label: item.title, // label => title
        icon: iconList[item.key], // icon // []
        // style:{ backgroundColor: "#8dcff8" } // 间隙依然是白色
      }
    })
  }
  return (
    <Menu
      style={{ backgroundColor: "#b2f1e8" }}
      mode="inline"
      // openKeys={openKeys}
      onOpenChange={onOpenChange}
      // style={{ width: 256, }}
      // items={items}
      items={getItem(menuList)}
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
      onClick={({ key }) => { history.push(key) }}
    />
  );
};
export default MySider;