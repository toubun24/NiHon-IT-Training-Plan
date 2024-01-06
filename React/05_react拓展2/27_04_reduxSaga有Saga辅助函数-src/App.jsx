import React, { Component } from 'react'
import store from './redux/store'

export default class App extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          if (store.getState().list.length === 0) {
            store.dispatch({
              type: 'add1'
            })
          } else {
            console.log('缓存', store.getState().list)
          }
        }}>
          ASYNC1
        </button>
        <button onClick={() => {
          if (store.getState().list2.length === 0) {
            store.dispatch({
              type: 'add2'
            })
          } else {
            console.log('缓存', store.getState().list2)
          }
        }}>
          ASYNC2
        </button>
      </div>
    )
  }
}