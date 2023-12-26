import React, {Component} from 'react'
import reactDom from 'react-dom'
import Hello from './components/Hello'
import ReactTest from './components/ReactTest'

export default class App extends Component{
    render(){
        return(
            <div>
                <Hello/>
                <ReactTest/>
            </div>
        )
    }
}