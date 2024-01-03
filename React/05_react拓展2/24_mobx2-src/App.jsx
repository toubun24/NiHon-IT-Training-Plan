import React, { Component } from 'react'
import { autorun } from 'mobx' // autorun
import store from './store'

export default class App extends Component {
  state = { // state
    count: store.count
  }
  componentDidMount() {
    autorun(() => {
      this.setState({ count: store.count });
    })
  }
  render() {
    return (
      <div>
        <h2>当前和为:{this.state.count}</h2>
        <button onClick={() => store.add()}>+1</button>
        <button onClick={() => store.minus()}>-1</button>
        <button onClick={() => store.addof()}>奇数+</button>
        <button onClick={() => store.asyncAdd()}>异步+</button>
      </div>
    )
  }
}
