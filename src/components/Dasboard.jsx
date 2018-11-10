import React, { Component } from 'react';
import Nav from './DasnoardNav';
import RoutingDashboard from "./RoutingDashboard"

export default class Dasboard extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row wrapper">
                    <Nav/>
                    <main class="col bg-faded py-3">
                        <RoutingDashboard/>
                    </main>
                </div>
            </div>
        )
    }
}
