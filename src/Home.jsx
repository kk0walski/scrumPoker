import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navigation user={user} />
        <div className="container">
          <Switch>
            <Route path='/login' component={Login} />
            <Redirect to='/' />
          </Switch>
          <hr />
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);