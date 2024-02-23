import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown } from 'antd';
import { useHistory } from 'umi'; // history

export default function myAvatar() {
  const history = useHistory(); // history
  const [information, setInformation] = useState([]);
  useEffect(() => {
    const tokenContent = localStorage.getItem('token')
    tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
  }, [])
  const items = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          history.push('/homepage')

        }}>
          当前余额: {information.balance}
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
      <div style={{ float: 'right' }}>
        {
          information.avatar ? <Avatar src={<img src={require(`@/images/avatars/${information.avatar}`)} alt="avatar" />} /> : <Avatar
            style={{
              backgroundColor: '#fadb14',
              verticalAlign: 'middle',
            }}
            size="large"
            gap={1}
          >
            {information.username}
          </Avatar>
        }
        <span style={{marginLeft:'5px'}}>{information.username}</span>
      </div>
    </Dropdown>
  )
}
