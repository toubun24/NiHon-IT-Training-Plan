// ./src/pages/detail/[id].tsx // 动态路由，根据[id]动态生成

import { useParams } from 'umi';
const Detail = () => {
    const params = useParams<any>();
    return <div>Detail-{params.id}</div>;
};

export default Detail;
