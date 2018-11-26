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
                    issuesCount,
                    users
                } = action.payload;
                if (state[owner] && state[owner][repo] && state[owner][repo][id]) {
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
                            [repo]: {
                                ...state[owner][repo],
                                [id]: {
                                    ...state[owner][repo][id],
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
                                    issuesCount,
                                    users
                                }
                            }
                        }
                    };
                } else if (state[owner] && state[owner][repo]) {
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
                            [repo]: {
                                ...state[owner][repo],
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
                                    issuesCount,
                                    storyList: [],
                                    users
                                }
                            }
                        }
                    };
                } else if (state[owner]) {
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
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
                                    issuesCount,
                                    storyList: [],
                                    users
                                }
                            }
                        }
                    };
                } else {
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
                                    issuesCount,
                                    storyList: [],
                                    users
                                }
                            }
                        }
                    };
                }
            }
        case "ADD_STORY_TO_GAME":
            {
                const {
                    owner,
                    repo,
                    game,
                    story
                } = action.payload
                if (state[owner] && state[owner][repo] && state[owner][repo][game]) {
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
                            [repo]: {
                                ...state[owner][repo],
                                [game]: {
                                    ...state[owner][repo][game],
                                    storyList: {
                                        ...state[owner][repo][game].storyList,
                                        [story.id]: story
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return state;
                }
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
                            ...state[owner],
                            [repo]: {
                                ...state[owner][repo],
                                [game]: {
                                    ...state[owner][repo][game],
                                    users: {
                                        ...state[owner][repo][game].users,
                                        [user.id]: user
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return state;
                }
            }
        case "SELECT_STORY":
            {
                const {
                    owner,
                    repo,
                    game,
                    story
                } = action.payload;
                if (state[owner] && state[owner][repo] && state[owner][repo][game]) {
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
                            [repo]: {
                                ...state[owner][repo],
                                [game]: {
                                    ...state[owner][repo][game],
                                    selectedStory: story
                                }
                            }
                        }
                    }
                } else {
                    return state;
                }
            }
        case "DELETE_GAME":
            {
                const {
                    owner,
                    repo,
                    id,
                } = action.payload;
                if (state[owner] && state[owner][repo] && state[owner][repo][id]) {
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
                            ...state[owner],
                            [repo]: {
                                ...restOfGamse
                            }
                        }
                    }
                } else {
                    return state;
                }
            }
        default:
            {
                return state;
            }
    }
}

export default GamesList;