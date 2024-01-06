import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render() {
    const StyledInput = styled.input`
      outline:none;
      border-radius:10px; // 圆角
      border-bottom: 1px solid yellow;
    `
    const StyledDiv = styled.div`
      background:${props => props.bg || 'gray'}; // bg
      width:100px;
      height:100px;
    `
    return (
      <div>
        <StyledInput type="text" placeholder="输入" />
        <StyledDiv bg='red'></StyledDiv> {/* bg */}
      </div>
    )
  }
}
