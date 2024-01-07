import React, { Component, forwardRef } from 'react' // , forwardRef

class App extends Component {
    // mytext = null
    myref = React.createRef() // createRef
    render() {
        return (
            <div>
                <button onClick={() => {
                    // this.mytext.current.value = ''
                    this.myref.current.value = '' // myref
                    // this.mytext.current.focus()
                    this.myref.current.focus() // myref
                }}>CLICK</button>
                {/* <Child callback={(ref) => this.mytext = ref}></Child> */}
                <Child ref={this.myref} /> {/* ref */}
            </div>
        )
    }
}

// class Child extends Component {
const Child = forwardRef((props,ref) => {
    /*
    myref = React.createRef()
    componentDidMount() {
        this.props.callback(this.myref)
    }
    */
    // render() {
        return (
            <div>
                CHILD
                {/* <input type="text" defaultValue="22222" ref={this.myref} /> */}
                <input type="text" defaultValue="22222" ref={ref} />
            </div>
        )
    // }
// }
})

export default App