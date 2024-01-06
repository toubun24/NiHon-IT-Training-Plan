import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render() {
    const StyledButton = styled.button` // StyledButton
      width:100px;
      height:100px;
      background:red
    `
    const StyledButton2 = styled(StyledButton)` // styled(StyledButton)
      background:green;
    `
    return (
      <div>
        <StyledButton></StyledButton>
        <StyledButton2></StyledButton2>
      </div>
    )
  }
}