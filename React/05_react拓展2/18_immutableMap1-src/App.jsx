import React, { Component } from 'react'
import { Map } from 'immutable' // immutable

const obj = { name: 'aaa', arr: [1, 2, 3] }
const obj1 = Map(obj) // Map
const newobj = obj1.set('name', 'bbb')
console.log(obj1, newobj)
console.log(obj1.get('name'), newobj.get('name')) // aaa bbb
console.log(obj1.toJS('name'), newobj.toJS('name')) // aaa bbb

export default class App extends Component {
  state = {
    info: {
      name: 'aaa',
      age: 100
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          const oldinfo = Map(this.state.info) // Map
          const newinfo = oldinfo.set('name', 'bbb').set('age', 18)
          this.setState({ info: newinfo.toJS() })
        }}>click</button>
        {this.state.info.name}---
        {this.state.info.age}
      </div>
    )
  }
}
// aaa---100 => bbb---18