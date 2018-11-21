import React, { Component } from 'react'

export default class ActiveIssue extends Component {
  render() {
    const { issues, issueId} = this.props;
    return (
      <div>
          {issues[issueId].title}
      </div>
    )
  }
}
