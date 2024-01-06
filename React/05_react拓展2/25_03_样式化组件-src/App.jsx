import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render() {
    const StyledChild = styled(Child)`
      background:yellow;
      color:red;
    `
    return (
      <div>
        <StyledChild></StyledChild>
      </div>
    )
  }
}

function Child(props) {
  return(
    <div className={props.className}>
      Child
    </div>
  )
}
