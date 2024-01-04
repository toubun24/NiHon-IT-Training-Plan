// import React, { Component } from 'react'
import React, { useState, useRef } from 'react'

// interface IState { text: string, list: string[] }

// class App extends Component<any,IState> {
const App = () => {
    // state = { text: '', list: [] }
    const [list, setList] = useState<string[]>([])
    // myref = React.createRef<HTMLInputElement>()
    const myref = useRef<HTMLInputElement>(null)
    // render() {
        return (
            <div>
                {/* <input type="text" ref={this.myref} /> */}
                <input type="text" ref={myref}/> {/* this.myref => myref */}
                <button onClick={() => {
                    // this.setState({ list: [...this.state.list, (this.myref.current as HTMLInputElement).value] });
                    setList([...list, (myref.current as HTMLInputElement).value]); // ';' expected
                    // (this.myref.current as HTMLInputElement).value = ''
                    (myref.current as HTMLInputElement).value = '' // this.myref => myref
                }}>Add</button>
                <ul>
                    {
                        // this.state.list.map((item, index) => <li key={index}>{item}
                        list.map((item,index) => { return <li key={index}>{item}
                            <button onClick={() => {
                            const newlist = [...list]
                            newlist.splice(index, 1)
                            // this.setState({ list: newlist })
                            setList([...newlist])
                        }}>Delete</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    // }
}

export default App