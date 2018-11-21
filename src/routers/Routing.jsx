import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "./Dasboard";
import Repositories from "../components/Repositories";

export default class Routing extends Component {

    render() {
        const { user } = this.props;
        if (user && user.token) {
            return (
                <Switch >
                    <Route exact path="/repositories" component={Repositories} />
                    <Route path="/repositories/:user/:repo" component={Dashboard} />
                    <Redirect to='/repositories' />
                </Switch >
            )
        } else {
            return (
                <Switch >
                    <Route path='/login' component={Login} />
                    <Redirect to='/login' />
                </Switch >
            )
        }
    }
}
