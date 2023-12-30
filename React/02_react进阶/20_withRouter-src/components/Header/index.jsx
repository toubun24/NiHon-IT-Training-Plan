import React from 'react' // , { Component }
import { useNavigate } from 'react-router-dom' // useNavigate

// export default class About extends Component {
export default function Header() { // ()
  const navigate = useNavigate() // useNavigate => navigate
  // render() {
    return (
      <div className="col-xs-offset-2 col-xs-8">
        <div className="page-header">
          <h1>React Router Demo</h1>
          <button onClick={() => navigate(-1)}>go back</button>
          <button onClick={() => navigate(1)}>go forward</button>
        </div>
      </div>
    )
  // }
}
