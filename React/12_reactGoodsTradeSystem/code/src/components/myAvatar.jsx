import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown } from 'antd';
import { useHistory } from 'umi'; // history
import axios from 'axios';

const MyAvatar = () => {
  const history = useHistory(); // history
  // const [information, setInformation] = useState([]);
  const tokenContent = localStorage.getItem('token');
  const { id } = tokenContent == '' ? { id: '' } : JSON.parse(tokenContent)
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    axios.get(`http://localhost:5000/users/${id}`).then( // 按发布时间降序 // desc // state_ne
    res => {
      setUserData(res.data)
    }
  )
  }, [])
  const items = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          history.push('/homepage')

        }}>
          当前余额: {userData.balance}
        </a>
      ),
    },
    {
      danger: true,
      key: '2',
      label: (
        <a onClick={() => {
          localStorage.setItem('token', '') // 清空token
          history.push('/login')
        }}>
          退出登录
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
          >
      <div style={{ float: 'right', cursor: 'pointer' }} onClick={()=>history.push('/homepage')}>
        {
          userData.avatar ? <Avatar src={<img src={require(`@/images/avatars/${userData.avatar}`)} alt="avatar" />} /> : <Avatar
            style={{
              backgroundColor: '#fadb14',
              verticalAlign: 'middle',
            }}
            size="large"
            gap={1}
          >
            {userData.username}
          </Avatar>
        }
        <span style={{ marginLeft: '5px',fontWeight: 'bold' }}>{userData.username}</span>
      </div>
    </Dropdown>
  )
}
export default MyAvatar