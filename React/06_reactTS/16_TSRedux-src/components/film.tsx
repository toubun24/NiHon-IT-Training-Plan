// npm i axios

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' // Link

interface Iitem {
    filmId: number;
    name: string;
}
const Film: React.FC<{}> = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=2328178',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17041238203326194472714241","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(response => setList(response.data.data.films));
    }, [])
    return (
        <div>
            <h2>Film</h2>
            <ul>
                {
                    list.map((item: Iitem) => {
                        return <li key={item.filmId}>
                            <Link to={`/detail/${item.filmId}`}>{item.name}</Link>
                        </li>;
                    })
                }
            </ul>
        </div>
    )
}

export default Film