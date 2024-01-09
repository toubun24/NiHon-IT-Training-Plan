// ./src/routes/Login.jsx

import React, { Component } from 'react';
import request from "../utils/request";

class Login extends Component {
    username = React.createRef()
    password = React.createRef()
    render() {
        return (
            <div>
                用户名：
                <input type="text" ref={this.username} />
                <br />
                密码：
                <input type="password" ref={this.password} />
                <button onClick={() => {
                    request('/users/login', {
                        method: "POST",
                        body: JSON.stringify({
                            username: this.username.current.value,
                            password: this.password.current.value
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        if (response.data.ok) {
                            localStorage.setItem("token", "dwawe31wqe")
                            this.props.history.push('/center')
                        } else {
                            alert('用户名密码错误')
                        }
                    })
                    this.username.current.value = ''
                    this.password.current.value = ''
                }}>LOGIN</button>
            </div>
        );
    }
}
export default Login;