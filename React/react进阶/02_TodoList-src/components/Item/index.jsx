import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
  state = { mouse: false } // 鼠标移入状态
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag })
    }
  }
  handleCheck = (id) => {
    return (event) => { // 如果不传event.target.checked的话这里就不用高阶函数了
      this.props.updateTodo(id, event.target.checked) // event.target.checked获取复选框状态
    }
  }
  handleDelete = (id) => {
    return () => { // return () => {}
      if (window.confirm('确定删除吗？')) { // window.confirm删除确认
        this.props.deleteTodo(id)
      }
    }
  }
  render() {
    const { id, name, done } = this.props // props
    const { mouse } = this.state // {}
    return (
      <div>
        <li onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} style={{ backgroundColor: this.state.mouse ? '#ddd' : 'white' }} > {/*鼠标移入后整行背景色变深*/}
          <label>
            <input type="checkbox" checked={done} onChange={this.handleCheck(id)} /> {/*<input type="checkbox"/>*/} {/*defaultChecked & checked*/}
            <span>{name}</span>
          </label>
          <button className="buttonItem" style={{ display: mouse ? 'inline' : 'none' }} onClick={this.handleDelete(id)}>删除</button> {/*类内定义的函数调用时前缀this.*/}
        </li>
      </div>
    )
  }
}
