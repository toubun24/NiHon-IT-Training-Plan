import React, { Component } from 'react'

function* test() {
  console.log("111") // 1. 111
  const log1 = yield '111 return'
  console.log("222", log1) // 3. 222 aaa
  const log2 = yield '222 return'
  console.log("333", log2) // 5. 333 bbb
  const log3 = yield '333 return'
  console.log("444", log3) // 7. 444 ccc
}
const test1 = test()
const res1 = test1.next() // 1. 111
console.log('res1', res1) // 2. res1 done: false value: "111 return"
const res2 = test1.next('aaa') // 3. 222 aaa
console.log('res2', res2) // 4. res2 done: false value: "222 return"
const res3 = test1.next('bbb') // 5. 333 bbb
console.log('res3', res3) // 6. res3 done: false value: "333 return"
const res4 = test1.next('ccc') // 7. 444 ccc
console.log('res4', res4) // 8. res4 done: true value: undefined

/* ------ */

function* TEST() {
  setTimeout(() => { console.log("111-susses"); TEST1.next() }, 1000) // TEST1.next()
  yield
  setTimeout(() => { console.log("222-susses"); TEST1.next() }, 1000)
  yield
  setTimeout(() => { console.log("333-susses"); TEST1.next() }, 1000)
  yield
}
const TEST1 = TEST()
TEST1.next() // TEST1.next()

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}
