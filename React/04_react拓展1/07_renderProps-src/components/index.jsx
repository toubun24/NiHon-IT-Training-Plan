import React, { Component } from 'react'

export default class Parent extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "pink", padding: "8px" }}>
                <h2>Component Parent</h2>
                <A render={(name) => <B name={name} />} /> {/* 在A组件中预留出B组件渲染的位置 */}
            </div>
        )
    }
}

class A extends Component {
    state = { name: 'tom' } // state
    render() {
        return (
            <div style={{ backgroundColor: "skyblue", padding: "8px" }}>
                <h2>Component A</h2>
                {this.props.render(this.state.name)} {/* this.props.render */}
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "yellow", padding: "8px" }}>
                <h2>Component B: {this.props.name}</h2> {/* this.props */}
            </div>
        )
    }
}