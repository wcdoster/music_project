import React, { Component } from 'react'

export default class Sequence extends Component {
    render() {
        return(
            <div id={this.props.instrument}>
                    <h6>{this.props.title}</h6>
                    {this.props.state.map((beat, i) => {
                        return (
                            <div id={this.props.instrument + '_' + i} key={i}>
                                <input type="checkbox" onClick={this.props.radioClick} />
                            </div>
                        )
                    })}
                </div>
        )
    }
}