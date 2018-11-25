import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa'

export default class VouteDeck extends Component {
    render() {
        const { storyInfo, game } = this.props;
        return (
            <ul className="list-group">
                {Object.values(game.users).map(user => {
                    return (
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {user.name}
                            <span className="badge badge-primary badge-pill">
                                {
                                    storyInfo.votes[user.id] ?
                                        storyInfo.votes[user.id].vote ? 
                                            storyInfo.flipped ? storyInfo.vote[user.id].vote 
                                            : <FaCheck /> 
                                            :"none" 
                                    : "none"
                                }
                            </span>
                        </li>
                    )
                })
                }
            </ul>
        )
    }
}
