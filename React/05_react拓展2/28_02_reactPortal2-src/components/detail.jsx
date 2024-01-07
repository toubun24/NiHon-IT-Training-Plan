import React, { Component } from 'react'
import { createPortal } from 'react-dom' // createPortal

export default class Detail extends Component {
    render() {
        return (
            createPortal( // createPortal
                <div style={{
                    width: '100%', height: '100%', left: 0, top: 0,
                    position: "fixed", background: 'rgba(0,0,0,0.7)', zIndex: '9999999'
                }}>
                    <h2>Detail</h2>
                    {this.props.children} {/* state */}
                    <button onClick={() => this.props.onClose()}>CLOSE</button> {/* close */}
                </div>, document.body // , document.body (container: DOM Element)
            ) // createPortal
        )
    }
}
