import React, { Component } from 'react'
import './index.css'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
  handleKeyUp = (event) => {
    const { keyCode, target } = event
    if (keyCode !== 13) return // 回车
    if (target.value.trim() === '') {
      alert('输入不能为空')
      return
    }
    const todoObj = { id: nanoid(), name: target.value, done: false }
    this.props.addTodo(todoObj) // 调用父组件函数，对父组件state传值
    target.value = '' // 清空
  }
  render() {
    return (
      <div className="divHeader"> {/*NNN*/}
        <input type="text" onKeyUp={this.handleKeyUp} placeholder='请输入你的任务名称，按回车键确认' /> {/*placeholder*/} {/*onKeyUp*/}
      </div>
    )
  }
}
