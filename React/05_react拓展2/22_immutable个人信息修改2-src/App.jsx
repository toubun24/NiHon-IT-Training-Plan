import React, { Component } from 'react'
import { fromJS } from "immutable" // Map, List

export default class App extends Component {
  state = {
    // info: Map({
    info: fromJS({ // fromJS
      name: 'xiaoming',
      // location: Map({
      location: { // Map(）
        provinces: "beijing",
        city: 'beijing'
      }, // }),
      // favorite: List(["读书", "看报", "写作业"])
      favorite: ["读书", "看报", "写作业"] // List()
    })
  }
  render() {
    return (
      <div>
        <h1>个人信息修改</h1>

        <button onClick={
          () => {
            return this.setState({
              // info: this.state.info.set("name", "laowang").set("location", this.state.info.get("location").set("provinces", "shanghai").set("city", "shanghai"))
              info: this.state.info.set("name", "laowang").setIn(["location", "provinces"], "shanghai").setIn(["location", "city"], "shanghai") // set => setIn []
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
                    // info: this.state.info.set('favorite', this.state.info.get('favorite').splice(index, 1))
                    info: this.state.info.updateIn(['favorite'],(list)=>list.splice(index,1)) // set => updateIn []
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