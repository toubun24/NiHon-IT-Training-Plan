// npm i --save @types/swiper

// https://github.com/warrenlucky/zerostart/blob/main/java/React/(%E4%BA%8C%E5%8D%81%E4%BA%8C)React%E6%89%A9%E5%B1%95(%E5%85%AD).adoc

import React, { useState, useEffect, useRef } from 'react' // useRef
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { Swiper, SwiperRef } from 'swiper/react' // /react => SwiperRef
import { Button,Swiper } from 'antd-mobile'
import {SwiperRef} from "antd-mobile/es/components/swiper"

interface Iitem {
    filmId: number;
    name: string;
}
const Film: React.FC<{}> = () => {
    const [list, setList] = useState([])
    const [showlist, setShowlist] = useState([]) // showlist
    const myref = useRef<SwiperRef>(null)
    const mylist = [
        { bannerId: 1, name: "11", imgUrl: "https://bbs-static.miyoushe.com/static/2023/12/26/5c7e817120d4a9e05e9ff2c838b3143b_1426963076213491389.png" },
        { bannerId: 2, name: "22", imgUrl: "https://bbs-static.miyoushe.com/static/2024/01/01/3e28c3c12eef0d578cd958dda8f36b7b_3256431079556376272.png" },
        { bannerId: 3, name: "33", imgUrl: "https://bbs-static.miyoushe.com/static/2023/12/22/0578c5c179ed7b50afe116e83902f883_6414095257568725737.jpg" },
        { bannerId: 3, name: "44", imgUrl: "https://bbs-static.miyoushe.com/static/2023/12/28/3bfcfbd5fe60ead92b4f9e7c9e47c39a_3161663423394186012.jpg" },
        { bannerId: 3, name: "55", imgUrl: "https://bbs-static.miyoushe.com/static/2023/12/29/5c145e3d3b2dc9aa16b2045c587c665a_8762753929447398831.jpg" },
    ]
    setShowlist(mylist)
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=2328178',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17041238203326194472714241","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(response => setList(response.data.data.films))
    }, [])
    return (
        <div>
            <h2>Film</h2>
            {/* new */}
            <Swiper ref={myref} loop autoplay >
                {
                    showlist.map((item: any) => {
                        return <Swiper.Item key={item.bannerId}>
                            <img src={item.imgUrl} style={{ width: "100%" }} alt={item.name} /></Swiper.Item>
                    })
                }
            </Swiper>
            <Button color="danger" onClick={() => { // Button
                myref.current?.swipePrev()
            }}>上一个</Button>Swiper.Item
            <Button color="primary" onClick={() => {
                myref.current?.swipeNext()
            }}>下一个</Button>
            {/* new */}
            <ul>
                {
                    list.map((item: Iitem) => {
                        return <li key={item.filmId}>
                            <Link to={`/detail/${item.filmId}`}>{item.name}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default Film