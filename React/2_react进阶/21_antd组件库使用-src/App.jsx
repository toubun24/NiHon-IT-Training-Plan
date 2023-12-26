// https://ant-design.antgroup.com/components/overview-cn/
// yarn add antd
// npm install antd --save

import React, { Component } from 'react'
import { Button } from 'antd'
import {WechatOutlined,WeiboCircleOutlined} from '@ant-design/icons'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

export default class App extends Component {
  render() {
    return (
        <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <br />
        <WechatOutlined />
        <WeiboCircleOutlined />
        <DatePicker />
        <RangePicker />
    </div>
    )
  }
}
