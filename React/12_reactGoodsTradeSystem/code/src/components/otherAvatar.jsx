import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import axios from 'axios';

const OtherAvatar=(userIdInfo)=> {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // console.log(userIdInfo)
    axios.get(`http://localhost:5000/users/${userIdInfo.userId}`).then(
      res => {
        setUserData(res.data)
      }
    )
  }, [])

  return (
      <div >
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
      </div>
  )
}
export default OtherAvatar