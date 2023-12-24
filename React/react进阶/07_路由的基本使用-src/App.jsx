import React, { Component } from 'react'
import About from './components/About'
import Home from './components/Home'
import { Link, Routes, Route } from 'react-router-dom' // react-router-dom

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>React Router Demo</h1>
                <hr/> {/*横线*/}
                <Link to="/about">About</Link>
                <br/> {/*换行*/}
                <Link to="/home">Home</Link>
                <Routes> {/*Routes包裹Route*/}
                    <Route path='/about' element={<About />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </div>
        )
    }
}
