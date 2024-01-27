import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values) => { // 提交表单且数据验证成功后回调事件
    // console.log('Received values of form: ', values); // {username: '123', password: '123', confirm: '123', agreement: true}
    axios.post('http://localhost:5000/users', {
      "username": values.username,
      "state": 0, // 0 for normal, 1 for sell banned, 2 for buy banned, 3 for user banned
      "password": values.password,
    }).then(res => {
      history.push('/login') // / // , { isRegisterValue: true }
      message.info('注册成功！'); // 静态方法 // https://ant-design.antgroup.com/components/notification-cn#notification-demo-basic
    })
  };
  const sameNameCheck=(value)=>{ // https://ant-design.antgroup.com/components/form-cn#formitem
    console.log(value)
    // axios.get(`http://localhost:5000/users?username=${}`)
  }
  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input onBlur={sameNameCheck({getFieldValue})}/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback // 用于给输入框添加反馈图标
          rules={[
            {
              required: true, // 必填样式设置。如不设置，则会根据校验规则自动生成
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({ // 每次输入框内容更新就会引发这里的调用，而不是onBlur
              validator(_, value) {
                // console.log(getFieldValue('password'))
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password visibilityToggle={false} />
          {/* {...} */}
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/agreement">agreement</a>
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Button style={{marginLeft:"3vh"}} onClick={()=>history.push('/login')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;