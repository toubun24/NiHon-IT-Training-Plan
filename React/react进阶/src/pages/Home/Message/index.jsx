import React, { Component } from 'react'
import Detail from './Detail' // Detail
import { Link, Route, Routes } from 'react-router-dom' // react-router-dom

export default class Message extends Component {
  state = { // state // {}
    MessageArr: [
      { id: "01", title: 'title1' },
      { id: "02", title: 'title2' },
      { id: "03", title: 'title3' }
    ]
  }
  render() {
    const { MessageArr } = this.state // const state
    return (
      <div>
        <ul>
          { // {}
            MessageArr.map((MessageObj) => { // map
              return (
                <li key={MessageObj.id}>
                  <Link to={`detail/${MessageObj.id}/${MessageObj.title}`}>{MessageObj.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <Routes>
          <Route path='detail/:id/:title' element={<Detail />} /> {/* 接收由Link传递过来的id和title数据 */}
        </Routes>
      </div>
    )
  }
}
