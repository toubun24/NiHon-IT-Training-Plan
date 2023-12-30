import React, { Component } from 'react'
// import Count from './components/Count'
import Count from './containers/Count' // containers
import store from './redux/store' // store

export default class App extends Component {
  render() {
    return (
      <div>
          <Count store={store}/> {/* store */}
      </div>
    )
  }
}
