import React, { Component } from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { firebase } from "../../firebase/firebase";
import { enterAsGuest, enterAsUser } from "../../actions/User";
import Modal from "./UserModal";

class GamePanel extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
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
              this.setState({modalOpen: true})
            }
          }else {
            this.setState({modalOpen: true})
          }
        }
      });
  }

  render() {
    const { user } = this.props;
    const { modalOpen } = this.state;
    return (
        <div>
          <Navigation user={user}/>
          <Modal modalOpen={modalOpen}/>
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