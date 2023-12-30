// import React, { Component } from 'react'
import React, { useState, useEffect, useRef } from 'react' // useState, useEffect, useRef
import ReactDOM from 'react-dom/client' // ReactDOM // client

// export default class Demo extends Component {
function Demo() {
    /*
    constructor(props) {
        console.log('Count---constructor');
        super(props)
        this.state = { count: 0 }
    }
    */
    const [count, setCount] = useState(0) // useState
    const myRef = useRef() // useRef
    /*
    useEffect(() => { // useEffect
        let timer = setInterval(() => {
            setCount((count) => {
                return count + 1
            })
        }, 1000)
        return () => { clearInterval(timer) }
    }, [])
    */
    useEffect(() => {
        console.log('被调用了'); // componentDidMount & componentDidUpdata 
        return () => {
            console.log('被卸载了'); // componentDidUnmount
        }
    }, [count]) // componentDidUpdata 
    // add = () => {
    const add = () => {
        // const { count } = this.state
        // this.setState({ count: count + 1 })
        setCount((count) => {
            return count + 1
        })
    }
    // death = () => {
    const death = () => {
        // ReactDOM.unmountComponentAtNode(document.getElementById('root'))
        const root = ReactDOM.createRoot(document.getElementById('root'))
        root.unmount() // Warning: You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.
    }
    const show = () => {
        alert(myRef.current.value) 
        myRef.current.value = ''
    }
    /*
    force = () => {
        this.forceUpdate()
    }
    UNSAFE_componentWillMount() { // UNSAFE
        console.log('Count---UNSAFE_componentWillMount');
    }
    componentDidMount() {
        console.log('Count---componentDidMount');
    }
    componentWillUnmount() {
        console.log('Count---componentWillUnmount');
    }
    shouldComponentUpdate() {
        console.log('Count---shouldComponentUpdate');
        return true
    }
    UNSAFE_componentWillUpdate() { // UNSAFE
        console.log('Count---UNSAFE_componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('Count---componentDidUpdate');
    }
    */
    // render() {
        // console.log('Count---render');
        // const { count } = this.state
        return (
            <div>
                <h2>当前求和为：{count}</h2>
                {/* <button onClick={this.add}>点我+1</button> */}
                <button onClick={add}>点我+1</button>
                {/* <button onClick={this.death}>卸载组件</button> */}
                <button onClick={death}>卸载组件</button>
                {/* <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button> */}
                <input type="text" ref={myRef}/>
                <button onClick={show}>弹出数据</button>
            </div>
        )
    // }
}

export default Demo