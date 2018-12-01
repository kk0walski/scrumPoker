import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { firebase } from "../../firebase/firebase";
import { connect } from "react-redux";
import SettingsModal from "./SettingsModal";

class Navigation extends Component {

  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { 
      settingsOpen: false
    }
  }

  handleLogOut = () => {
    const { dispatch } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOG_OUT" });
      });
  };

  openModal(){
    this.setState({
      settingsOpen: true
    })
  }

  closeModal(){
    this.setState({
      settingsOpen: false
    })
  }

  render() {
    const { owner, repo, user, game } = this.props;
    const { settingsOpen } = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">PlanningPoker.pl</Link>
            <ul className="nav justify-content-end">
              {user.uid === game.firebaseOwner && <li><button type="button" className="btn btn-outline-secondary">End Game</button></li>}
              {user.uid === game.firebaseOwner && <li><button type="button" className="btn btn-outline-secondary" onClick={this.openModal}>Settings</button></li>}
              {user ? !user.isAnonymous ? <li className="nav-item dropdown">
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
            </ul>
          </div>
        </nav>
        <SettingsModal owner={owner} repo={repo} game={game} user={user} settingsOpen={settingsOpen} closeModal={this.closeModal}/>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Navigation);