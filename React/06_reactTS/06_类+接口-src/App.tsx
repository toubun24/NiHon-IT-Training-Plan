import React, { Component } from 'react'

interface Ifunc {
    getName: () => string
}
class A implements Ifunc {
    getName(): string {
        return "A";
    }
    A() {
    }
}
class B implements Ifunc {
    getName(): string {
        return "B";
    }
    B() {
    }
}
function init(obj: Ifunc) {
    obj.getName()
}
const objA = new A()
const objB = new B()
init(objA) // init(): 类初始化对象时所调用的方法
init(objB)
console.log(objA) // A {} ...
console.log(objB) // B {} ...
console.log(objA.getName()) // A
console.log(objB.getName()) // B

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
