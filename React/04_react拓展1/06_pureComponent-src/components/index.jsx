// import React, { Component } from 'react'
import React, { PureComponent  } from 'react' // PureComponent

// export default class A extends Component {
export default class A extends PureComponent { // PureComponent
    // state = { carName: '奔驰' }
    state = { carName: '奔驰', student: ['小王', '小李', '小红'] }
    changeCar = () => {
        this.setState({ carName: '奥迪' })
    }
    addStudent = () => { // addStudent
        const { student } = this.state // student. 不能重命名
        this.setState({ student: ['小刘', ...student] })
    }
    render() {
        console.log('A---render');
        return (
            <div style={{ backgroundColor: "pink", padding: "8px" }}>
                <div>我是A组件</div>
                <div>现在的学生有：{this.state.student}</div>
                <div>汽车现在的名字是：{this.state.carName}</div> {/* this.state.carName或先解构 */}
                <button onClick={this.changeCar}>换车</button>
                <button onClick={this.addStudent}>点击添加小刘</button>
                <B carName={this.state.carName} />
            </div>
        )
    }
}

// class B extends Component { // export default
class B extends PureComponent { // PureComponent
    /*
    componentWillReceiveProps(props) {
        console.log('B---componentWillReceiveProps', props);
    }
    shouldComponentUpdate() {
        console.log('B---shouldComponentUpdate');
        return true
    }
    componentWillUpdate() {
        console.log('B---componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('B---componentDidUpdate');
    }
    */
    render() {
        console.log('B---render');
        return (
            <div style={{ backgroundColor: "yellow", padding: "8px" }}>我是B组件，接收到的车是:{this.props.carName}</div>
        )
    }
}