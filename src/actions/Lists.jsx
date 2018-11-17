import db from "../firebase/firebase";

export const changeListName = (owner, repo, listId, listTitle) => ({
    type: "CHANGE_LIST_NAME",
    payload: {
        owner,
        repo,
        listId,
        listTitle
    }
})

export const startChangeListName = (owner, repo, listId, listTitle) => {
    return dispatch => {
        db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("lists")
            .doc(listId.toString())
            .update({
                title: listTitle
            })
            .then(() => {
                dispatch(changeListName(owner, repo, listId, listTitle))
            });
    }
}

export const addList = (owner, repo, listId, listTitle, issues) => ({
    type: "ADD_LIST",
    payload: {
        owner,
        repo,
        id: listId,
        title: listTitle,
        issues
    }
});

export const startAddList = (owner, repo, listTitle, issues) => {
    return dispatch => {
        const ref = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("lists")
            .doc();
        const key = ref.id;
        const list = {
            id: key,
            title: listTitle,
            issues
        }
        ref.set(list).then(() => {
            dispatch(addList(owner, repo, key, listTitle, issues))
        })
    }
}