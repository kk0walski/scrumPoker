import React, { Component } from 'react'

export default class Card extends Component {

    render() {
        const cardDisplay = this.props.display;
        const cardValue = this.props.value;
        return (
            <div className="card " onClick={() => this.props.vote(cardValue)}>
                {cardDisplay}
            </div>
        )
    }
}
