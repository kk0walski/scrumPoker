import React, { Component } from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";
import db, { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User";
import Modal from "./UserModal";
import Content from "./GameContent";
import { addGame } from "../../actions/Game";
import { justAddList } from "../../actions/Lists";

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
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
          } else {
            if (firebaseUser.email && firebaseUser.displayName) {
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

  updateUser(name, email) {
    this.state.user.updateProfile({
      displayName: name
    }).then(() => {
      this.state.user.updateEmail(email).then(() => this.props.enterAsGuest(firebase.auth().currentUser))
    })
    this.setState({ modalOpen: false })
  }

  render() {
    const { user } = this.props;
    const { modalOpen } = this.state;
    const { owner, repo, game } = this.props.match.params
    return (
      <div>
        <Navigation user={user} />
        <div className="container-fluid">
          <Content owner={owner} repo={repo} gameId={game} />
        </div>
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
  justAddList: (owner, name, id, title, issues) => dispatch(justAddList(owner, name, id, title, issues))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);