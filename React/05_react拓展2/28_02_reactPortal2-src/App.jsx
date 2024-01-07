import React, { Component } from 'react'
import Detail from './components/detail'
import './App.css'

class App extends Component {
    state = {
        isShow: false
    }
    render() {
        return (
            <div className='box' onClick={() => console.log('box clicked')}>
                <div className='left' />
                <div className='right'>
                    <button onClick={() => this.setState({ isShow: true })}>SHOW</button>
                    {
                        // this.state.isShow && <Detail />
                        this.state.isShow && <Detail onClose={() => this.setState({ isShow: false })}><h3>NOW_LOADING</h3></Detail>
                    }
                </div>
            </div>
        )
    }
}
export default App