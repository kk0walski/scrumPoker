import db from "../firebase/firebase";
import { firebase } from "../firebase/firebase"

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

export const startSelectStory = (owner, repo, game, story, previous) => {
    return dispatch => {
        const gameRef = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.toString())

        if (previous.finalScore === "" || !previous.finalScore) {
            for(var key in previous.votes){
                if(!previous.votes.hasOwnProperty(key)) continue;
                    delete previous.votes[key].value
            }
            gameRef.collection("backlog").doc(previous.id.toString()).update({
                votes: previous.votes
            })
        }

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
            id: user.uid,
            name: user.displayName
        }
        storyUpdate["votes." + user.uid.toString()] = tempUser
        storyRef.update(storyUpdate);
    }
}

export const startVote = (owner, repo, game, story, user,  card) => {
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
            id: user.uid,
            name: user.displayName,
            value: card
        }
        storyUpdate["votes." + user.uid.toString()] = tempUser
        storyRef.update(storyUpdate);
    }
}

export const flipCards = (owner, repo, game, story) => {
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
        var dlugosc = 0
        var suma = 0;

        for(var key in story.votes){
            const tempValue  = story.votes[key].value
            if((tempValue !== null && tempValue !== "?")  || !story.votes[key].value){
                suma += story.votes[key].value
                dlugosc++;
            }else{
                story.votes[key].value = "pass";
            }
        }
        const finalValue = suma/dlugosc
    }
}