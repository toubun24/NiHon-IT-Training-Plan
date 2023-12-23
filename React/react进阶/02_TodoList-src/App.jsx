import React, { Component } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'
import './App.css'

export default class App extends Component {
  state = {
    todos: [
      { id: 'id1', name: '吃饭', done: false },
      { id: 'id2', name: '睡觉', done: true }
    ]
  }
  addTodo = (todoObj) => {
    const { todos } = this.state // {} // todos, 不能命名为其他
    const newTodos = [todoObj, ...todos] // 无{}
    this.setState({ todos: newTodos })
  }
  updateTodo = (id, done) => { // 只涉及id和done
    const { todos } = this.state // state整体解构
    const newTodos = todos.map(todoObj => { // map
      if (id === todoObj.id) { // === // todoObj.id
        return { ...todoObj, done } // map后return单个新的todoObj // 先展开todoObj每一项，再对done属性做覆盖
      } else {
        return todoObj
      }
    })
    this.setState({ todos: newTodos }) // ({})
  }
  deleteTodo = (id) => {
    const { todos } = this.state
    const newTodos = todos.filter(todoObj => { // filter返回一个新数组 // (todoObj)的()不影响
      return todoObj.id !== id
    })
    this.setState({ todos: newTodos })
    console.log("?")
  }
  checkAllTodo = (done) => {
    const { todos } = this.state
    const newTodos = todos.map(todoObj => {
      return { ...todoObj, done: done } // 用return+done来改变状态
    })
    this.setState({ todos: newTodos })
  }
  clearAllDone = () => {
    const { todos } = this.state
    const newtodos = todos.filter((todo) => {
      return !todo.done // done === false
    })
    this.setState({ todos: newtodos })
  }
  render() {
    const { todos } = this.state // state解构在render和return之间
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} /> {/*todos={todos}*/}
        <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
      </div>
    )
  }
}