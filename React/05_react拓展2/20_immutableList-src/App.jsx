import React, { Component } from 'react'
import { List } from "immutable"; // List

const arr = List([1, 2, 3]) // (3) [1, 2, 3]
const arr1 = arr.push(4) // (4) [1, 2, 3, 4]
const arr2 = arr1.shift(0) // (3) [2, 3, 4]
const arr3 = arr2.concat(5, 6, 7) // (6) [2, 3, 4, 5, 6, 7]
console.log(arr.toJS(), arr1.toJS(), arr2.toJS(), arr3.toJS())

export default class App extends Component {
  state = {
    favorite: List(['aaa', 'bbb', 'ccc']) // List
  }
  render() {
    return (
      <div>
        {this.state.favorite.map(item => <li key={item}>{item}</li>)}
      </div>
    )
  }
}
