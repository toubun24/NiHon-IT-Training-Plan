// npm install react-router-dom

import React, { Component, Suspense, lazy } from 'react' // , Suspense, lazy
import { NavLink, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Loading from './pages/Loading' // Loading // 必须提前引入，不能懒加载
// import About from './pages/About'
const About = lazy(() => import('./pages/About')) // lazy
// import Home from './pages/Home'
const Home = lazy(() => import('./pages/Home')) // lazy

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
                            <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " light" : "")} to="/about" >About</NavLink>
                            <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " light" : "")} to="/home" >Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Suspense fallback={<Loading />}> {/* Suspense Loading */}
                                    <Routes>
                                        <Route path='/about' element={<About />} />
                                        <Route path='/home' element={<Home />} />
                                    </Routes>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
