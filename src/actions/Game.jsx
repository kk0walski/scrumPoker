import db from "../firebase/firebase";

export const addGame = (gameData = {}) => ({
    type: "ADD_GAME",
    payload: gameData
})

export const startAddGame = (owner, repo, gameData = {}) => {
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
        })
    }
}

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
        userUpdate["users." + user.uid.toString()] = {
            email: user.email,
            isAnonymous: user.isAnonymous,
            id: user.uid,
            name: user.displayName,
            online: true
        };
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())

        gameRef.update(userUpdate).then(() => {
            dispatch(addUserToGame(owner, repo, game, user))
        });
    }
}