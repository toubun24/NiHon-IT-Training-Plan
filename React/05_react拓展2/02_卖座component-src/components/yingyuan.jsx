// npm install axios

import React, { Component } from 'react'
import axios from "axios" // axios

export default class Yingyuan extends Component {
    state = { // state
        yingyuanlist: [],
        backgroundlist: []
    }
    componentDidMount() {
        axios({ // axios
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5267084',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"442000"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then((response) => {
            // console.log(response.data) // {status: 0, data: {…}, msg: 'ok'} // data: // cinemas: // [0 … 99] // 0: {cinemaId: 4876, name: '北京地质礼堂影院', address: '北京市西四羊肉胡同30号', longitude: 116.37800739847866, latitude: 39.92868731886429, …}
            Array(250)
            this.setState({ yingyuanlist: response.data.data.cinemas })
            this.setState({ backgroundlist: response.data.data.cinemas })
        }, (reason) => {
            console.log(reason.message)
        })
    }
    handlerInput = (event) => { // event
        const newlist = this.state.backgroundlist.filter(item => { // filter查询
            return item.name.toUpperCase().includes(event.target.value.toUpperCase()) // includes
                || item.address.toUpperCase().includes(event.target.value.toUpperCase())
        })
        this.setState({ yingyuanlist: newlist })
    }
    render() {
        return (
            <div>
                <input type="text" onInput={this.handlerInput} />
                {
                    this.state.yingyuanlist.map(item => {
                        return <dl key={item.cinemaId}> {/* dl */}
                            <dt>{item.name}</dt> {/* dt */}
                            <dd>{item.address}</dd> {/* dd */}
                        </dl>
                    })
                }
            </div>
        )
    }
}
