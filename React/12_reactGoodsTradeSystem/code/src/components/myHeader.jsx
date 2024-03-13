import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, AuditOutlined, FormOutlined, DeleteOutlined, MoneyCollectOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { useHistory, useLocation } from 'umi';

const MyHeader = () => {
  const [menuList, setMenuList] = useState([])
  const [userState, setUserState] = useState({})
  const history = useHistory()
  const tokenContent = localStorage.getItem('token')
  const myContentId = tokenContent == '' ? { myContentId: '' } : JSON.parse(tokenContent).id // JSON.parse // .id

  useEffect(() => {
    axios.get('http://localhost:5000/headers').then(
      response => {
        setMenuList(response.data)
      }
    )
    axios.get(`http://localhost:5000/users/${myContentId}`).then(
      response => {
        setUserState(Number(response.data.state)) // Number
      }
    )
  }, [])
  // const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
  const getItem = (menuList) => {
    return menuList.map(item => {
      if (item.visible.includes(userState)) {
        return {
          key: item.key,
          label: item.title, // label => title
          // icon: iconList[item.key], // icon // []
        }
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