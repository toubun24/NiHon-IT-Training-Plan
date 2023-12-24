import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
    /*
    state = { // state from App to List
        users: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }
    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }
    */
    render() {
        return (
            <div>
                <Search /> {/*updateAppState={this.updateAppState}/>*/}
                <List /> {/*{...this.state}/>*/}
            </div>
        )
    }
}
