// rfc

import React from 'react'
import { useRoutes } from 'react-router-dom'
import RouterList from './router/RouterList'
import './App.less'

export default function App() {
  let element = useRoutes(RouterList()) // 传参路由数组RouterList // 注意()否则Uncaught TypeError: routes.forEach is not a function
  return (
    <div className="App">
      {element}
    </div>
  )
}
