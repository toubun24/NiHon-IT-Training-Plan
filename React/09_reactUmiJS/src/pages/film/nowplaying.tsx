// ./src/pages/film/nowplaying.tsx // 嵌套路由

import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
const NowPlaying = () => {
    const [list, setList] = useState([]);
    const history = useHistory();
    useEffect(() => {
        fetch(
            'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=273143',
            {
                method: 'GET',
                headers: {
                    'X-Client-Info':
                        '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list',
                },
            },
        )
            .then((response) => response.json())
            .then((response) => setList(response.data.films));
    }, []);
    return (
        <div>
            {list.map((item: any) => {
                return (
                    <li
                        key={item.filmId}
                        onClick={() => {
                            history.push(`/detail/${item.filmId}`);
                        }}
                    >
                        {item.name}
                    </li>
                );
            })}
        </div>
    );
};

export default NowPlaying;
