import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from '../components/Home';
import { connect } from "react-redux";
import GamePanel from "../components/GamePanel";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { firebase } from "../firebase/firebase";
import { enterAsUser } from "../actions/User";

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token'),
      loading: false,
      user: undefined
    };
  }

  async componentWillMount() {
    this.setState({ loading: true })
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (!this.props.user) {
        if (firebaseUser && !firebaseUser.isAnonymous && this.state.token) {
          this.props.enterAsUser(firebaseUser, this.state.token)
          this.setState({ loading: false })
        } else {
          this.setState({ loading: false })
        }
      } else {
        if (!this.props.user.isAnonymous) {
          this.props.enterAsUser(this.props.user, this.state.token)
          this.setState({ loading: false })
        } else {
          this.setState({ loading: false })
        }
      }
    })
  }


  render() {
    if (!this.state.loading) {
      return (
        <Switch>
          <Route path="/:owner/:repo/play/:game" component={GamePanel} />
          <Route path="/" component={Home} />
        </Switch>
      );
    } else {
      return (
        <p>Loading</p>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  enterAsUser: (user, token) => dispatch(enterAsUser(user, token))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withCookies(App))
);