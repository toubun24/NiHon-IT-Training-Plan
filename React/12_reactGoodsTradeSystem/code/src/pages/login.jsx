import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './login.less'
import axios from 'axios';
import { useHistory } from 'umi';
import { connect } from 'umi';

const Login = ({ dispatch }) => { // stateId: 1正常 2禁购 3禁售 4封禁 5注销 6管理 7超级管理 8禁用管理
  const history = useHistory();
  const handleIncrement = (changedValue) => {
    dispatch({
      type: 'counter/increment',
      payload: changedValue,
    });
  };
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&_expand=state`).then(
      res => {
        // console.log(res)
        // console.log(res.data,res.data[0].state,Number(res.data[0].state),Number(res.data[0].state) === 1)
        if (res.data.length === 0) {
          message.error('登录失败')
        } else if (Number(res.data[0].stateId) === 2) { // res.data[0]
          message.error('账号已禁购')
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          handleIncrement(res.data[0].balance)
          history.push('/homepage')
        } else if (Number(res.data[0].stateId) === 3) { // res.data[0]
          message.error('账号已禁售')
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          handleIncrement(res.data[0].balance)
          history.push('/home')
        } else if (Number(res.data[0].stateId) === 4) { // res.data[0]
          message.error('账号已封禁')
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          handleIncrement(res.data[0].balance)
          history.push('/homepage')
        } else if (Number(res.data[0].stateId) === 5) { // res.data[0]
          message.error('账号已注销')
        } else if (Number(res.data[0].stateId) === 8) { // res.data[0]
          message.error('管理员权限已关闭')
        } else {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          handleIncrement(res.data[0].balance)
          history.push('/home')
        }
      }
    )
  };
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="logi-title">用户登录</div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住账号</Checkbox>
          </Form.Item>
          {/* <a className="login-form-forgot" href="">忘记密码</a> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <a href={'/register'}>现在注册</a>
        </Form.Item>
      </Form>
    </div>
  );
};
function mapStateToProps({ counter }) {
  return {
    counter, // 引入counter模型的状态
  };
}
// export default Login;
export default connect(mapStateToProps)(Login);