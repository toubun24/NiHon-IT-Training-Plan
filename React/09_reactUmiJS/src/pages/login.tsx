// ./src/pages/login.tsx

import { useState } from 'react';
import { useHistory } from 'umi';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    return (
        <div>
            <h2>Login</h2>
            USER:
            <input
                type="text"
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            PASSWORD:
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    fetch('/users/login', {
                        method: 'POST',
                        body: JSON.stringify({
                            name,
                            password,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.ok) {
                                localStorage.setItem('token', 'dddwwq');
                                history.push('/center');
                            } else {
                                alert('用户名密码错误');
                            }
                        });
                }}
            >
                LOGIN
            </button>
        </div>
    );
};

export default Login;
