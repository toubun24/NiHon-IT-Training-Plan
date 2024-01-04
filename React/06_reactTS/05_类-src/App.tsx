import React, { Component } from 'react'

class test {
    public name: string = '张三'
    private _list: any = []
    protected _age: number = 100
    public subscribe(cb: any) {
        this._list.push(cb)
    }
    public dispatch() {
        this._list.forEach((cb: any) => {
            cb && cb()
        })
    }
}
class test1 extends test {
    aaa() {
        console.log(this._age, this.name)
    }
}

var obj = new test()
console.log(obj.name) // 张三
var obj1 = new test1()
obj1.aaa() // 100 '张三'

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
