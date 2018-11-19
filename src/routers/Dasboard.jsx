import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import GamesList from "../components/GamesList"
import CreateGame from "../components/CreateGame"
import Issues from "../components/Issues";
import Lists from "../components/Lists";
import { connect } from "react-redux";
import db from "../firebase/firebase";
import { justAddList } from "../actions/Lists";
import { addGame } from "../actions/Game";

class Dasboard extends Component {

    componentWillMount = () => {
        const { user, repo } = this.props.match.params;
        this.lists = db
            .collection("users")
            .doc(user.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("lists")
            .onSnapshot(querySnapchot => {
                querySnapchot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        this.props.justAddList({ ...change.doc.data(), owner: user, repo });
                    }
                    if (change.type === "modified") {
                        this.props.justAddList({ ...change.doc.data(), owner: user, repo });
                    }
                    if (change.type === "removed") {
                        console.log("REMOVE CARD: ", change.doc.data());
                    }
                });
            });
        this.games = db
        .collection("users")
        .doc(user.toString())
        .collection("repos")
        .doc(repo.toString())
        .collection("games")
        .onSnapshot(querySnapchot => {
            querySnapchot.docChanges().forEach(change => {
                if (change.type === "added") {
                    console.log("GAME_ADDED: ", change.doc.data())
                    this.props.addGame({ ...change.doc.data(), owner: user, repo });
                }
                if (change.type === "modified") {
                    this.props.addGame({ ...change.doc.data(), owner: user, repo });
                }
                if (change.type === "removed") {
                    console.log("REMOVE CARD: ", change.doc.data());
                }
            });
        });
    };

    componentWillUnmount = () => {
        this.lists();
        this.games();
    };

    render() {
        const { match } = this.props;
        return (
            <div className="container-fluid">
                <div className="row wrapper">
                    <aside className="col-12 col-sm-2 p-0 bg-light">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
                            <p className="navbar-brand"><i className="fa fa-bullseye fa-fw"></i> Dashboard</p>
                            <p className="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                                <span className="navbar-toggler-icon"></span>
                            </p>
                            <div className="collapse navbar-collapse sidebar">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item">
                                        <NavLink exact to={`${match.url}/issues`} className="nav-link" activeClassName="active">Issues</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <NavLink exact to={`${match.url}/lists`} className="nav-link" activeClassName="active">Lists</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to={`${match.url}/saved_games`} className="nav-link" activeClassName="active">Saved games</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to={`${match.url}/create_game`} className="nav-link" activeClassName="active">Create game</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <main className="col bg-faded py-3">
                        <Switch >
                            <Route path='/repositories/:owner/:name/issues' component={Issues} />
                            <Route path='/repositories/:owner/:name/lists' component={Lists} />
                            <Route path='/repositories/:owner/:name/saved_games' component={GamesList} />
                            <Route path="/repositories/:owner/:name/create_game" component={CreateGame} />
                            <Redirect to={`${match.url}/issues`} />
                        </Switch >
                    </main>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    justAddList: (owner, name, id, title, issues) => dispatch(justAddList(owner, name, id, title, issues)),
    addGame: (game) => dispatch(addGame(game))
});

export default connect(
    undefined,
    mapDispatchToProps
)(Dasboard);