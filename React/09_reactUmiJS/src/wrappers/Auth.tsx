// ./src/wrappers/Auth.tsx // 权限判断

import { Redirect } from 'umi';

const Auth = (props: any) => {
    if (localStorage.getItem('token')) {
        return <div>{props.children}</div>; {/* 通过插槽展示center */}
    }
    return <Redirect to="/login" />;
};

export default Auth;