// ./src/routes/App.jsx

import React, { Component } from 'react';
import Tabbar from "../components/Tabbar";
import { connect } from "dva";

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children} {/* 预留插槽 */}
                {this.props.isShow && <Tabbar />} {/* models/maizuo.js */}
            </div>
        );
    }
}
export default connect((state) => {
    return {
        isShow: state.maizuo.isShow // state.namespace.name
    }
})(App);