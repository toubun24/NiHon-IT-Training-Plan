import React, { Component } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'
import './App.css'

export default class App extends Component {
  state = {todos:[
    {id:'id1',name:'吃饭',done:false},
    {id:'id2',name:'睡觉',done:false}
  ]}

  render() {
    const { todos } = this.state // state解构在render和return之间
    return (
      <div>
        <Header/>
        <List todos={todos}/> {/*todos={todos}*/}
        <Footer/>
      </div>
    )
  }
}