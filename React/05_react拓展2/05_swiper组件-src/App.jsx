import React, { Component } from 'react'
// import { Swiper } from 'swiper'
// import { Navigation, Pagination } from 'swiper/modules'
// import "/node_modules/swiper/swiper-bundle.min.css"
import KSwiper from "./swiper_components/KSwiper"
import KSwiperItem from "./swiper_components/KSwiperItem"
// import axios from "axios"

export default class App extends Component {
    state = { // state
        list: [
            {bannerId:1,name:"11",imgUrl:"https://bbs-static.miyoushe.com/static/2023/12/26/5c7e817120d4a9e05e9ff2c838b3143b_1426963076213491389.png"},
            {bannerId:2,name:"22",imgUrl:"https://bbs-static.miyoushe.com/static/2024/01/01/3e28c3c12eef0d578cd958dda8f36b7b_3256431079556376272.png"},
            {bannerId:3,name:"33",imgUrl:"https://bbs-static.miyoushe.com/static/2023/12/22/0578c5c179ed7b50afe116e83902f883_6414095257568725737.jpg"},
            {bannerId:3,name:"44",imgUrl:"https://bbs-static.miyoushe.com/static/2023/12/28/3bfcfbd5fe60ead92b4f9e7c9e47c39a_3161663423394186012.jpg"},
            {bannerId:3,name:"55",imgUrl:"https://bbs-static.miyoushe.com/static/2023/12/29/5c145e3d3b2dc9aa16b2045c587c665a_8762753929447398831.jpg"},
        ]
    }
    /*
    componentDidMount() { // componentDidMount & axios
        axios({
            url: "https://bbs-api.miyoushe.com/misc/wapi/getPCBanner?gids=6",
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"442000"}',
                'X-Host': 'mall.cfg.common-banner'
            }
        }).then(response => {
            // console.log(response.data)
            this.setState({ list: response.data.data })
        }, reason => console.log(reason.message))
    }
    */
    render() {
        return (
            <div>
                <KSwiper loop={true} >
                    {
                        this.state.list.map((item) =>
                            <KSwiperItem key={item.bannerId}>
                                <img src={item.imgUrl} alt={item.name} style={{ width: '100%' }} />
                                {/*{item.name}*/}
                            </KSwiperItem>
                        )
                    }
                </KSwiper>
            </div>
        )
    }
}
