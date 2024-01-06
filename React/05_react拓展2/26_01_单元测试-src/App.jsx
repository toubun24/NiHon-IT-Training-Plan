import React, { Component } from 'react'

export default class App extends Component {
  state = {
    text: '',
    list: ['1', '2', '3', '4', '5']
  }
  render() {
    return (
      <div>
        <h2>ToDoList</h2>
        <input type="text" onChange={(event) => {
          this.setState({ text: event.target.value })
        }} />
        <button onClick={() => {
          this.setState({ list: [...this.state.list, this.state.text] })
        }} className='add'>Add</button>
        {
          this.state.list.map((item, index) => {
            return <li key={index}>{item}<button onClick={() => {
              const newlist = [...this.state.list]
              newlist.splice(index, 1)
              this.setState({ list: newlist })
            }
            } className='del'>Delete</button>
            </li>
          })
        }
      </div>
    )
  }
}