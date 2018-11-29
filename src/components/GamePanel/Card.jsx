import React, { Component } from 'react';
import classnames from 'classnames';

export default class Card extends Component {

    render() {
        const cardDisplay = this.props.display;
        const cardValue = this.props.value;
        const { user, story, canChange } = this.props;
        return (
            <div className={classnames(
                "card",
                 {'selected': story.votes && story.votes[user.uid] && story.votes[user.uid].value === cardValue},
                 {'disabled': !canChange && story.finalScore !== undefined && story.finalScore !== "" && story.finalScore !== null}
                 )} onClick={() => this.props.vote(story, cardValue)}>
                {cardDisplay}
            </div>
        )
    }
}
