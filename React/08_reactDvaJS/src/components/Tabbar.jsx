// ./src/components/Tabbar.jsx

import React, { Component } from 'react';
import { NavLink } from 'dva/router'
import style from './Tabbar.css';
class Tabbar extends Component {
    render() {
        return (
            <footer>
                <ul>
                    <li><NavLink to="/film" activeClassName={style.active}>film</NavLink></li>
                    <li><NavLink to="/cinema" activeClassName={style.active}>cinema</NavLink></li>
                    <li><NavLink to="/center" activeClassName={style.active}>center</NavLink></li>
                </ul>
            </footer>
        );
    }
}
export default Tabbar;