import React, { Component } from 'react';

class KSwiperItem extends Component {
    render() {
        return (
            <div className="swiper-slide">
                {this.props.children}
            </div>
        );
    }
}

export default KSwiperItem;