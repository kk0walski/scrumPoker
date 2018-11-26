import React, { Component } from 'react';
import classnames from 'classnames';

export default class Card extends Component {

    render() {
        const cardDisplay = this.props.display;
        const cardValue = this.props.value;
        const { user, story } = this.props;
        console.log("STORY_VALUE ", story.votes[user.uid].value === cardValue)
        return (
            <div className={classnames("card", {'selected':story.votes[user.uid].value === cardValue})} onClick={() => this.props.vote(story, cardValue)}>
                {cardDisplay}
            </div>
        )
    }
}
