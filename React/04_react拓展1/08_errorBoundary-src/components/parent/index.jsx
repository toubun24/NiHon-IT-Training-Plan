import React, { Component } from 'react'
import Child from '../child'

export default class Parent extends Component {
    state = { Err: '' }
    static getDerivedStateFromError(error) { // getDerivedStateFromError配置子组件出错时的处理函数
        console.log(error)
        return { Err: error }
    }
    componentDidCatch(){ // componentDidCatch统计错误次数
        console.log('渲染组件出错')
    }
    render() {
        return (
            <div>
                <h2>Parent</h2>
                {this.state.Err ? <h3>当前网络错误，稍后再试</h3> : <Child/>} {/* 通过判断hasError值，来指定是否显示子组件 */}
            </div>
        )
    }
}
