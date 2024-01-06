// npm i --save @types/react-router-dom

import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // react-router-dom
import Film from './components/film'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/film/*" element={<Film></Film>}></Route>
                        {/*
                        <Route path="/cinema" element={<Cinema></Cinema>}></Route>
                        <Route path="/center" element={<Center />}></Route>
                        <Route path="/detail/:id" element={<Detail />}></Route>
                        */}
                        <Route path="*" element={<Navigate to="/film" />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}
