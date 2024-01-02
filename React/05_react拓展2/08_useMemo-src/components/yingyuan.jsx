// import React, { Component } from 'react'
import React, { useState, useEffect, useMemo } from 'react' // { useState, useEffect, useMemo }
import axios from "axios"

// export default class Yingyuan extends Component {
export default function Yingyuan() {
    /*
    state = {
        yingyuanlist: [],
        backgroundlist: []
    }
    */
    const [text, settext] = useState("") // ("")
    const [list, setlist] = useState([]) // ([])
    // componentDidMount() {
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5267084',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"442000"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then((response) => {
            // Array(250)
            // this.setState({ yingyuanlist: response.data.data.cinemas })
            // this.setState({ backgroundlist: response.data.data.cinemas })
            setlist(response.data.data.cinemas) // setlist
        }, (reason) => {
            console.log(reason.message)
        })
        // }
    },[])
    // handlerInput = (event) => {
    const getlist = useMemo(() => // useMemo
        // const newlist = this.state.backgroundlist.filter(item => {
        list.filter(item => {
            // return item.name.toUpperCase().includes(event.target.value.toUpperCase())
            return item.name.toUpperCase().includes(text.toUpperCase())
                // || item.address.toUpperCase().includes(event.target.value.toUpperCase())
                || item.address.toUpperCase().includes(text.toUpperCase())
        }), [list, text]
        // this.setState({ yingyuanlist: newlist })
        // }
    )
    // render() {
    return (
        <div>
            {/* <input type="text" onInput={this.handlerInput} /> */}
            <input type="text" onChange={(event) => { return settext(event.target.value) }} /> {/* settext */}
            {
                // this.state.yingyuanlist.map(item => {
                getlist.map(item => { // getlist
                    return <dl key={item.cinemaId}>
                        <dt>{item.name}</dt>
                        <dd>{item.address}</dd>
                    </dl>
                })
            }
        </div>
    )
    // }
}
