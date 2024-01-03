import React, { Component } from 'react'
// import { addPersonAction } from '../../redux/actions/person_action';
import { addPerson } from '../../redux/actions/person_action';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';

class Person extends Component {
    addPerson = () => {
        const name = this.name.value
        const age = this.age.value
        const personObj = { id: nanoid(), name, age }
        // this.props.add(personObj)
        this.props.addPerson(personObj)
        this.name.value = ''
        this.age.value = ''
    }
    render() {
        return (
            <div>
                <h1>上方求和为：{this.props.count}</h1>
                <input type='text' ref={c => this.name = c} placeholder='请输入姓名'></input>
                &nbsp;
                <input type='text' ref={c => this.age = c} placeholder='请输入年龄'></input>
                &nbsp;
                <button onClick={this.addPerson}>添加人员</button>
                <ul>
                    {
                        this.props.persons.map((person) => {
                            return <li key={person.id}>{person.name}---{person.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    count: state.count, persons: state.persons
}),
    {
        // add: AddPersonAction
        addPerson
    })(Person)