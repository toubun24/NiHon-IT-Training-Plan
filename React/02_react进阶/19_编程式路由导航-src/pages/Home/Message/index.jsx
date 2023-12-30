import React from 'react' // , { Component } // from class to function
import Detail from './Detail'
import { Link, Route, Routes, useNavigate } from 'react-router-dom' // useNavigate

//export default class Message extends Component {
  export default function Message() { // from class to function
  // state = {
    // MessageArr: [
    const MessageArr = [ // const =
      { id: "01", title: 'title1' },
      { id: "02", title: 'title2' },
      { id: "03", title: 'title3' }
    ]
  // }
  // render() {
    // const { MessageArr } = this.state
    const navigate = useNavigate() // useNavigate
    const replaceShow = (id,title) => {
      // navigate(`detail/${id}/${title}`,{replace:true}) // params
      // navigate(`detail/?id=${id}&titile=${title}`,{replace:true}) // search
      navigate(`detail`,{state:{id,title},replace:true}) // state // replace:true
    }
    const pushShow = (id,title) => {
      // navigate(`detail/${id}/${title}`) // params
      // navigate(`detail/?id=${id}&titile=${title}`) // search
      navigate(`detail`,{state:{id,title}}) // state
    }
    return (
      <div>
        <ul>
          {
            MessageArr.map((MessageObj) => {
              return (
                <li key={MessageObj.id}>
                  {/* <Link to={`detail/${MessageObj.id}/${MessageObj.title}`}>{MessageObj.title}</Link> */} {/* params */}
                  {/* <Link to={`detail/?id=${MessageObj.id}&title=${MessageObj.title}`}>{MessageObj.title}</Link> */} {/* search */}
                  {/* <Link to='detail' state={{ id:MessageObj.id,title:MessageObj.title }}>{MessageObj.title}</Link> */} {/* state */}
                  <Link to='detail' state={{ id:MessageObj.id,title:MessageObj.title }}>{MessageObj.title}</Link> {/* replace */}
                  &nbsp;
                  <button onClick={() => {pushShow(MessageObj.id,MessageObj.title)}}>push查看</button>
                  &nbsp;
                  <button onClick={() => {replaceShow(MessageObj.id,MessageObj.title)}}>replace查看</button>
                </li>
              )
            })
          }
        </ul>
        <Routes>
          {/* <Route path='detail/:id/:title' element={<Detail />} /> */} {/* params */}
          <Route path='detail' element={<Detail/>}/> {/* search/state */}
        </Routes>
        &nbsp;
        <button onClick={() => navigate(-1)}>go back</button> {/* back */}
        &nbsp;
        <button onClick={() => navigate(1)}>go forward</button> {/* forward */}
      </div>
    )
  // }
}
