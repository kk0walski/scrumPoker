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
            dispatch(addGame({owner, repo, ...gameData}))
        })

    }
}