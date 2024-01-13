import { forwardRef } from 'react' // forwardRef: 父组件需要得到子组件元素 // {}{}{}
import { Table, Button, Modal, Switch, Form, Input, Select } from 'antd'; // Switch, Form, Input, Select
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyForm = forwardRef(({ region, role }, ref) => { // ({}) // (props, ref)
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
        rules={[
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
            }
          })}
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
            }
          })}
        /></Form.Item>
    </Form>
  )
});

export default MyForm;