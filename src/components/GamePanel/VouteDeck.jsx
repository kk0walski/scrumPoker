import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa'

export default class VouteDeck extends Component {
    render() {
        const { storyInfo, user } = this.props;
        return (
            <ul className="list-group">
                {Object.values(storyInfo.votes).map(vote => {
                    return (
                        <li key={vote.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {vote.name}
                            <span className="badge badge-primary badge-pill">
                                {
                                    vote.value ?  storyInfo.flipped ? vote.value :  vote.id === user.uid ? vote.value : <FaCheck />  : "none"
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
