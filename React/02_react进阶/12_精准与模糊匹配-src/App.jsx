import React, { Component } from 'react'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'
import About from './pages/About'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'

// V6版本默认开启精准匹配

export default class App extends Component {
    render() {
        return (
            <div><div className="row">
                <Header />
            </div>
                <hr />
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink to="/about">About</MyNavLink>
                            <MyNavLink to="/home/a/b/c/d">Home</MyNavLink> {/*"/home/a/b/c/d"*/}
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Routes>
                                    <Route path='/about' element={<About />} />
                                    <Route path='/home/*' element={<Home />} /> {/*'/home/*'*/}
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
