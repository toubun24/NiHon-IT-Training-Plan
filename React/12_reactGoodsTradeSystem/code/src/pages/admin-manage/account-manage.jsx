import React, { useEffect, useState } from 'react';
import { Table, Select, Tag, Input, message, Button, Modal, Form, Switch } from 'antd';
import axios from 'axios';
import OtherAvatar from '../../components/otherAvatar';
import moment from 'moment'; // 时间戳格式化

const { Option } = Select;

const stateList = ['正常', '禁购中', '禁售中', '封禁中', '已注销'] // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
const stateList2 = ['正常', '禁购', '禁售', '封禁']
const colorList = ['green', 'orange', 'orange', 'red', 'gray']
const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 10,
    },
  },
};

const accountManage = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [finalDataSource, setFinalDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [managerData, setManagerData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/users?state_gte=5`) // 不包含超级管理员的话http://localhost:5000/users?state_gte=5&state_ne=6
    setManagerData(res.data)
  }, [])

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleOk = async () => {
    // if validated
    try {
      const values = await form.validateFields(); // 调用Form的validateFields方法来验证并获取表单字段的值
      axios.get(`http://localhost:5000/users?username=${values.username}`).then(res => {
        if (res.data.length !== 0) {
          message.info('用户名重复！')
        } else {
          // console.log(values.touxiang)
          const nowTime = Date.now()
          axios.post('http://localhost:5000/users', {
            "username": values.username,
            "state": 5, // 0 for normal, 1 for sell banned, 2 for buy banned, 3 for user banned // 7 for banned manager
            "password": values.password,
            "argueNum": 0,
            "auditNum": 0,
            "registerTime": nowTime,
          }).then(res => {
            message.info('注册成功！'); // 静态方法 // https://ant-design.antgroup.com/components/notification-cn#notification-demo-basic
          })
          setManagerData([...managerData, { username: values.username, state: 5, argueNum: 0, registerTime: nowTime }])
          setIsModalOpen(false)
          form.resetFields()
        }
      })
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  }
  const onChange = async (handlingId, handlingState) => {
    // console.log(`switch to ${checked}`, id);
    await axios.patch(`http://localhost:5000/users/${handlingId}`, {
      state: handlingState === 5 ? 7 : 5,
    })
    setManagerData(managerData.map(obj => {
      if (obj.id === handlingId) {
        return { ...obj, state: handlingState === 5 ? 7 : 5 };
      }
      return obj;
    }));
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (_, { id, username }) => (
        <a href={`/homepages/${id}`}>{username}</a>
      )
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.registerTime - b.registerTime,
      render: (_, { registerTime }) => (
        <div>
          {moment(registerTime).format('YY/MM/DD HH:mm:ss')}
        </div>
      )
    },
    {
      title: '发布审查件数',
      dataIndex: 'auditNum',
      key: 'auditNum',
      render: (_, { auditNum }) => (
        <span>{auditNum}</span>
      )
    },
    {
      title: '申诉仲裁件数',
      dataIndex: 'argueNum',
      key: 'argueNum',
      render: (_, { argueNum }) => (
        <span>{argueNum}</span>
      )
    },
    {
      title: '权限操作',
      dataIndex: 'state',
      key: 'action',
      render: (_, { state, id }) => (
        state === 6 ? <Switch disabled={true} defaultChecked /> : <Switch checked={state === 5 ? true : false} onChange={() => onChange(id, state)} />
      ),
    },
  ];

  return (
    <div>
      <Button
        style={{ float: "right", margin: "5px" }}
        onClick={() => setIsModalOpen(true)}
        type="primary"
      >
        添加
      </Button>
      <Table dataSource={managerData} columns={columns} rowKey="id" />
      <Modal
        title="添加管理员"
        open={isModalOpen}
        closeIcon={false}
        footer={[ // footer
          <Button key='back' onClick={handleCancel}>取消</Button>,
          <Button key='submit' type="primary" onClick={handleOk}>创建</Button>,
        ]}
      >
        <p>请注册新管理员信息：</p>
        <Form
          form={form}
          {...formItemLayout}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="username"
            label="管理员名称"
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
        </Form>
      </Modal>
    </div>
  );
};

export default accountManage;

// 用户名排序
// 头像未更新
// 权限操作更改