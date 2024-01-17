// 权限判断通用代码

import { Redirect, useLocation } from 'umi'; // useLocation

const Auth = (props) => { // props: any in TS
    // const location = useLocation()
    // const tokenContent = localStorage.getItem('token')
    // const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
    // rights.checked.push('/')
    if (localStorage.getItem('token')) { // 有token则遵循../index.jsx跳转到home
        return <div>{props.children}</div>;
    }
    return <Redirect to="/login" />;
};

export default Auth;

// > localStorage
// < Storage {token: 'dddwwq', length: 1}
// http://localhost:8000/home

// > localStorage.setItem('token', '')
// < undefined
// http://localhost:8000/login

// > localStorage.setItem('token', 'dddwwq')
