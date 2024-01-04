import React, { Component } from 'react'

interface IState {
    name: string
}
// export default class App extends Component {
export default class App extends Component<any, IState> { // <any, IState>
    state = {
        name: 'aaa'
    }
    render() {
        return (
            <div>
                {this.state.name.substring(0, 1).toUpperCase() + this.state.name.substring(1)} {/* 首字母大写 */}
                <button onClick={() => this.setState({
                    name: 'bbb'
                })}>Change-Name</button>
            </div>
        );
    }
}