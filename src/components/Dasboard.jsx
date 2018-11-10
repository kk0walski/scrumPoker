import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import GamesList from "./GamesList"
import CreateGame from "./CreateGame"
import CreateList from "./CreateList"
import IssuesLists from './IssuesLists'
import Account from "./Account"

export default class Dasboard extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row wrapper">
                    <aside className="col-12 col-sm-3 p-0 bg-light">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
                            <p className="navbar-brand"><i className="fa fa-bullseye fa-fw"></i> Dashboard</p>
                            <p className="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                                <span className="navbar-toggler-icon"></span>
                            </p>
                            <div className="collapse navbar-collapse sidebar">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item">
                                        <NavLink exact to='/dashboard/saved_games' className="nav-link" activeClassName="active">Saved games</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to='/dashboard/create_game' className="nav-link" activeClassName="active">Create game</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to='/dashboard/issues_lists' className="nav-link" activeClassName="active">Saved lists</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to='/dashboard/create_list' className="nav-link" activeClassName="active">Create List</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink exact to='/dashboard/account' className="nav-link" activeClassName="active">My Account</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <main class="col bg-faded py-3">
                        <Switch >
                            <Route path='/dashboard/saved_games' component={GamesList} />
                            <Route path="/dashboard/create_game" component={CreateGame} />
                            <Route path="/dashboard/create_list" component={CreateList} />
                            <Route path="/dashboard/issues_lists" component={IssuesLists} />
                            <Route path="/dashboard/account" component={Account} />
                            <Redirect to="/dashboard/saved_games" />
                        </Switch >
                    </main>
                </div>
            </div>
        )
    }
}
