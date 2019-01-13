import db from "../firebase/firebase";

export const addGame = (gameData = {}) => ({
    type: "ADD_GAME",
    payload: gameData
})

export const startAddGame = (owner, repo, gameData = {}, storyList = []) => {
    return dispatch => {
        const regex = new RegExp('^scrumPoker:\\d+$', 'g')
        const ref = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc();
        const key = ref.id;
        const newGame = {
            id: key,
            ...gameData
        }
        const storyListToPush = storyList.map(listItem => {
            const gitLabel = listItem.labels.find(label => label.name.match(regex))
            return {
                id: listItem.number,
                owner,
                flipped: false,
                project: repo,
                finalScore: gitLabel ? gitLabel.name.split(':')[1] : "",
                votes: {}
            }
        })
        ref.set(newGame).then(() => {
            storyListToPush.forEach(story => {
                ref.collection("backlog").doc(story.id.toString()).set(story)
            })
        })
    }
}

export const startUpdateGameSettings = (owner, repo, game, updateData) => {
    return dispatch => {
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString());

        gameRef.update(updateData)
    }
}

export const addStoryToGame = (storyData = {}) => ({
    type: "ADD_STORY_TO_GAME",
    payload: storyData
})

export const addUserToGame = (owner, repo, game, user = {}) => {
    return {
        type: "ADD_USER_TO_GAME",
        payload: {
            owner,
            repo,
            game,
            user
        }
    }
}

export const startAddUserToGame = (owner, repo, game, user = {}) => {
    return dispatch => {
        var userUpdate = {}
        const tempUser = {
            email: user.email,
            isAnonymous: user.isAnonymous,
            id: user.uid,
            name: user.displayName,
            online: true
        };
        userUpdate["users." + user.uid.toString()] = tempUser
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())

        gameRef.update(userUpdate).then(() => {
            dispatch(addUserToGame(owner, repo, game, tempUser))
        });
    }
}

export const selectStory = (owner, repo, game, story) => ({
    type: "SELECT_STORY",
    payload: {
        owner,
        repo,
        game,
        story: story
    }
})

export const startSelectStory = (owner, repo, game, story, previous) => {
    return dispatch => {
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())

        gameRef.update({
            selectedStory: story
        }).then(() => {
            dispatch(selectStory(owner, repo, game, story))
        })
    }
}

export const startAddUserToStory = (owner, repo, game, story, user) => {
    return dispatch => {
        const storyRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())
            .collection("backlog")
            .doc(story.id.toString())
        const storyUpdate = {}
        const tempUser = {
            id: user.id,
            name: user.name
        }
        storyUpdate["votes." + user.id.toString()] = tempUser
        storyRef.update(storyUpdate);
    }
}

export const startVote = (owner, repo, game, story, user, card) => {
    return dispatch => {
        const storyRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.id.toString())
            .collection("backlog")
            .doc(story.id.toString())
        const storyUpdate = {}
        const tempUser = {
            id: user.uid,
            name: user.displayName,
            value: card
        }
        storyUpdate["votes." + user.uid.toString()] = tempUser
        storyRef.update(storyUpdate);
    }
}

export const flipCards = (owner, repo, game, story, calculateEnabled) => {
    return dispatch => {
        const storyRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.id.toString())
            .collection("backlog")
            .doc(story.id.toString())
        var newStory = story
        if (calculateEnabled) {
            var dlugosc = 0
            var suma = 0;
            const cardSet = game.cardSet.map(card => card.value);
            for (var key in newStory.votes) {
                const tempValue = newStory.votes[key].value
                if (!isNaN(tempValue)) {
                    suma += newStory.votes[key].value
                    dlugosc++;
                } else {
                    if (tempValue === undefined || tempValue === null || tempValue === "") {
                        newStory.votes[key].value = "pass";
                    }
                }
            }
            if (dlugosc > 0) {
                const reasult = Math.round(suma / dlugosc);
                const moreThanResult = cardSet.filter(value => value >= reasult);
                newStory.finalScore = moreThanResult[0]
                newStory.flipped = true;
                storyRef.update(newStory)
            } else {
                newStory.finalScore = "";
                newStory.flipped = true;
                storyRef.update(newStory)
            }
        } else {
            newStory.flipped = true;
            storyRef.update(newStory);
        }
    }
}

export const resetCards = (owner, repo, game, story) => {
    return dispatch => {
        const storyRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())
            .collection("backlog")
            .doc(story.id.toString())
        var newStory = story
        for (var key in newStory.votes) {
            delete newStory.votes[key].value
        }
        newStory.finalScore = ""
        newStory.flipped = false;
        storyRef.update(newStory);
    }
}

export const justRemoveGame = (owner, repo, game) => ({
    type: "DELETE_GAME",
    payload: {
        owner,
        repo,
        game
    }
})

export const startRemoveGame = (owner, repo, game) => {
    return dispatch => {
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())

        gameRef.delete().then(() => {
            dispatch(justRemoveGame(owner, repo, game))
        })
    }
}

export const justEditStoryScore = (owner, repo, game, story, value) => ({
    type: "EDIT_STORY",
    payload: {
        owner,
        repo,
        game,
        story,
        value
    }
})

export const startEditStoreScore = (owner, repo, game, story, score) => {
    return dispatch => {
        const storyRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())
            .collection("backlog")
            .doc(story.toString())

            storyRef.update({
                finalScore: score
            }).then(
                dispatch(justEditStoryScore(owner, repo, game, story, score))
            )
    }
}