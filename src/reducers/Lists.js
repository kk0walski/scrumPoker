const Lists = (state = {}, action) => {
    switch (action.type) {
        case "ADD_LIST":
            {
                const {
                    owner,
                    repo,
                    id,
                    title,
                    list
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
                                    title,
                                    list
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
                                    title,
                                    list
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
                                    title,
                                    list
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
                                    title,
                                    list
                                }
                            }
                        }
                    };
                }
            }
        case "CHANGE_LIST_NAME":
            {
                const {
                    owner,
                    repo,
                    listId,
                    listTitle,
                } = action.payload;
                if(state[owner] && state[owner][repo] && state[owner][repo][listId]){
                    return {
                        ...state,
                        [owner]: {
                            [repo]: {
                                [listId]: {
                                    ...state[owner][repo][listId],
                                    title: listTitle
                                }
                            }
                        }
                    }
                }else{
                    return state;
                }
            }
        case "DELETE_LIST":
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
                                [id]: deleteList,
                                ...restOfLists
                            }
                        }
                    } = this.state;
                    return {
                        ...state,
                        [owner]: {
                            ...state[owner],
                            [repo]: {
                                ...restOfLists
                            }
                        }
                    }
                }else{
                    return state;
                }
            }
        default:
            {
                return state;
            }
    }
}

export default Lists;