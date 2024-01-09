// ./src/routes/Film.jsx

import React, { Component } from 'react';
import request from "../utils/request";

class Film extends Component {
    state = {
        info: []
    }
    componentDidMount() {
        request('https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=2094836', {
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(response => this.setState({ info: response.data.data.films }))
    }
    render() {
        return (
            <div>
                {
                    this.state.info.map(info => {
                        return <li key={info.filmId} onClick={() => this.props.history.push(`/detail/${info.filmId}`)}>
                            <img src={info.poster} alt={info.name} style={{ width: '100px' }} />
                            <p>{info.name}</p>
                        </li>
                    })
                }
            </div>
        );
    }
}
export default Film;