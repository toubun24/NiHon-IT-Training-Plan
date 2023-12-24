import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    //   console.log('Header组件',this.props)
    return (
        <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
    )
  }
}
