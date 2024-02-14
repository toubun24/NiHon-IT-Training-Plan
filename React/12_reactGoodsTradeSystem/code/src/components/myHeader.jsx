import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, AuditOutlined, FormOutlined, DeleteOutlined, MoneyCollectOutlined, CarryOutOutlined } from '@ant-design/icons';
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
}

const MyHeader = () => {
  const [menuList, setMenuList] = useState([])
  const [userState, setUserState] = useState()
  const history = useHistory()
  const location = useLocation()
  useEffect(
    () => {
      axios.get('http://localhost:5000/headers').then(
        response => {
          setMenuList(response.data)
        }
      )
      setUserState(JSON.parse(localStorage.getItem('token')).state)
    }, []
  )
  // const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
  const getItem = (menuList) => {
    return menuList.map(item => {
      return  {
        key: item.key,
        label: item.title, // label => title
        // icon: iconList[item.key], // icon // []
      }
    })
  }
  return (
    <Menu
    mode="horizontal"
    // defaultSelectedKeys={['2']}
    items={getItem(menuList)}
    // style={{ flex: 1, minWidth: 0, }}
    style={{
      fontSize: '16px',
      width: 400,
      height: 64,
    }}
    onClick={({ key }) => { history.push(key) }}
  />
  );
};
export default MyHeader;