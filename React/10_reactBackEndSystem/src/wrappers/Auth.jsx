// 权限判断通用代码

import { Redirect } from 'umi';

const Auth = (props) => { // props: any in TS
    if (localStorage.getItem('token')) { // 有token则遵循../index.jsx跳转到home
        return <div>{props.children}</div>;
    }
    return <Redirect to="/login" />;
};

export default Auth;