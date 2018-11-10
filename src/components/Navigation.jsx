import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">PlanningPoker.pl</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <div className="collapse navbar-collapse justify-content-end">
              {user ? <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Karol Kowalski
                  </button>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/profile" className="dropdown-item" >Account</Link>
                    <Link to="/projects" className="dropdown-item" >Projects</Link>
                    <Link to="/issues" className="dropdown-item">Issues</Link>
                  </div>
                </li>
              </ul> :
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="login">Log in <span className="sr-only">(current)</span></Link>
                  </li>
                </ul>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
