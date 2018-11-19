import React, { Component } from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { firebase } from "../../firebase/firebase";
import { enterAsGuest } from "../../actions/User"

class GamePanel extends Component {

  componentWillMount(){
    if(!this.props.user){
      firebase.auth().signInAnonymously();
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          const name = prompt("podaj imię")
          this.props.enterAsGuest({...firebaseUser, displayName: name});
          console.log("użytkownik zalogowany")
        }
      });
    }
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
  enterAsGuest: (user) => dispatch(enterAsGuest(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel);