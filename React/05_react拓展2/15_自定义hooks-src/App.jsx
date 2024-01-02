import React, { Component } from 'react'
import Dianying from './components/dianying'
import Wode from './components/wode'
import Yingyuan from './components/yingyuan'
import './App.css'

export default class App extends Component {
    state = {
        list: [
            { id: 1, title: '电影' },
            { id: 2, title: '影院' },
            { id: 3, title: '我的' },
        ],
        current: 1
    }
    handler = (id) => {
        this.setState({ current: id })
    }
    whitch = () => {
        switch (this.state.current) {
            case (1):
                return <Dianying />
            case (2):
                return <Yingyuan />
            case (3):
                return <Wode />
            default:
                return null
        }
    }
    render() {
        return (
            <div>
                {
                    this.whitch()
                }
                <ul>
                    {
                        this.state.list.map((item) => {
                            return <li key={item.id} className={this.state.current === item.id ? 'active' : ''} onClick={() => this.handler(item.id)}>
                                {item.title}
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
