import React, { Component } from 'react'

// String Number Boolean
var myName: string = '小明'
console.log(myName) // 小明
myName.substring(0, 0) // substring()从一段字符串中截取一段下来
console.log(myName.substring(0, 1)) // 小
myName = String(100)
console.log(myName) // 100
console.log('---')
//
var age: number = 100.123
console.log(age) // 100.123
age.toFixed(1) // toFixed()把Number四舍五入为指定小数位数的数字
console.log(age.toFixed(1)) // 100.1
console.log('---')
//
var isShow: boolean = true
console.log(isShow) // true
isShow = false
console.log(isShow) // false
console.log('---')
//
var my: string | number = '老王'
console.log(my) // 老王
my = 100
console.log(my) // 100
console.log('---')
//
var myany: any = 100
console.log(myany) // 100
myany = '小红'
console.log(myany) // 小红
console.log('---')

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
