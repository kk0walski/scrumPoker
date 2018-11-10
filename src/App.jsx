import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from './Home';
import { connect } from "react-redux";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <Switch>
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

