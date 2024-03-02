import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Cascader,
  Upload,
  Row,
} from 'antd';
import axios from 'axios';
import { useHistory } from 'umi';
import { cityArray } from '../components/cityData';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const onFinish = (values) => { // 提交表单且数据验证成功后回调事件
    // console.log('Received values of form: ', values); // {username: '123', password: '123', confirm: '123', agreement: true}
    axios.get(`http://localhost:5000/users?username=${values.username}`).then(res => {
      if (res.data.length !== 0) {
        message.info('用户名重复！')
      } else {
        // console.log(values.touxiang)
        axios.post('http://localhost:5000/users', {
          "username": values.username,
          "state": 0, // 0 for normal, 1 for sell banned, 2 for buy banned, 3 for user banned
          "password": values.password,
          "starList": [],
          "location": values.location ? values.location : '',
          "avatar": values.touxiang ? values.touxiang[0].name : '',
          "balance": 0,
          "followList": [],
          "historyList": [], // 最近浏览，最长为10条
        }).then(res => {
          history.push('/login') // / // , { isRegisterValue: true }
          message.info('注册成功！'); // 静态方法 // https://ant-design.antgroup.com/components/notification-cn#notification-demo-basic
        })
      }
    })
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
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
          label="用户名"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
              /*
              validateTrigger: 'onBlur', // onSubmit
              validator:
                (value) => {
                  axios.get(`http://localhost:5000/users?username=${value}`).then(res => {
                    if (res.data.length !== 0) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Username already exist'))
                  })
                }
                */
            }
          ]}
        >
          <Input // form.getFieldValue(): 从form.item取值
            style={{ width: 300, }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{ width: 300, }} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
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
          <Input.Password style={{ width: 300, }} visibilityToggle={false} />
          {/* {...} */}
        </Form.Item>

        <Form.Item
          label="常用地址"
          name="location"
        >
          <Cascader style={{ width: 200, }} options={cityArray} />
        </Form.Item>

        <Form.Item
          label="上传头像"
          name="touxiang"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
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
          <Button style={{ marginLeft: "3vh" }} onClick={() => history.push('/login')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
export default Register;