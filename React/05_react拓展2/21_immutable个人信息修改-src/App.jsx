import React, { Component } from 'react'
import { Map, List } from "immutable" // immutable

export default class App extends Component {
  state = {
    info: Map({
      name: 'xiaoming',
      location: Map({
        provinces: "beijing",
        city: 'beijing'
      }),
      favorite: List(["读书", "看报", "写作业"])
    })
  }
  render() {
    return (
      <div>
        <h1>个人信息修改</h1>

        <button onClick={
          () => {
            return this.setState({
              info: this.state.info.set("name", "laowang").set("location", this.state.info.get("location").set("provinces", "shanghai").set("city", "shanghai")) // get & set
            })
          }
        }>change</button>

        {this.state.info.get('name')}
        <br />
        {this.state.info.get('location').get('provinces')}
        -
        {this.state.info.get('location').get('city')}

        {
          this.state.info.get('favorite').map((item, index) =>
            <li key={index}>
              {item}

              <button onClick={
                () => {
                  this.setState({
                    info: this.state.info.set('favorite', this.state.info.get('favorite').splice(index, 1)) // splice(index, 1)将某个值从数组里面删除 // Property 'splice' may not exist on type 'string | Map<string, string> | List<string>'
                  })
                }
              }>del</button>

            </li>
          )
        }

      </div>
    )
  }
}