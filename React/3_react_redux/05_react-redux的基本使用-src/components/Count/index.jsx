import React, { Component } from 'react'
// import store from '../../redux/store'
// import { createIncrementAction, createDecrementAction, createIncrementAsyncAction, createIncrementOddAction } from '../../redux/count_action'

export default class Count extends Component {
    increment = () => {
        const { selectNumber: { value } } = this
        // store.dispatch(createIncrementAction(value * 1))
        this.props.plus(value * 1)
    }
    decrement = () => {
        const { selectNumber: { value } } = this
        // store.dispatch(createDecrementAction(value * 1))
        this.props.minus(value * 1)
    }
    incrementIfOdd = () => {
        const { selectNumber: { value } } = this
        // const count = store.getState() // this.props.count
        // store.dispatch(createIncrementOddAction(value * 1, count, 2))
        this.props.plusOdd(value * 1, this.props.count, 2) // this.props.count
    }
    incrementAsync = () => {
        const { selectNumber: { value } } = this
        // store.dispatch(createIncrementAsyncAction(value * 1, 500))
        this.props.plusAsync(value * 1, 500)
    }
    render() {
        console.log('UI组件接收到的props是', this.props) // this.props
        return (
            <div>
                {/* <h1>当前求和为：{store.getState()}</h1> */}
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
