// import React, { Component } from 'react'
import React from 'react'

interface IProp {
    name: string
}
// class App extends Component {
const App = () => {
    // render() {
        return (
            <div>
                <Child name='aaa'></Child>
            </div>
        )
    // }
}
// class Child extends Component<IProp, any> {
const Child:React.FC<IProp> = (props) => {
    // render() {
        return <div>
            {/* Child-{this.props.name} */}
            Child-{props.name}
        </div>
    // }
}

export default App