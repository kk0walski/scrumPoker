import React, { Component } from 'react';
import { connect } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { firebase } from "./firebase/firebase";
import { enterAsUser } from "./actions/User";

class Login extends Component {

    handleSocialLogin = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("repo");
        provider.addScope("user");
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                if (result && result.credential && result.user) {
                    const token = result.credential.accessToken;
                    this.props.enterAsUser(result.user, token);
                }
            });
    };

    handleSocialLoginFailure = err => {
        console.error(err);
    };

    render() {
        return (
            <div class="row">
                <div class="col-md-7 mx-auto">
                    <div class="card card-signin my-5">
                        <img class="card-img-top" src="github-mark.png" alt="Github logo" />
                        <div class="card-body">
                            <h5 class="card-title">Github Loging</h5>
                            <p class="card-text">Thanks github integration you can give scales to your github issues</p>
                            <button class="btn btn-primary" onClick={this.handleSocialLogin}><FaGithub /> Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    enterAsUser: (user, token) => dispatch(enterAsUser(user, token))
  });
  
  export default connect(
    undefined,
    mapDispatchToProps
  )(Login);