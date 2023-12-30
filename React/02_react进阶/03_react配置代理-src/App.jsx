import React, { Component } from 'react'
import axios from 'axios' // axios

export default class App extends Component {
    getStudentData = () => {
        axios.get('/api/students').then((response) => { // 发get请求
            console.log('success', response.data)
        }, (reason) => {
            console.log('false', reason)
        })
    }
    getCarData = () => {
        axios.get('/api1/cars').then((response) => { // '/api1/cars'
            console.log('success', response.data)
        }, (reason) => {
            console.log('false', reason)
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.getStudentData}>点我获取学生数据</button>
                <button onClick={this.getCarData}>点我获取汽车数据</button>
            </div>
        )
    }
}
