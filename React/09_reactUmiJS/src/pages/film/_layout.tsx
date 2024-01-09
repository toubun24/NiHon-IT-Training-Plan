// ./src/pages/film/_layout.tsx // 重定向 // 嵌套路由

import { Redirect, useLocation } from 'umi';

const film = (props: any) => {
    const location = useLocation();
    if (location.pathname === '/film' || location.pathname === '/film/') {
        return <Redirect to="/film/nowplaying" />;
    }
    return (
        <div>
            <div style={{ height: '200px', background: 'skyblue' }}>轮播图</div>
            {props.children}
        </div>
    );
};

export default film;