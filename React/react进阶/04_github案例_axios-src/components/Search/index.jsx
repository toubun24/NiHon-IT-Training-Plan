import React, { Component } from 'react'
import axios from 'axios' // axios

export default class Search extends Component {
    search = () => { // 回调
        const { keyWordElement: { value: keyWord } } = this // 连续的解构赋值，最后将value改名为keyWord
        this.props.updateAppState({isFirst:false,isLoading:true}) // 加载状态
        axios.get(`http://localhost:3000/api/search/users?q=${keyWord}`).then(
            response => {
                this.props.updateAppState({ isLoading: false, users: response.data.items })
            },
            error => {
                this.props.updateAppState({ isLoading: false, err: error.message })
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
