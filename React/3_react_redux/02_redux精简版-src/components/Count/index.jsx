// npm install redux react-redux

import React, { Component } from 'react'
import store from '../../redux/store'

export default class Count extends Component {
    // state = { count: 0 } // initcount
    increment = () => {
        // const { count } = this.state
        const { selectNumber: { value } } = this
        // this.setState({ count: count + value * 1 })
        store.dispatch({ type: 'increment', data: value * 1 }) // {type,data} = action
    }
    decrement = () => {
        // const { count } = this.state
        const { selectNumber: { value } } = this
        // this.setState({ count: count - value * 1 })
        store.dispatch({ type: 'decrement', data: value * 1 })
    }
    incrementIfOdd = () => {
        // const { count } = this.state
        const { selectNumber: { value } } = this
        const count = store.getState() // getState
        if (count % 2 !== 0) { // count
            // this.setState({ count: count + value * 1 })
            store.dispatch({ type: 'increment', data: value * 1 }) // increment
        }
    }
    incrementAsync = () => {
        // const { count } = this.state
        const { selectNumber: { value } } = this
        setTimeout(() => {
            // this.setState({ count: count + value * 1 })
            store.dispatch({ type: 'increment', data: value * 1 }) // increment
        }, 500)
    }
    render() {
        return (
            <div>
                {/* <h1>当前求和为：{this.state.count}</h1> */}
                <h1>当前求和为：{store.getState()}</h1> {/* store.getState() */}
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                &nbsp;
                <button onClick={this.increment}>+</button>
                &nbsp;
                <button onClick={this.decrement}>-</button>
                &nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数时加</button>
                &nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
                &nbsp;
            </div>
        )
    }
}
