// ./src/pages/film/comingsoon.tsx // 嵌套路由

import { useEffect } from 'react';

const Comingsoon = () => {
    useEffect(() => {
        fetch(
            '/api/mmdb/movie/v3/list/hot.json?ct=%E6%88%90%E9%83%BD&ci=59&channelId=4',
            {
                method: 'GET',
            },
        )
            .then((response) => response.json())
            .then((response) => console.log(response.data.hot));
    }, []);
    return <div>Comingsoon</div>;
};

export default Comingsoon;