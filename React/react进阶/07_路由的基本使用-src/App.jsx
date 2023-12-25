import React, { Component } from 'react'
import About from './components/About'
import Home from './components/Home'
import { Link, Routes, Route } from 'react-router-dom' // react-router-dom

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>React Router Demo</h1>
                <hr /> {/*横线*/}
                <div className="col-xs-2 col-xs-offset-2"> {/*2列*/}
                    <div className="list-group"> {/*list-group*/}
                        <Link className="list-group-item" to="/about">About</Link> {/*className="list-group-item"*/}
                        {/*<br/> {/*换行*/}
                        <Link className="list-group-item" to="/home">Home</Link>
                    </div>
                </div>
                <div className="col-xs-6"> {/*col-xs-6*/}
                    <div className="panel"> {/*panel*/}
                        <div className="panel-body">
                            <Routes> {/*Routes包裹Route*/}
                                <Route path='/about' element={<About />} />
                                <Route path='/home' element={<Home />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
