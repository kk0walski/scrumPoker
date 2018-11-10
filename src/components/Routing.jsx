import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dasboard";

export default class Routing extends Component {
    render() {
        const { user } = this.props;
        if (user) {
            return (
                <Switch >
                    <Route path='/dashboard' component={Dashboard}/>
                    <Redirect to='/dashboard' />
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
