import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Routing from "../routers/Routing";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navigation user={user} />
        <div className="container">
          <Routing user={user} />
          <hr />
          <Footer />
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);