// ./src/routes/Detail.jsx

import React, { Component } from 'react';
import { connect } from "dva";

class Detail extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'maizuo/hide' // models/maizuo.js
        })
    }
    UNSAFE_componentWillUnmount() { // UNSAFE_
        this.props.dispatch({
            type: 'maizuo/show' // models/maizuo.js
        })
    }
    render() {
        return (
            <div>
                Detail-ID:{this.props.match.params.id}
            </div>
        );
    }
}
export default connect()(Detail); // connect()拿不到state而只拿models方法