import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import { connect } from "react-redux";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Navigation extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
};

  constructor(props){
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  async handleLogOut() {
    const { dispatch, cookies } = this.props;
    await firebase.auth().signOut()
    dispatch({ type: "LOG_OUT" })
    cookies.remove('token', { path: '/' })
    return true;
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">PlanningPoker</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              {user ? <li class="nav-item dropdown ml-auto">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {user.email}
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <Link to="/profile" className="dropdown-item" >Account</Link>
                  <Link to="/repositories" className="dropdown-item" >Repositories</Link>
                  <Link to="/" className="dropdown-item" onClick={this.handleLogOut}>Log out</Link>
                </div>
              </li> : null}
            </ul>
            <div className="collapse navbar-collapse justify-content-end">
            </div>
          </div>
        </div>
      </nav>
    )
  }
}



const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withCookies(Navigation));