import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class DasnoardNav extends Component {
  render() {
    return (
        <aside class="col-12 col-sm-3 p-0 bg-light">
        <nav class="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
            <p class="navbar-brand"><i class="fa fa-bullseye fa-fw"></i> Dashboard</p>
            <a href class="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                <span class="navbar-toggler-icon"></span>
            </a>
            <div class="collapse navbar-collapse sidebar">
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <Link to='saved_games' class="nav-link active" href="#">Saved games</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='create_game' class="nav-link" href="#">Create game</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='issues_lists' class="nav-link" href="#">Saved lists</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='create_list' class="nav-link" href="#">Create List</Link>
                    </li>
                    <li class="nav-item">
                        <Link to='/account' class="nav-link" href="#">My Account</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
    )
  }
}
