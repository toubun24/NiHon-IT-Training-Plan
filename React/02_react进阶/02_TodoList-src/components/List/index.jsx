import React, { Component } from 'react'
import './index.css'
import Item from '../Item' // ../Item
import PropTypes from 'prop-types'

export default class List extends Component {
  static propTypes = {
    todos:PropTypes.array.isRequired,
    updateTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired
  }
  render() {
    const {todos, updateTodo, deleteTodo} = this.props // props => state, function // app function updateTodo to Item // deleteTodo
    return (
      <ul> {/*list => ul*/}
        { // {}
          todos.map(todo => { // todo
            return <Item key = {todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo} {...todo} /> // key // 无需this.传函数 // {...todo}位置不影响
          })
        }
      </ul>
    )
  }
}
