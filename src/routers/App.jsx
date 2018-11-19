import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from '../components/Home';
import { connect } from "react-redux";
import GamePanel from "../components/GamePanel";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <Switch>
        <Route path="/:owner/:repo/play/:game" component={GamePanel} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps
  )(App)
);