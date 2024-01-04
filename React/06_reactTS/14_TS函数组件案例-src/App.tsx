// import React, { Component } from 'react'
import React, { useState } from 'react'

interface IProp {
    title: string
    callback: () => void
}
// class App extends Component {
const App = () => {
    // state = { isShow: true }
    const [isShow, setIsShow] = useState(true)
    // render() {
        return (
            <div>
                {/* <Navbar title='首页' callback={() => { this.setState({ isShow: !this.state.isShow }) }}></Navbar> */}
                <Navbar title='首页' callback={() => { setIsShow(!isShow) }} /> {/* title='首页' */}
                {/* {this.state.isShow && <Sidebar></Sidebar>} */}
                {isShow && <Sidebar />}
            </div>
        );
    // }
}
// class Navbar extends Component<IProp, any> {
const Navbar = (props: IProp) => {
    // render() {
        return <div>
            {/* Navbar-{this.props.title} */}
            Navbar-{props.title}
            {/* <button onClick={() => this.props.callback()}>Show</button> */}
            <button onClick={() => { props.callback() }}>isShow</button>
        </div>
    // }
}
// class Sidebar extends Component {
const Sidebar = () => {
    // render() {
        return <div>
            Sidebar
        </div>
    // }
}

export default App