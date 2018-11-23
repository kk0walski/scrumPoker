import React, { Component } from 'react'

export default class Card extends Component {

    render() {
        const cardValue = this.props.value;
        console.log("REF: ", this.refs);
        return (
            <div className="card " ref="myCard" onClick={this.selectedCard}>
                <div className="center-icon">{cardValue}</div>
            </div>
        )
    }
}
