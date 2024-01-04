import React, { Component } from 'react'

function test1(a: string, b: string, c?: number): string {
    return a.substring(0, 1) + b.substring(0, 1)
}
var myname: string = test1('aaa', 'bbb', 100)
console.log(myname) // ab
//------------------------
interface Ifunc {
    (a: string, b: string): string
}
var myfunc: Ifunc = function test2(a: string, b: string, c?: number): string { // 'c' is declared but its value is never read
    return a.substring(0, 1) + b.substring(0, 1)
}
console.log(myfunc('123','987')) // 19
//------------------------
interface Iobj {
    name: string,
    age: number,
    getName: (name: string) => string
}
var obj: Iobj = {
    name: "李四",
    age: 100,
    getName: (name: string) => {
        return name
    }
}
var name: string = obj.getName('aaa')
console.log(name) // aaa

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
