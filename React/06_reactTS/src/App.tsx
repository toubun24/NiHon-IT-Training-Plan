import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Film from './components/film'
import Detail from './components/detail'
import Cinema from './components/cinema'
import Center from './components/center'
import store from './redux/store'

class App extends Component {
    state = {
        isShow: store.getState().isShow
    }
    componentDidMount() {
        store.subscribe(() => {
            this.setState({ isShow: store.getState().isShow });
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/film/*" element={<Film />}></Route>
                        <Route path="/cinema" element={<Cinema />}></Route>
                        <Route path="/center" element={<Center />}></Route>
                        <Route path="/detail/:id" element={<Detail />}></Route>
                        <Route path="*" element={<Navigate to="/film" />}></Route>
                    </Routes>
                    {
                        this.state.isShow && <ul>
                            <li>电影</li>
                            <li>影院</li>
                            <li>我的</li>
                        </ul>
                    }
                </div>
            </BrowserRouter>
        )
    }
}

export default App