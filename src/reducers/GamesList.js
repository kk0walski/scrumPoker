const GamesList = (state = {}, action) => {
    switch (action.type) {
        case "ADD_GAME":
            {
                const {
                    owner,
                    repo,
                    id,
                    name,
                    desc,
                    velocity,
                    shareVelocityEnabled,
                    creatorCanEstimateEnabled,
                    cardSet,
                    autoFlipEnabled,
                    changeVoteEnabled,
                    calculateEnabled,
                    storyTimerEnabled,
                    storyList,
                    users
                } = action.payload;
                return {
                    ...state,
                    [owner]: {
                        [repo]: {
                            [id]: {
                                id,
                                name,
                                desc,
                                velocity,
                                shareVelocityEnabled,
                                creatorCanEstimateEnabled,
                                cardSet,
                                autoFlipEnabled,
                                changeVoteEnabled,
                                calculateEnabled,
                                storyTimerEnabled,
                                storyList,
                                users
                            }
                        }
                    }
                };
            }
        case "ADD_USER_TO_GAME":
            {
                console.log("PAYLOAD: ", action.payload);
                const {
                    owner,
                    repo,
                    game,
                    user
                } = action.payload
                if (state[owner] && state[owner][repo] && state[owner][repo][game]) {
                    return {
                        ...state,
                        [owner]: {
                            [repo]: {
                                [game]: {
                                    ...state[owner][repo][game],
                                    users: {
                                        ...state[owner][repo][game].users,
                                        user
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return {
                        ...state,
                        [owner]: {
                            [repo]: {
                                [game]: {
                                    users: {
                                        user
                                    }
                                }
                            }
                        }
                    }
                }
            }
        case "DELETE_GAME":
            {
                const {
                    owner,
                    repo,
                    id,
                } = action.payload;
                const {
                    [owner]: {
                        [repo]: {
                            [id]: deleteGame,
                            ...restOfGamse
                        }
                    }
                } = this.state;
                return {
                    ...state,
                    [owner]: {
                        [repo]: {
                            ...restOfGamse
                        }
                    }
                }
            }
        default:
            {
                return state;
            }
    }
}

export default GamesList;