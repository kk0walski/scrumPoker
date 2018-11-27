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
        list: issues
    }
});

export const justAddList = (listData = {}) => ({
    type: "ADD_LIST",
    payload: listData
})

export const startAddList = (owner, repo, title, list) => {
    return dispatch => {
        const ref = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("lists")
            .doc();
        const key = ref.id;
        const newList = {
            id: key,
            title,
            list
        }
        ref.set(newList).then(() => {
            dispatch(addList(owner, repo, key, title, list))
        })
    }
}