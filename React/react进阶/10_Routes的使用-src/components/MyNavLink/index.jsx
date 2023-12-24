import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    return (
      <div>
        <NavLink className={({isActive}) => "list-group-item" + (isActive ? " light" : "")} {...this.props}/>
      </div>
    )
  }
}
