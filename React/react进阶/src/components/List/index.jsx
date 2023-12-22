import React, { Component } from 'react'
import './index.css'
import Item from '../Item' // ../Item

export default class List extends Component {

  render() {
    const {todos} = this.props // props => state, function
    return (
      <div>
        List
        { // {}
          todos.map(todo => { // todo
            return <Item key = {todo.id} {...todo}/> // key
          })
        }
      </div>
    )
  }
}
