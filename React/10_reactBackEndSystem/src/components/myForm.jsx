import { forwardRef } from 'react' // forwardRef: 父组件需要得到子组件元素 // {}{}{}
import { Table, Button, Modal, Switch, Form, Input, Select } from 'antd'; // Switch, Form, Input, Select
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyForm = forwardRef(({ region, role, isActive2, isUpdate }, ref) => { // ({}) // (props, ref) // {/* isUpdate={true} 来告诉MyForm这是修改用户的场合，而不是在添加用户 */}
  const [isActive, setIsActive] = useState(false) // 超级管理员 => select区域disabled
  useEffect(() => {
    setIsActive(isActive2)
  }, [isActive2])
  const tokenContent = localStorage.getItem('token');
  const { username, region: region2, roleId } = tokenContent == '' ? { username: '', region2: '', roleId: '' } : JSON.parse(tokenContent) // JSON.parse // region: region2 重命名别名
  const roleObj = { // 映射id信息
    "1": 'superAdmin',
    "2": 'admin',
    "3": 'editor',
  }
  const checkRegion = (item) => { // disabled
    if (isUpdate) { // 修改
      if (roleObj[roleId] === 'superAdmin') {
        return false // 允许超级管理员修改区域
      } else {
        return true // 不允许非超级管理员修改区域
      }
    } else { // 添加
      if (roleObj[roleId] === 'superAdmin') {
        return false // 允许超级管理员添加区域
      } else {
        return item.value !== region2 // 不允许非超级管理员添加非所属区域
      }
    }
  }
  const checkRole = (item) => { // disabled
    if (isUpdate) { // 修改
      if (roleObj[roleId] === 'superAdmin') {
        return false // 允许超级管理员修改角色
      } else {
        return true // 不允许非超级管理员修改角色
      }
    } else { // 添加
      if (roleObj[roleId] === 'superAdmin') {
        return false // 允许超级管理员添加角色
      } else {
        return roleObj[item.id]!=='editor' // 只允许非超级管理员添加editor
      }
    }
  }

  return ( // forwardRef 透传
    <Form
      // form={form}
      layout="vertical"
      // name="form_in_modal"
      // initialValues={{ modifier: 'public', }}
      ref={ref} // 父组件useRef
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input /></Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input /></Form.Item>
      <Form.Item
        name="region"
        label="区域"
        // rules={[
        rules={[isActive ? [] : // 超级管理员 => select区域非required
          {
            required: true,
            message: '请选择区域',
          },
        ]}
      >
        <Select
          // defaultValue="lucy"
          // style={{ width: 120 }}
          // onChange={handleChange}
          // options={[{ value: 'jack', label: 'Jack' },]} // 死数据
          options={region.map(item => { // map返回数组
            return { // {}
              value: item.value, // value
              key: item.id,
              label: item.title, // 显示文字
              disabled: checkRegion(item), // 权限判断
            }
          })}
          disabled={isActive} // 超级管理员 => select区域disabled
        /></Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: '请选择角色',
          },
        ]}
      >
        <Select
          options={role.map(item => { // map返回数组
            return {
              value: item.id, // id
              key: item.id,
              label: item.roleName,
              disabled: checkRole(item), // 权限判断
            }
          })}
          onChange={(roleId) => {
            if (roleId === 1) {
              setIsActive(true) // 超级管理员 => select区域disabled
              ref.current.setFieldsValue({
                region: '' // 清空region已选内容
              })
            } else {
              setIsActive(false)
            }
          }}
        /></Form.Item>
    </Form>
  )
});

export default MyForm;