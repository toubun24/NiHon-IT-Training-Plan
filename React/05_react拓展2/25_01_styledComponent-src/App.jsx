// npm i styled-components

import React, { Component } from 'react'
import styled from 'styled-components' // styled-components

export default class App extends Component {
  render() {
    const StyledFooter = styled.footer` // StyledFooter
      background-color:skyblue;
      position:fixed;
      left:0;
      bottom:0;
      width:100%;
      height:50px;
      line-height:50px;
      text-align:center;
      ul {
        display:flex; // 弹性盒子
        li{
          flex:1;
          &:hover{
            background:pink;
          }
        }
      }
      `
    return (
      <div>
        <StyledFooter>
          <ul>
            <li>首页</li>
            <li>列表</li>
            <li>我的</li>
          </ul>
        </StyledFooter>
      </div>
    )
  }
}
