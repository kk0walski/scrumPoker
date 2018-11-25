import db from "../firebase/firebase";

export const addGame = (gameData = {}) => ({
    type: "ADD_GAME",
    payload: gameData
})

export const startAddGame = (owner, repo, gameData = {}, storyList = []) => {
    return dispatch => {
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
        ref.set(newGame).then(() => {
            dispatch(addGame({ owner, repo, ...gameData }))
            storyList.forEach(story => {
                ref.collection("backlog").doc(story.id.toString()).set(story)
            })
        })
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

export const startSelectStory = (owner, repo, game, story) => {
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
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())
        const tempUser = {
            id: user.uid,
            name: user.displayName
        }

        console.log("STORY: ", story)
    }
}