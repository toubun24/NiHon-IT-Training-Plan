import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js' // PubSub

export default class Search extends Component {
    search = () => {
        const { keyWordElement: { value: keyWord } } = this
        // this.props.updateAppState({ isFirst: false, isLoading: true }) // 加载状态
        PubSub.publish('search', { isFirst: false, isLoading: true })
        axios.get(`http://localhost:3000/api/search/users?q=${keyWord}`).then( // /api...也行
            response => {
                // this.props.updateAppState({ isLoading: false, users: response.data.items })
                PubSub.publish('search', { isLoading: false, users: response.data.items })
            },
            error => { // (reason)
                // this.props.updateAppState({ isLoading: false, err: error.message })
                PubSub.publish('search', { isLoading: false, err: error.message }) // reason
            }
        )
    }
    render() {
        return (
            <div style={{ backgroundColor: 'gray', padding: '20px' }}> {/*padding*/}
                <h2>搜索GitHub用户</h2>
                <input ref={c => this.keyWordElement = c} type="text" placeholder='输入关键词搜索' /> {/*<input placeholder='...'/>，不能把input拆开写*/} {/*ref方式获取输入值*/} {/*通过this.keyWordElement属性来获取当前节点*/}
                <button onClick={this.search}>搜索</button> {/*调用search*/}
            </div>
        )
    }
}
