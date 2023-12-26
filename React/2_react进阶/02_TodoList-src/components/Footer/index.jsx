import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
  handleCheckAll = (event) => { // event // 函数在render前
    this.props.checkAllTodo(event.target.checked)
  }
  handleClearAllDone = () => { // 此处不涉及数据变动，不要return包裹
    if (window.confirm('确定清除已完成任务吗？')) { // window.confirm删除确认
      this.props.clearAllDone() // ()
    }
  }
  render() {
    const { todos, clearAllDone } = this.props
    const total = todos.length // length计算stateObj总数
    const doneCount = todos.reduce((pre, todo) => { // reduce计算符合特定条件的累计值
      return pre + (todo.done ? 1 : 0)
    }, 0)
    return (
      <div classname="footer_body"> {/*classname*/}
        <input type="checkbox" checked={doneCount === total && total !== 0 ? true : false} onChange={this.handleCheckAll} />全选&nbsp;&nbsp; {/*&nbsp;*/} {/*checked确保Item被全选后此处能自动勾选并考虑了无Item的例外情况*/}
        <span>已完成{doneCount}/全部{total}</span>
        <button onClick={this.handleClearAllDone}>清除已完成任务</button>
      </div>
    )
  }
}
