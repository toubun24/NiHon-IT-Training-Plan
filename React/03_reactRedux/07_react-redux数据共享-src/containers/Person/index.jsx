// containers/Person/index.jsx

import React, { Component } from 'react'
import { addPersonAction } from '../../redux/actions/person_action';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';

class Person extends Component {
    addPerson = () => {
        const name = this.name.value // 不能const { value: { name } } = this.name
        const age = this.age.value // 解构
        const personObj = { id: nanoid(), name, age } // 创建
        this.props.add(personObj) // 调用
        this.name.value = '' // 清空
        this.age.value = '' // 清空
    }
    render() {
        return (
            <div>
                <h1>上方求和为：{this.props.count}</h1>
                <input type='text' ref={c => this.name = c} placeholder='请输入姓名'></input> {/* ref */}
                &nbsp;
                <input type='text' ref={c => this.age = c} placeholder='请输入年龄'></input>
                &nbsp;
                <button onClick={this.addPerson}>添加人员</button> {/* addPerson */}
                <ul> {/* ul */}
                    { // {}包裹map
                        this.props.persons.map((person) => {
                            return <li key={person.id}>{person.name}---{person.age}</li> // <li key>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    count: state.count, persons: state.persons // persons
}),
    {
        add: addPersonAction
    })(Person)