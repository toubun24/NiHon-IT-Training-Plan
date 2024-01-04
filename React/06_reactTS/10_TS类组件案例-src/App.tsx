import React, { Component } from 'react'

interface IProp {
    title: string
    callback: () => void
}
class App extends Component {
    state = {
        isShow: true
    }
    render() {
        return (
            <div>
                <Navbar title='首页' callback={() => { this.setState({ isShow: !this.state.isShow }) }}></Navbar>
                {this.state.isShow && <Sidebar></Sidebar>} {/* 显示与否 */}
            </div>
        );
    }
}
class Navbar extends Component<IProp, any> {
    render() {
        return <div>
            Navbar-{this.props.title}
            <button onClick={() => this.props.callback()}>Show</button>
        </div>
    }
}
class Sidebar extends Component {
    render() {
        return <div>
            Sidebar
        </div>
    }
}

export default App