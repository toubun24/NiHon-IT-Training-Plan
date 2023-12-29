import React, { Component } from 'react'

export default class Demo extends Component {
    state = { count: 0 } // state
    add1 = () => {
        const { count } = this.state
        this.setState({ // React状态更新是异步的
            count: count + 1
        // })
        }, () => {
            console.log('case 2: ', this.state.count)
        })
        console.log('case 1: ', this.state.count)
    }
    add2 = () => {
        this.setState((state) => ({ count: state.count + 1 })) // 函数式setState
        console.log('case 3: ', this.state.count)
    }
    render() {
        return (
            <div>
                <h2>当前和为：{this.state.count}</h2> {/* 直接{this.state.count} */}
                <button onClick={this.add1}>对象式state+1</button>
                <button onClick={this.add2}>函数式state+1</button>
            </div>
        )
    }
}
