import React, { Component } from 'react'

export default class Detail extends Component {
    render() {
        return (
            <div style={{
                width: '100%', height: '100%', left: 0, top: 0,
                position: "fixed", background: 'rgba(0,0,0,0.7)', zIndex: '9999999'
            }}>
                <h2>Detail</h2>
            </div>
        )
    }
}
