import React, { Component } from 'react'
// import Swiper, { Navigation, Pagination } from "swiper";
import { Swiper } from 'swiper' // Swiper
import { Navigation, Pagination } from 'swiper/modules' // Swiper
import "/node_modules/swiper/swiper-bundle.min.css"

class Kswiper extends Component {
    componentDidMount() {
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
                <div className="swiper">
                    <div className='swiper-wrapper'>
                        {this.props.children}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
}

export default Kswiper;