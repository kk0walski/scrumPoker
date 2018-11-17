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
        case "CHANGE_LIST_NAME": {
            const {
                owner,
                repo,
                listId,
                listTitle,
            } = action.payload;
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
        }
        case "DELETE_LIST":
            {
                const {
                    owner,
                    repo,
                    id,
                } = action.payload;
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
                        [repo]: {
                            ...restOfLists
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

export default Lists;