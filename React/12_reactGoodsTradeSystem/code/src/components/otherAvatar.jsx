import React, { useState, useEffect } from 'react';
import { Avatar, Spin } from 'antd';
import axios from 'axios';
import {UserOutlined}from '@ant-design/icons';

const OtherAvatar = ({ userIdInfo, size = "" }) => { // {}否则得到{userIdInfo: 3}
  // console.log("get", userIdInfo)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // console.log("if", userIdInfo)
    axios.get(`http://localhost:5000/users/${userIdInfo}`).then(
      res => {
        setUserData(res.data)
      }
    )
  }, [])

  return (
    <div>
      {
        userData.avatar ? <Avatar size={size} src={<img src={require(`@/images/avatars/${userData.avatar}`)} alt="avatar" />} /> : <Avatar
          size={size}
          style={{
            backgroundColor: '#fadb14',
            verticalAlign: 'middle',
          }}
          gap={1}
        >
          {userData.username}
        </Avatar>
      }
    </div>
  )
}
export default OtherAvatar