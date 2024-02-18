import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.less'
import axios from 'axios';
import { useHistory } from 'umi';

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}`).then(
      res => {
        // console.log(res)
        if (res.data.length === 0) {
          message.error('登录失败')
        } else if (res.data.state === 3) {
          message.error('账号已封禁')
        } else {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          history.push('/search')
        }
      }
    )
  };
  return (
    <div>
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
export default Login;