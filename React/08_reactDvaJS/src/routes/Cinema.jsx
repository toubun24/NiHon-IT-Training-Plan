// ./src/routes/Cinema.jsx

import React, { Component } from 'react';
import { connect } from "dva";

class Cinema extends Component {
    componentDidMount() {
        if (this.props.list.length === 0) { // 判断list长度0
            this.props.dispatch({
                type: "maizuo/getCinemaList" // "namespace/"
            })
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.list.map(item => {
                        return <li key={item.cinemaId}>{item.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}
export default connect((state) => ({ list: state.maizuo.list }))(Cinema);