// npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env
// ../.babelrc
// ../config-overrides.js
// npm i customize-cra react-app-rewired
// ../package.json
/*
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
*/
// =>
/*
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
},
*/
// npm install mobx-react

import React, { Component } from 'react'
// import { autorun } from 'mobx'
// import store from './store' // store
import { inject, observer } from "mobx-react" // mobx-react

@inject('store') // inject
@observer // observer
export default class App extends Component {
  /*
  state = {
    count: store.count
  }
  componentDidMount() {
    autorun(() => {
      this.setState({ count: store.count });
    })
  }
  */
  render() {
    return (
      <div>
        {/* this.state => this.props */}
        {/* <h2>当前和为:{this.state.count}</h2> */}
        <h2>当前和为:{this.props.store.count}</h2>
        {/* <button onClick={() => store.add()}>+1</button> */}
        <button onClick={() => this.props.store.add()}>+1</button>
        {/* <button onClick={() => store.minus()}>-1</button> */}
        <button onClick={() => this.props.store.minus()}>-1</button>
        {/* <button onClick={() => store.addof()}>奇数+</button> */}
        <button onClick={() => this.props.store.addof()}>奇数+</button>
        {/* <button onClick={() => store.asyncAdd()}>异步+</button> */}
        <button onClick={() => this.props.store.asyncAdd()}>异步+</button>
      </div>
    )
  }
}
