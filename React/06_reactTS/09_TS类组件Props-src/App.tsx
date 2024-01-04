import React, { Component } from 'react'

interface IProp {
    name: string
}
class Prop extends Component {
    render() {
        return (
            <div>
                <Child name='aaa'></Child>
            </div>
        )
    }
}
class Child extends Component<IProp, any> { // interface IProp
    render() {
        return <div>
            Child-{this.props.name}
        </div>
    }
}

export default Prop