import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js' // PubSub

export default class List extends Component {
    state = { // state from App to List
        users: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }
    componentDidMount(){
        this.token = PubSub.subscribe('search',(_,stateObj) => {
            this.setState(stateObj)
        })
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }
    render() {
        const { users, isFirst, isLoading, err } = this.state // 不再是通过this.props从App获取state
        return (
            <div className='divList'>
                {
                    isFirst ? <h2>欢迎使用，输入关键字，点击搜索</h2> :
                    isLoading ? <h2>Loading...</h2> :
                    err ? <h2>{err.message}</h2> :
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt="avatar" src={userObj.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
