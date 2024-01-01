import React, { Component } from 'react'
// import Swiper, { Navigation, Pagination } from "swiper" // Swiper
import { Swiper } from 'swiper' // 'swiper'
import { Navigation, Pagination } from 'swiper/modules' // 'swiper/modules'
import "/node_modules/swiper/swiper-bundle.min.css" // Swiper CSS

export default class App extends Component {
    state = { // state
        list: ["111", "222", "333", "444", "555"]
    }
    componentDidMount() { // componentDidMount & Swiper
        new Swiper('.swiper', {
            modules: [Navigation, Pagination],
            pagination: {
                el: '.swiper-pagination'
            },
        })
    }
    render() {
        return (
            <div>
                <div className="swiper" style={{ height: "200px", backgroundColor: "gray", textAlign: "center" }}>
                    <div className='swiper-wrapper'>
                        {/* {this.props.children} */} {/* 预留children插槽 */}
                        {this.state.list.map(item =>
                            <div key={item} className="swiper-slide">{item}</div>
                        )}
                    </div>
                    <div className="swiper-pagination" />
                </div>
            </div>
        );
    }
}
