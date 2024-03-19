import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown } from 'antd';
import { useHistory } from 'umi'; // history
import axios from 'axios';
import { connect } from 'umi';

const MyAvatar = ({ value, dispatch, counter }) => { // stateId: 1正常 2禁购 3禁售 4封禁 5注销 6管理 7超级管理 8禁用管理
  const history = useHistory(); // history
  // const [information, setInformation] = useState([]);
  const tokenContent = localStorage.getItem('token');
  const { id, stateId } = tokenContent == '' ? { id: '', stateId: '' } : JSON.parse(tokenContent)
  const [userData, setUserData] = useState([]);
  // const [items, setItems] = useState([]);
  // const [myBalance, setMyBalance] = useState(); // 原先的余额，但是没能实现组件间传值，所以改用dva实现
  const [myState, setItems] = useState([]);

  const handleUpdate = (changedValue) => { //effect查万对比
    dispatch({
      type: 'counter/update',
      payload: changedValue,
    });
  };
  const handleIncrement = (changedValue) => {
    dispatch({
      type: 'counter/increment',
      payload: changedValue,
    });
  };
  const getDropdownItems = () => { // 否则渲染不出余额
    if (stateId !== 6 && stateId !== 7) {
      return [
        {
          key: '1',
          label: (
            <a onClick={() => {
              history.push('/homepage')

            }}>
              当前余额: {value}
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
    } else {
      return [
        {
          danger: true,
          key: '1',
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
    }
  };
  const items = getDropdownItems();
  useEffect(() => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    axios.get(`http://localhost:5000/users/${id}`).then( // 按发布时间降序 // desc // state_ne
      res => {
        setUserData(res.data)
        // setMyBalance(res.data.balance)
        // handleUpdate(res.data.balance)
        // if(tokenContent){
          // handleIncrement(res.data.balance)
        // }
        if (res.status === 200) {
          // 使用获取到的余额更新counter  
          dispatch({
            type: 'counter/update',
            payload: { value: res.data.balance },
          });
        }
      }
    )
    // setItems(state===5||state===6?items2:items1) // 管理员不需要显示账户余额
  }, [])

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
    >
      <div style={{ float: 'right', cursor: 'pointer' }} onClick={() => { stateId !== 6 && stateId !== 7 && history.push('/homepage') }}>
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
        <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{userData.username}</span>
      </div>
    </Dropdown>
  )
}
function mapStateToProps({ counter }) {
  return {
    value: counter.value, // 从counter模型中获取value
  };
}
// export default MyAvatar
export default connect(mapStateToProps)(MyAvatar)
/*
export default connect(({ counter }) => ({  
  counter,  
}))(MyAvatar);
*/