import React, { Component } from 'react'

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

const Child = (props) => {
    console.log("Child执行") // 点击任意按钮修改任意组件(即使组件已修改完成并不再变化)都会触发输出
    return (
        <div>
            {props.title}
        </div>
    )
}

export default App