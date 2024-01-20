import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import Guest from '../views/Guest'
import Login from '../views/Login'
import Backend from '../views/Backend'
import NotFound from '../views/NotFound'
import UserList from '../views/Backend/UserList'
import UserAdd from '../views/Backend/UserAdd'
import UserEdit from '../views/Backend/UserEdit'
import RightRole from '../views/Backend/RightRole'
import RightPage from '../views/Backend/RightPage'
import InstockList from '../views/Backend/InStockList'
import InstockPricing from '../views/Backend/InstockPricing'
import TodoDoctor from '../views/Backend/TodoDoctor'
import TodoAssistant from '../views/Backend/TodoAssistant'
import TodoReserve from '../views/Backend/TodoReserve'
import ArchivesCats from '../views/Backend/ArchivesCats'
import ArchivesRecords from '../views/Backend/ArchivesRecords'
import ArchivesAddrecord from '../views/Backend/ArchivesAddrecord'

// import Appointment from '../views/Guest/Appointment';
// import View from '../views/Guest/View';
// mport Doctor from '../views/Guest/Doctor';
// import Register from '../views/Guest/Register';

const routeList = { // 需要拿token进行权限判断的页面 // 路由映射表
  "/user/list": <UserList />,
  "/user/add": <UserAdd />,
  "/user/edit": <UserEdit />,
  "/right/role": <RightRole />,
  "/right/page": <RightPage />,
  "/inStock/list": <InstockList />,
  "/inStock/pricing": <InstockPricing />,
  "/todo/doctor": <TodoDoctor />,
  "/todo/assistant": <TodoAssistant />,
  "/todo/reserve": <TodoReserve />,
  "/archives/cats": <ArchivesCats />,
  "/archives/records": <ArchivesRecords />,
  "/archives/addrecord": <ArchivesAddrecord />,
}

export default function RouterList() {
  const [routerList, setRouterList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:7890/rights?id=1').then(res => {
      localStorage.setItem('token', JSON.stringify(res.data[0])) // 初始测试时设定管理员token
    })
  }, [])
  // let token = localStorage.getItem('token') // 临时参考
  // console.log("token", token)
  useEffect(() => { // 获取权限数组
    // if (token !== null) { // 临时参考
    const token = JSON.parse(localStorage.getItem('token'))
    // console.log("token", token)
    // const token = JSON.parse(token) // 临时参考
    let arr = []
    token.children.forEach(item => {
      if (item.right === 1) {
        item.children.forEach(item => {
          if (item.right === 1) { // 如果有1级目录需要链接页面的，在这里修改判断；目前没有
            arr = [...arr, item.key]
          }
        })
      }
    })
    setRouterList(arr)
    // } // 临时参考
  }, [])
  return (
    [ // []
      { // {}
        path: '/', element: <Backend />,
        children: [
          ...routerList.map(item => {
            return ({
              path: item,
              element: routeList[item]
            })
          }),
          { path: '/', element: <Navigate to='/user/list' /> }
        ]
      },
      { path: '/Login', element: <Login /> },
      { path: '/guest', element: <Guest /> },
      { path: '*', element: <NotFound /> },
    ]
  )
}
