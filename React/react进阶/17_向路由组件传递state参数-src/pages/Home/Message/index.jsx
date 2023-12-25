import React, { Component } from 'react'
import Detail from './Detail'
import { Link, Route, Routes } from 'react-router-dom'

export default class Message extends Component {
  state = {
    MessageArr: [
      { id: "01", title: 'title1' },
      { id: "02", title: 'title2' },
      { id: "03", title: 'title3' }
    ]
  }
  render() {
    const { MessageArr } = this.state
    return (
      <div>
        <ul>
          {
            MessageArr.map((MessageObj) => {
              return (
                <li key={MessageObj.id}>
                  {/* <Link to={`detail/${MessageObj.id}/${MessageObj.title}`}>{MessageObj.title}</Link> */} {/* param */}
                  {/* <Link to={`detail/?id=${MessageObj.id}&title=${MessageObj.title}`}>{MessageObj.title}</Link> */} {/* search */}
                  <Link to='detail' state={{ id:MessageObj.id,title:MessageObj.title }}>{MessageObj.title}</Link> {}
                </li>
              )
            })
          }
        </ul>
        <Routes>
          {/* <Route path='detail/:id/:title' element={<Detail />} /> */} {/* param */}
          <Route path='detail' element={<Detail/>}/> {/* search/state */}
        </Routes>
      </div>
    )
  }
}
