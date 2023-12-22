import React, { Component } from 'react'
import './index.css'
// import { nanoid } from 'nanoid'

export default class Item extends Component {
  render() {
    const {id, name, done} = this.props // props
    return (
      <div>
        Item
        <input type="checkbox" checked={done}/>{name} {/*<input type="checkbox"/>*/}
      </div>
    )
  }
}
