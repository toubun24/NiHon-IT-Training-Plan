import React, { Component } from 'react'
import { memo } from 'react' // memo

class App extends Component {
    state = {
        name: 'aaa',
        title: 'Child'
    }
    render() {
        return (
            <div>
                {this.state.name}
                <button onClick={() => {
                    this.setState({ name: 'bbb' })
                }}>改变名称</button>
                <button onClick={() => {
                    this.setState({ title: 'Child-111' })
                }}>改变子组件</button>
                <Child title={this.state.title} />
            </div>
        )
    }
}

// const Child = (props) => {
const Child = memo((props) => {
    console.log("Child执行") // 除初始化输出一次外，只在第一次"改变子组件"时输出一次
    return (
        <div>
            {props.title}
        </div>
    )
// }
})

export default App