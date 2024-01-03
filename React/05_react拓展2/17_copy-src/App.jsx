import React, { Component } from 'react'

// copy
var obj = { name: 'aaa' }
var obj1 = obj
obj1.name = 'bbb'
console.log(obj, obj1) // 'bbb' 'bbb'

// ...copy
var myobj = { name: 'aaa', arr: [1, 2, 3] }
var myobj1 = { ...myobj }
myobj1.name = 'bbb'
myobj1.arr.splice(1, 1) // 删除（从1到1）
console.log(myobj, myobj1) // 'aaa' 'bbb' // [1, 3] [1, 3]

// json-copy
var jsonobj = { name: 'aaa', arr: [1, 2, 3], address: undefined }
var jsonobj1 = JSON.parse(JSON.stringify(jsonobj))
jsonobj1.name = 'bbb'
jsonobj1.arr.splice(1, 1)
console.log(jsonobj, jsonobj1) // 'aaa' 'bbb' // [1, 2, 3] [1, 3]

export default class App extends Component {
  render() {
    // console.log()
    return (
      <div>App</div>
    )
  }
}
