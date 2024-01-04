import React, { Component } from 'react'

interface IState{
    text: string
    list: string[]
}
class App extends Component<any,IState> { // <约束props,约束state>
    state = {
        text:'',
        list: []
    }
    myref = React.createRef<HTMLInputElement>() // createRef // <HTMLInputElement> 泛型指令
    render()
    {
        return (
            <div>
                {/*<input type="text" value={this.state.text} onChange={(event)=>*/}
                {/*    this.setState({text: event.target.value*/}
                {/*})}/>*/}
                <input type="text" ref={this.myref} />
                {/*<button onClick={() =>{*/}
                {/*    this.setState({list:[...this.state.list,this.state.text]})*/}
                {/*    this.setState({text: ''})*/}
                {/*}}>Add</button>*/}
                <button onClick={() =>{
                    this.setState({list:[...this.state.list,(this.myref.current as HTMLInputElement).value]});
                    (this.myref.current as HTMLInputElement).value = '' // as 类型断言
                }}>Add</button>
                <ul>
                {this.state.list.map((item,index) => <li key={index}>{item}
                <button onClick={() => {
                    const newlist = [...this.state.list]
                    newlist.splice(index,1)
                    this.setState({list:newlist})
                }}>Delete</button>
                </li>)}
                </ul>
            </div>
        )
    }
}

export default App