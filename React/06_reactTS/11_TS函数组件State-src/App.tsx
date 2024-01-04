// import React, { Component } from 'react'
import React, { useState } from 'react'

// interface IState { name: string }

// export default class App extends Component<any, IState> {
const App = () => {
    // state = { name: 'aaa' }
    const [name, setname] = useState<string>('aaa') // interface
    // render() {
        return (
            <div>
                {/* {this.state.name.substring(0, 1).toUpperCase() + this.state.name.substring(1)} */}
                {name.substring(0, 1).toUpperCase() + name.substring(1)}  {/* this.state.name => name */}
                {/* <button onClick={() => this.setState({ name: 'bbb' })}>Change-Name</button> */}
                <button onClick={() => setname('bbb')}>Change-Name</button> {/* this.setState => setname */}
            </div>
        );
    // }
}

export default App // export default