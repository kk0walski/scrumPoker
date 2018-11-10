import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class DasnoardNav extends Component {
    render() {
        return (
            <aside className="col-12 col-sm-3 p-0 bg-light">
                <nav className="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
                    <p className="navbar-brand"><i className="fa fa-bullseye fa-fw"></i> Dashboard</p>
                    <p className="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                        <span className="navbar-toggler-icon"></span>
                    </p>
                    <div className="collapse navbar-collapse sidebar">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <Link to='/dashboard/saved_games' className="nav-link active" href="#">Saved games</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard/create_game' className="nav-link" href="#">Create game</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard/issues_lists' className="nav-link" href="#">Saved lists</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard/create_list' className="nav-link" href="#">Create List</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard/account' className="nav-link" href="#">My Account</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        )
    }
}
