import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
    state = { // state
        users: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }
    updateAppState = (stateObj) => { // stateObj
        this.setState(stateObj) // (stateObj)
    }
    render() {
        return (
            <div>
                <Search updateAppState={this.updateAppState}/>
                <List {...this.state}/>
            </div>
        )
    }
}
