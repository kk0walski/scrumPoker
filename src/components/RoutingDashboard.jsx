import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import GamesList from "./GamesList"
import CreateGame from "./CreateGame"
import CreateList from "./CreateList"
import IssuesLists from './IssuesLists'
import Account from "./Account"

export default class RoutingDashboard extends Component {
  render() {
    return (
        <Switch >
            <Route path='/saved_games' component={GamesList} />
            <Route path="/create_game" component={CreateGame}/>
            <Route path="/create_list" component={CreateList} />
            <Route path="/issues_lists" component={IssuesLists} />
            <Route path="/account" component={Account}/>
            <Route path='/' component={GamesList} />
        </Switch >
    )
  }
}
