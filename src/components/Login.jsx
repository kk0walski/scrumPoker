import React, { Component } from 'react';
import { connect } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { firebase } from "../firebase/firebase";
import { enterAsUser } from "../actions/User";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.handleSocialLogin = this.handleSocialLogin.bind(this);
        this.state = {
            token: cookies.get('accessToken'),
            user: undefined
        };
    }

    handleSocialLogin(event) {
        const { cookies } = this.props;
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("repo");
        provider.addScope("user");
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                if (result && result.credential && result.user) {
                    const token = result.credential.accessToken;
                    cookies.set('token', token, { path: '/'})
                    this.props.enterAsUser(result.user, token);
                }
            }).catch(error => {
                console.error(error.message);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="card card-signin my-5">
                        <img className="card-img-top" src="github-mark.png" alt="Github logo" />
                        <div className="card-body">
                            <h5 className="card-title">Github Loging</h5>
                            <p className="card-text">Thanks github integration you can give scales to your github issues</p>
                            <button className="btn btn-primary" onClick={event => this.handleSocialLogin(event)}><FaGithub /> Login</button>
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
)(withCookies(Login));