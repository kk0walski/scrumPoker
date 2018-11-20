import React, { Component } from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User"

class GamePanel extends Component {

  componentWillMount(){
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(!this.props.user){
          console.log("USER: ", firebaseUser);
          if(firebaseUser){
            if(!firebaseUser.isAnonymous){
              this.props.enterAsUser(firebaseUser)
            }else {
              const email = prompt("Podaj email: ")
              this.props.enterAsGuest({...firebaseUser, email})
            }
          }else {
            firebase.auth().signInAnonymously().then(annonymousUser => {
              const email = prompt("Podaj email: ")
              this.props.enterAsGuest({...annonymousUser, email});
            })
          }
        }
      });
  }

  render() {
    const { user } = this.props;
    if(user){
      return (
        <div>
          <Navigation user={user}/>
        </div>
      )
    }else {
      return (
        <div>

        </div>
      )
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  enterAsGuest: (user) => dispatch(enterAsGuest(user)),
  enterAsUser: (user, token) => dispatch(enterAsUser(user, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);