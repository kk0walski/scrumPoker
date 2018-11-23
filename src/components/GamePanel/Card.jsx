import React, { Component } from 'react'

export default class Card extends Component {

    render() {
        const cardValue = this.props.value;
        return (
            <div className="gameCard " onClick={this.selectedCard}>
                <div className="center-icon">{cardValue}</div>
            </div>
        )
    }
}
