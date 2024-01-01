import React, { Component } from 'react'

export default class Demo extends Component {
    state = {
        myhtml: `<span>
                    hello dangerouslySetInnerHTML
                    <h2>hello</h2>
                </span>`
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.myhtml }}>
                {/*{this.state.myhtml}*/}
            </div>
        )
    }
}
// {/* dangerouslySetInnerHTML */} 动态设置innerHTML {/* __html */}