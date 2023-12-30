import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        users: 'abc'
    }
    render() {
        return (
            <div>
                <h2>Child</h2>
                {
                    this.state.users.map((userObj) => { // map
                        return <ul key={userObj.id}>{userObj.name}---{userObj.age}</ul>
                    })
                }
            </div>
        )
    }
}
