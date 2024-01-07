import React, { Component } from 'react'

class App extends Component {
    mytext = null
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.mytext.current.value = ''
                    this.mytext.current.focus()
                }}>CLICK</button>
                <Child callback={(ref) => this.mytext = ref}></Child> {/* callback */}
            </div>
        )
    }
}

class Child extends Component {
    myref = React.createRef() // createRef
    componentDidMount() { // componentDidMount
        this.props.callback(this.myref) // callback
    }
    render() {
        return (
            <div>
                CHILD
                <input type="text" defaultValue="11111" ref={this.myref} />
            </div>
        )
    }
}

export default App