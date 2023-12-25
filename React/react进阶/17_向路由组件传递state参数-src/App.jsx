import React, { Component } from 'react'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'
import About from './pages/About'
import Home from './pages/Home'
import { Routes, Route , Navigate } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div><div className="row">
                <Header />
            </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home/a/b/c/d">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Routes>
                                    <Route path='/about' element={<About />} />
                                    <Route path='/home/*' element={<Home />} />
                                    <Route path='*' element={<Navigate to='/about'/>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
