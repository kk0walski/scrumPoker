import React, { Component } from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User";
import Modal from "./UserModal";

class GamePanel extends Component {

  constructor(props){
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      modalOpen: false,
      user: undefined
    }
  }

  componentWillMount(){
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(!this.props.user){
          console.log("USER: ", firebaseUser);
          if(firebaseUser){
            if(!firebaseUser.isAnonymous){
              this.props.enterAsUser(firebaseUser)
            }else {
              if(firebaseUser.email && firebaseUser.displayName){
                this.props.enterAsGuest(firebaseUser)
              }else{
                this.setState({modalOpen: true, user: firebaseUser})
              }
            }
          }else {
            firebase.auth().signInAnonymously()
            this.setState({modalOpen: true, user: firebase.auth().currentUser})
          }
        }
      });
  }

  updateUser(name, email){
    this.state.user.updateProfile({
      displayName: name
  }).then(() => {
    this.state.user.updateEmail(email).then(() => this.props.enterAsGuest(firebase.auth().currentUser))
  })
  this.setState({modalOpen: false})
  }

  render() {
    const { user } = this.props;
    const { modalOpen } = this.state;
    return (
        <div>
          <Navigation user={user}/>
          <Modal modalOpen={modalOpen} updateUser={this.updateUser}/>
        </div>
      )
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  enterAsGuest: (user) => dispatch(enterAsGuest(user)),
  enterAsUser: (user, token) => dispatch(enterAsUser(user, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);