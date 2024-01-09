// ./src/pages/center.tsx // 路由拦截，login相关

import { useHistory } from 'umi';

const center = () => {
    const history = useHistory();
    return (
        <div>
            center
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    history.push('/login'); // 重定向
                }}
            >
                UNLOGIN
            </button>
        </div>
    );
};
center.wrappers = ['@/wrappers/Auth'];
export default center;