import React, { Component } from 'react';
import { connect } from "react-redux";
import Github from 'github-api';

class GamesList extends Component {

  componentDidMount() {
    const { user } = this.props;
    var gh = new Github({
      token: user.token
    })
    var issues = gh.getIssues('microsoft', 'vscode');
    issues.listIssues({
      'labels': 'extensions,bug'
    }).then(result => {
      console.log("RESULT: ", result);
    })
  }

  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(GamesList);