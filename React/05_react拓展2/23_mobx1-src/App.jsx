// npm install mobx --save
// [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed

import React, { Component } from 'react'
import { observable, autorun } from 'mobx' // mobx

//---------------------------------------
const obj = observable.box(10)
autorun(() => console.log(obj.get())) // 1. 10
setTimeout(() => {
  obj.set(20) // 4. 20
  name.set("aaa") // 5. aaa
}, 1000)
//---------------------------------------
const name = observable.box("bbb")
autorun(() => console.log(name.get())) // 2. bbb
setTimeout(() => name.set("ccc"), 2000) // 6. ccc
//---------------------------------------
const map = observable.map({ name: 'ddd', age: 100 })
autorun(() => console.log(map.get('name'))) // 3. ddd
setTimeout(() => map.set("name", "eee"), 3000) // 7. eee

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}
