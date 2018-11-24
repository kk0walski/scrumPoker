const GamesList = (state = {}, action) => {
    switch (action.type) {
        case "ADD_GAME":
            {
                const {
                    owner,
                    firebaseOwner,
                    selectedStory,
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
                                firebaseOwner,
                                selectedStory,
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
                                        [user.uid]: user
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
                                        [user.uid]: user
                                    }
                                }
                            }
                        }
                    }
                }
            }
        case "SELECT_STORY": {
            const {
                owner,
                repo,
                game,
                story
            } = action.payload;
            return {
                ...state,
                [owner]: {
                    [repo]: {
                        [game]: {
                            ...state[owner][repo][game],
                            selectedStory: story
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