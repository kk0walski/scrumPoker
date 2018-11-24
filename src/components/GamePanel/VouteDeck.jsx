import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa'

export default class VouteDeck extends Component {
    render() {
        const { storyInfo, game } = this.props;
        return (
            <ul class="list-group">
                {Object.values(game.users).map(user => {
                    return (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            {user.name ? user.name: user.displayName}
                            <span class="badge badge-primary badge-pill">{storyInfo.votes[user.id] ? storyInfo.flipped ? storyInfo.votes[user.id] : <FaCheck /> : "none"}</span>
                        </li>
                    )
                })
                }
            </ul>
        )
    }
}
