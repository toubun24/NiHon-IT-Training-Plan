import React, { Component } from 'react'

// Object
interface Iobj {
    name: string,
    age: number,
    location: string,
    [propName: string]: any // 任意属性
}
var obj: Iobj = {
    name: "jack",
    age: 100,
    location: "beijing",
    cc: '212',
    ww: 1,
    ss: true
}
console.log(obj) // {name: 'jack', age: 100, location: 'beijing', cc: '212', ww: 1, …}age: 100cc: "212"location: "beijing"name: "jack"ss: trueww: 1[[Prototype]]: Object

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
