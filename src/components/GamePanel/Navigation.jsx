import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { firebase } from "../../firebase/firebase";
import { connect } from "react-redux";

class Navigation extends Component {

  handleLogOut = () => {
    const { dispatch } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOG_OUT" });
      });
  };

  render() {
    const { user } = this.props
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">PlanningPoker.pl</Link>
        <div className="justify-content-end">
          {user ?  !user.isAnonymous ? <li className="nav-item dropdown">
            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {user.email}
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to="/profile" className="dropdown-item" >Account</Link>
              <Link to="/repositories" className="dropdown-item" >Repositories</Link>
              <Link to="/" className="dropdown-item" onClick={this.handleLogOut}>Log out</Link>
            </div>
          </li> : <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {user.displayName}
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to="/support" className="dropdown-item">Support</Link>
              </div>
            </li> : null}

        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Navigation);