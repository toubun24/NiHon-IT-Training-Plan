import React, { Component } from 'react'
// import axios from 'axios'
import PubSub from 'pubsub-js' // PubSub

export default class Search extends Component {
    // search = () => {
    search = async () => {
        const { keyWordElement: { value: keyWord } } = this
        PubSub.publish('search', { isFirst: false, isLoading: true })
        // axios.get(`http://localhost:3000/api/search/users?q=${keyWord}`).then(
        // response => {
        try {
            const response = await fetch(`/api/search/users?q=${keyWord}`)
            const data = await response.json()
            PubSub.publish('search', { isLoading: false, users: data.items }) // response.data.items
        // }, error => {
        } catch (error) {
            PubSub.publish('search', { isLoading: false, err: error.message })
        }
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
