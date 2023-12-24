import React, { Component } from 'react'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'
import About from './pages/About'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom' // NavLink

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
                            {/*</div>Link to="/about">About</Link>*/}
                            {/*<NavLink className={({ isActive }) => "list-group-item" + (isActive ? " light" : "")} to="/about" >About</NavLink>*/}
                            <MyNavLink to="/about">About</MyNavLink>
                            {/*<br />*/} {/*无需换行了*/}
                            {/*<Link to="/home">Home</Link>*/}
                            {/*<NavLink className={({ isActive }) => "list-group-item" + (isActive ? " light" : "")} to="/home" >Home</NavLink>*/}
                            <MyNavLink to="/home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Routes>
                                    <Route path='/about' element={<About />} />
                                    <Route path='/home' element={<Home />} />
                                    <Route path='/home' element={<Home />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
