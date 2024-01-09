// ./src/routes/Center.jsx

import React, { Component } from 'react';
import { withRouter } from 'dva/router'
import request from "../utils/request";

class Center extends Component {
    componentDidMount() {
        request('/api/mmdb/movie/v3/list/hot.json?ct=%E6%88%90%E9%83%BD&ci=59&channelId=4',).then(function (response) {
            console.log(response) // 反向代理
        })
        request('/users').then(response => { console.log(response.data) });
    }
    render() {
        return (
            <div>
                Center
                <WithRouter /> {/* WithRouter */}
            </div>
        );
    }
}
class Child extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    localStorage.removeItem('token')
                    this.props.history.push('/login')
                }}>Exit</button>
            </div>
        )
    }
}
const WithRouter = withRouter(Child) // WithRouter
export default Center;