import React, { Component } from 'react';
import { connect } from "react-redux";
import db, { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User";
import Modal from "./UserModal";
import { addGame, addStoryToGame, startAddUserToGame } from "../../actions/Game";
import GameContainer from "./GameContainer"

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.addUserToGame = this.addUserToGame.bind(this);
    this.state = {
      modalOpen: false,
      user: undefined,
    }
  }

  componentWillMount = () => {
    const { owner, repo, game } = this.props.match.params
    this.game = db
      .collection("users")
      .doc(owner.toString())
      .collection("repos")
      .doc(repo.toString())
      .collection("games")
      .doc(game.toString())
      .onSnapshot(doc => {
        this.props.addGame({ ...doc.data(), owner, repo });
      });
    this.issues = db
      .collection("users")
      .doc(owner.toString())
      .collection("repos")
      .doc(repo.toString())
      .collection("games")
      .doc(game.toString())
      .collection("backlog")
      .onSnapshot(querySnapchot => {
        querySnapchot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.props.addStoryToGame({ story: change.doc.data(), owner, repo, game });
          }
          if (change.type === "modified") {
            this.props.addStoryToGame({ story: change.doc.data(), owner, repo, game });
          }
          if (change.type === "removed") {
            console.log("REMOVE CARD: ", change.doc.data());
          }
        });
      });
}

  componentWillUnmount = () => {
    this.game();
    this.issues();
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
              this.addUserToGame(firebaseUser)
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
    if(user){
      return <GameContainer owner={owner} repo={repo} gameId={game} user={user} />
    }else {
      return <Modal modalOpen={modalOpen} updateUser={this.updateUser} />
    }
  }
}


const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  enterAsGuest: (user) => dispatch(enterAsGuest(user)),
  enterAsUser: (user, token) => dispatch(enterAsUser(user, token)),
  addGame: (game) => dispatch(addGame(game)),
  addStoryToGame: (storyData) => dispatch(addStoryToGame(storyData)),
  startAddUserToGame: (owner, name, game, user) => dispatch(startAddUserToGame(owner, name, game, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);