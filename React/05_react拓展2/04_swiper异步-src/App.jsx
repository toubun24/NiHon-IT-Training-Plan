import React, { Component } from 'react'
import { Swiper } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import "/node_modules/swiper/swiper-bundle.min.css"

export default class App extends Component {
    state = {
        // list: ["111", "222", "333", "444", "555"]
        list: []
    }
    componentDidMount() {
        /*
        new Swiper('.swiper', {
            modules: [Navigation, Pagination],
            pagination: {
                el: '.swiper-pagination'
            },
        })
        */
        setTimeout(() => { // 异步
            this.setState({ list: ["111", "222", "333", "444", "555"] })
            new Swiper('.swiper', {
                modules: [Navigation, Pagination],
                pagination: {
                    el: '.swiper-pagination',
                },
                loop: true
            })
        }, 1000)
    }
    render() {
        return (
            <div>
                <div className="swiper" style={{ height: "200px", backgroundColor: "gray", textAlign: "center" }}>
                    <div className='swiper-wrapper'>
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
