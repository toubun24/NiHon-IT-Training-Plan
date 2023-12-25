import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom' // react-router-dom
import MyNavLink from '../../components/MyNavLink' // MyNavLink // ../../
import News from './News' // import
import Message from './Message'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>Content of Home</h3>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <MyNavLink to='news'>News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to='message' >Message</MyNavLink>
                        </li>
                    </ul>
                    {/* 注册路由 */}
                    <Routes>
                        <Route path='news' element={<News />} />
                        <Route path='message' element={<Message />} />
                    </Routes>
                </div>
            </div>
        )
    }
}
