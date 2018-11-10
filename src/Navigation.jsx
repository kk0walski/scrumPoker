import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <Link class="navbar-brand" to="/">PlanningPoker.pl</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/blog">Blog</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <div class="collapse navbar-collapse justify-content-end">
              {user ? <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <button class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Karol Kowalski
                  </button>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/profile" class="dropdown-item" href="#">Account</Link>
                    <Link to="/projects" class="dropdown-item" href="#">Projects</Link>
                    <Link to="/issues" class="dropdown-item" href="#">Issues</Link>
                  </div>
                </li>
              </ul> :
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link class="nav-link" to="login">Log in <span class="sr-only">(current)</span></Link>
                  </li>
                </ul>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
