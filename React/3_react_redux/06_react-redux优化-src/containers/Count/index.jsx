import React, { Component } from 'react'
import { connect } from "react-redux"; // connect
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction, createIncrementOddAction } from "../../redux/count_action"; // action

// export default class Count extends Component {
class Count extends Component {
    increment = () => {
        const { selectNumber: { value } } = this
        this.props.plus(value * 1)
    }
    decrement = () => {
        const { selectNumber: { value } } = this
        this.props.minus(value * 1)
    }
    incrementIfOdd = () => {
        const { selectNumber: { value } } = this
        this.props.plusOdd(value * 1, this.props.count, 2)
    }
    incrementAsync = () => {
        const { selectNumber: { value } } = this
        this.props.plusAsync(value * 1, 500)
    }
    render() {
        console.log('UI组件接收到的props是', this.props)
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
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

export default connect(state => ({ count: state }), { // export connect
    plus: createIncrementAction,
    minus: createDecrementAction,
    plusOdd: createIncrementOddAction,
    plusAsync: createIncrementAsyncAction
})(Count) // Count