import React, { Component } from 'react';
import Nav from './DasnoardNav';
import { Route, Switch, Redirect } from "react-router-dom";
import GamesList from "./GamesList"
import CreateGame from "./CreateGame"
import CreateList from "./CreateList"
import IssuesLists from './IssuesLists'
import Account from "./Account"

export default class Dasboard extends Component {
    render() {
        const {match} = this.props;
        console.log("MATCH: ", match);
        return (
            <div class="container-fluid">
                <div class="row wrapper">
                    <Nav />
                    <main class="col bg-faded py-3">
                        <Switch >
                            <Route path='/dashboard/saved_games' component={GamesList} />
                            <Route path="/dashboard/create_game" component={CreateGame} />
                            <Route path="/dashboard/create_list" component={CreateList} />
                            <Route path="/dashboard/issues_lists" component={IssuesLists} />
                            <Route path="/dashboard/account" component={Account} />
                            <Route path="/dashboard" component={GamesList}/>
                        </Switch >
                    </main>
                </div>
            </div>
        )
    }
}
