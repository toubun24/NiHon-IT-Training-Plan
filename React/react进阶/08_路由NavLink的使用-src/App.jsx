import React, { Component } from 'react';
import { NavLink,Route,Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';
export default class App extends Component {

  render() {
    return (
      <div>
      <div className="row">
          <Header></Header>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* <a className="list-group-item active" href="./about.html">About</a>
            <a className="list-group-item" href="./home.html">Home</a> */}
            <NavLink className={({isActive}) => "list-group-item" + (isActive ? " light" : "")} to="/about" >About</NavLink>
            <NavLink className={({isActive}) => "list-group-item" + (isActive ? " light" : '')} to='/home' >Home</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              <Routes>
                  <Route path='/about' element={<About/>} />
                  <Route path='/home' element={<Home/>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
