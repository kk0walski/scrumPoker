import React, { Component } from 'react'

export default class VouteDeck extends Component {
    render() {
        const { storyInfo, game } = this.props;
        return (
            <ul class="list-group">
                {Object.values(game.users).map(user => {
                    return (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            {user.name ? user.name: user.displayName}
                            <span class="badge badge-primary badge-pill">{storyInfo.votes[user.id] ? storyInfo.votes[user.id] : "none"}</span>
                        </li>
                    )
                })
                }
            </ul>
        )
    }
}
