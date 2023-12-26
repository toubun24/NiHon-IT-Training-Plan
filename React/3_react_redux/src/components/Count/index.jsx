import React, { Component } from 'react'

export default class Count extends Component {
    state = { count: 0 } // state
    increment = () => { // function
        const { count } = this.state
        const { selectNumber: { value } } = this // selectNumber // this
        this.setState({ count: count + value * 1 })
    }
    decrement = () => {
        const { count } = this.state
        const { selectNumber: { value } } = this
        this.setState({ count: count - value * 1 })
    }
    incrementIfOdd = () => {
        const { count } = this.state
        const { selectNumber: { value } } = this
        if (count % 2 !== 0) {
            this.setState({ count: count + value * 1 })
        }
    }
    incrementAsync = () => {
        const { count } = this.state
        const { selectNumber: { value } } = this
        setTimeout(() => {
            this.setState({ count: count + value * 1 })
        }, 500)
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
                <select ref={c => this.selectNumber = c}> {/* selectNumber */}
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
