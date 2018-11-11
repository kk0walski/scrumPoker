import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import GamesList from "../components/GamesList"
import CreateGame from "../components/CreateGame"
import CreateList from "../components/CreateList"
import IssuesLists from '../components/IssuesLists'
import Account from "../components/Account"

export default class Dasboard extends Component {
    render() {
        const { match } = this.props;
        console.log("MATCH: ", match);
        return (
            <div className="container">
                <div className="container-fluid">
                    <div className="row wrapper">
                        <aside className="col-12 col-sm-3 p-0 bg-light">
                            <nav className="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
                                <p className="navbar-brand"><i className="fa fa-bullseye fa-fw"></i> Dashboard</p>
                                <p className="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                                    <span className="navbar-toggler-icon"></span>
                                </p>
                                <div className="collapse navbar-collapse sidebar">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item">
                                            <NavLink exact to= {`${match.url}/saved_games`}className="nav-link" activeClassName="active">Saved games</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact to={`${match.url}/create_game`} className="nav-link" activeClassName="active">Create game</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact to={`${match.url}/issues_lists`} className="nav-link" activeClassName="active">Saved lists</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact to={`${match.url}/create_list`} className="nav-link" activeClassName="active">Create List</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact to={`${match.url}/account`} className="nav-link" activeClassName="active">My Account</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </aside>
                        <main className="col bg-faded py-3">
                            <Switch >
                                <Route path='/repositories/:id/saved_games' component={GamesList} />
                                <Route path="/repositories/:id/create_game" component={CreateGame} />
                                <Route path="/repositories/:id/create_list" component={CreateList} />
                                <Route path="/repositories/:id/issues_lists" component={IssuesLists} />
                                <Route path="/repositories/:id/account" component={Account} />
                                <Redirect to={`${match.path}/saved_games`} />
                            </Switch >
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
