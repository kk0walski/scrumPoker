import React, { Component } from 'react';
import { connect } from "react-redux";
import db, { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User";
import Modal from "./UserModal";
import { addGame, startAddUserToGame } from "../../actions/Game";
import { justAddList } from "../../actions/Lists";
import GameContainer from "./GameContainer"

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.addUserToGame = this.addUserToGame.bind(this);
    this.state = {
      modalOpen: false,
      user: undefined
    }
  }

  componentWillMount = () => {
    const { owner, repo } = this.props.match.params
    this.lists = db
      .collection("users")
      .doc(owner.toString())
      .collection("repos")
      .doc(repo.toString())
      .collection("lists")
      .onSnapshot(querySnapchot => {
        querySnapchot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.props.justAddList({ ...change.doc.data(), owner, repo });
          }
          if (change.type === "modified") {
            this.props.justAddList({ ...change.doc.data(), owner, repo });
          }
          if (change.type === "removed") {
            console.log("REMOVE CARD: ", change.doc.data());
          }
        });
      });
    this.games = db
      .collection("users")
      .doc(owner.toString())
      .collection("repos")
      .doc(repo.toString())
      .collection("games")
      .onSnapshot(querySnapchot => {
        querySnapchot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.props.addGame({ ...change.doc.data(), owner, repo });
          }
          if (change.type === "modified") {
            this.props.addGame({ ...change.doc.data(), owner, repo });
          }
          if (change.type === "removed") {
            console.log("REMOVE CARD: ", change.doc.data());
          }
        });
      });
  };

  componentWillUnmount = () => {
    this.lists();
    this.games();
  };


  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (!this.props.user) {
        if (firebaseUser) {
          if (!firebaseUser.isAnonymous) {
            this.props.enterAsUser(firebaseUser)
            this.addUserToGame(firebaseUser)
          } else {
            if (firebaseUser.displayName) {
              this.props.enterAsGuest(firebaseUser)
            } else {
              this.setState({ modalOpen: true, user: firebaseUser })
            }
          }
        } else {
          firebase.auth().signInAnonymously()
          this.setState({ modalOpen: true, user: firebase.auth().currentUser })
        }
      }
    });
  }

  updateUser(name) {
    this.state.user.updateProfile({
      displayName: name
    }).then(() => {
      this.setState({ modalOpen: false })
      this.addUserToGame(this.state.user)
      this.props.enterAsGuest(firebase.auth().currentUser)
    })
  }

  addUserToGame(user) {
    const { owner, repo, game } = this.props.match.params;
    this.props.startAddUserToGame(owner, repo, game, user);
  }

  render() {
    const { user } = this.props;
    const { modalOpen } = this.state;
    const { owner, repo, game } = this.props.match.params
    return (
      <div>
        <GameContainer owner={owner} repo={repo} gameId={game} user={user} />
        <Modal modalOpen={modalOpen} updateUser={this.updateUser} />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  enterAsGuest: (user) => dispatch(enterAsGuest(user)),
  enterAsUser: (user, token) => dispatch(enterAsUser(user, token)),
  addGame: (game) => dispatch(addGame(game)),
  justAddList: (owner, name, id, title, issues) => dispatch(justAddList(owner, name, id, title, issues)),
  startAddUserToGame: (owner, name, game, user) => dispatch(startAddUserToGame(owner, name, game, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);