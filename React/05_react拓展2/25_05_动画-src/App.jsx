import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components' // , { keyframes }

export default class App extends Component {
  render() {
    const myanimation = keyframes` // 旋转 // myanimation // , { keyframes }
      from {
        transform:rotate(0deg); // 度
      }
      to {
        transform:rotate(360deg);
      }
    `
    const StyledDiv = styled.div`
      width:100px; height:100px;
      background:red;
      margin: -50px 0 0 -50px;
      position:absolute;
      left:50%; top:50%;
      animation: ${myanimation} 0.1s infinite // myanimation
    `
    return (
      <div>
        <StyledDiv></StyledDiv>
      </div>
    )
  }
}
