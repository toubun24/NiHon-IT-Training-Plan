import React, { Component } from 'react'

var list1: string[] = ["1", '2', '3', '4', '5']
list1.push("6")
console.log(list1) // (6) ['1', '2', '3', '4', '5', '6']
//
var list2: number[] = [1, 2, 3, 4, 5]
list2.push(6)
console.log(list2) // (6) [1, 2, 3, 4, 5, 6]
//
var list3: (string | number)[] = [1, 2, 3, 4, "5"]
list3.push(6, "7")
console.log(list3) // (7) [1, 2, 3, 4, '5', 6, '7']
//
var list4: any[] = [true, 2, 3, 4, "5"]
list4.push(6, "7", false)
console.log(list4) // (8) [true, 2, 3, 4, '5', 6, '7', false]
//
//--------------------------------------------
// Array
var mylist1: Array<string> = ["1", '2', '3', '4', '5']
mylist1.push("6")
console.log(mylist1) // (6) ['1', '2', '3', '4', '5', '6']
//
var mylist2: Array<number> = [1, 2, 3, 4, 5]
mylist2.push(6)
console.log(mylist2) // (6) [1, 2, 3, 4, 5, 6]
//
var mylist3: Array<string | number> = [1, 2, 3, 4, '5']
mylist3.push(6, "7")
console.log(mylist3) // (7) [1, 2, 3, 4, '5', 6, '7']
//
var mylist4: Array<any> = [false, true, 1, 2, 3, "4"]
mylist4.push(5, 6, "7", false)
console.log(mylist4) // (10) [false, true, 1, 2, 3, '4', 5, 6, '7', false]

export default class App extends Component {
    render() {
        return (
            <div>App</div>
        )
    }
}
