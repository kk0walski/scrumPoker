import React, { Component } from 'react';
import db from "../firebase/firebase";
import { justAddList } from "../actions/Lists";
import { connect } from "react-redux";

class Lists extends Component {

    componentWillMount = () => {
        const { owner, name } = this.props.match.params;
        this.lists = db
            .collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(name.toString())
            .collection("lists")
            .onSnapshot(querySnapchot => {
                querySnapchot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        this.props.justAddList({ ...change.doc.data(), owner, repo: name });
                    }
                    if (change.type === "modified") {
                        this.props.justAddList({ ...change.doc.data(), owner, repo: name });
                    }
                    if (change.type === "removed") {
                        console.log("REMOVE CARD: ", change.doc.data());
                    }
                });
            });
    };

    componentWillUnmount = () => {
        this.lists();
    };
    render() {
        console.log("LISTS: ", this.props.lists)
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { owner, name }  = ownProps.match.params;
    console.log("PROPS: ", state.lists);
    return {
      lists: state.lists[owner] && state.lists[owner][name] ? Object.values(state.lists[owner][name]) : []
    };
  };

const mapDispatchToProps = dispatch => ({
    justAddList:  (owner, name, id, title, issues) => dispatch(justAddList (owner, name, id, title, issues))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lists);