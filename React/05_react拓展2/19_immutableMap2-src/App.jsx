import React, { Component } from 'react'
import { Map } from 'immutable'

/*
const obj = { name: 'aaa', arr: [1, 2, 3] }
const obj1 = Map(obj)
const newobj = obj1.set('name', 'bbb')
console.log(obj1, newobj)
console.log(obj1.get('name'), newobj.get('name'))
console.log(obj1.toJS('name'), newobj.toJS('name'))
*/

export default class App extends Component {
  state = {
    // info: {
    info: Map({
      name: 'aaa',
      age: 100, // ,
      filter: Map({ // filter: Map
        text: '',
        up: true,
        down: false
      })
    }) // }
  }
  componentDidMount() { // componentDidMount
    console.log(this.state.info.get('filter')) // output: Map {size: 3, _root: ArrayMapNode, __ownerID: undefined, __hash: undefined, __altered: false}
  }
  componentDidUpdate(prevProps, prevState, snapshot) { // componentDidUpdate
    console.log('parent-componentDidUpdate') // output: parent-componentDidUpdate
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          // const oldinfo = Map(this.state.info)
          // const newinfo = oldinfo.set('name', 'bbb').set('age', 18)
          // this.setState({ info: newinfo.toJS() })
          this.setState({ info: this.state.info.set('name', 'bbb') })
        }}>click</button>
        {/* this.state.info.name */}
        {this.state.info.get('name')}
        ---
        {/* this.state.info.age */}
        <Child filter={this.state.info.get('filter')} />
      </div>
    )
  }
}

class Child extends Component { // Child
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.filter === nextProps.filter) {
      return false
    }
    return true
  }
  render() {
    return (
      <div>
        Child
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Child-componentDidUpdate') // no output
  }
}