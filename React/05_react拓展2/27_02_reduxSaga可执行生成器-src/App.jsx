import React, { Component } from 'react'

// yield异步操作，被包装成promise对象
function getdata1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data1'), 1000)
  })
}
function getdata2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data2'), 1000)
  })
}
function getdata3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data3'), 1000)
  })
}
// generator函数
function* get() {
  const d1 = yield getdata1() // getdata1
  console.log(d1)
  const d2 = yield getdata2(d1) // getdata2
  console.log(d2)
  const d3 = yield getdata3(d2) // getdata3
  console.log(d3)
}
// 自动执行器
function run(fn) {
  const run = fn()
  function next(res) {
    const result = run.next(res)
    if (result.done) {
      return result.value
    }
    result.value.then(result => next(result))
  }
  next()
}
run(get) // get

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}
