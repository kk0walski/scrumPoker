const GamesList = (state = {}, action) => {
    switch (action.type) {
        case "ADD_GAME":
            {
                console.log("NEW_GAME: ", action.payload);
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
                    selectedList
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
                                selectedList
                            }
                        }
                    }
                };
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