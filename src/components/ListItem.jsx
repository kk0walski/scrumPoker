import React, { Component } from 'react';
import { connect } from "react-redux";
import IssueItem from "./IssueItem";
import classnames from 'classnames';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.octokit = require("@octokit/rest")({
            timeout: 0,
            headers: {
                accept: "application/vnd.github.v3+json",
                "user-agent": "octokit/rest.js v1.2.3" // v1.2.3 will be current version
            },

            // custom GitHub Enterprise URL
            baseUrl: "https://api.github.com"
        });
        this.octokit.authenticate({
            type: "app",
            token: props.user.token
        });
        this.state = {
            issuesObject: {}
        }
    }

    componentDidMount() {
        const { owner, repo, issues } = this.props;
        issues.forEach(issueId => {
            this.octokit.issues.get({ owner, repo, number: issueId }).then(issue => {
                this.setState({
                    issuesObject: {
                        ...this.state.issuesObject,
                        [issueId]: {
                            ...issue.data
                        }
                    }
                })
            })
        })
    }

    render() {
        const { title, id, issues } = this.props;
        const { issuesObject } = this.state;
        return (
            <div className="card">
                <div className="card-header" id={"heading" + id}>
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target={"#"+id} aria-expanded="true" aria-controls={id}>
                            {title}
                        </button>
                    </h5>
                </div>
                <div id={id} className="collapse" aria-labelledby={id} data-parent="#accordion">
                    <div className="card-body">
                        <ul className="list-group" >
                            {issues.map(node => {
                                if (issuesObject[node]) {
                                    return (
                                        <li key={node} className={classnames('list-group-item')}>
                                            <IssueItem issue={issuesObject[node]} key={node} />
                                        </li>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div >)
    }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ListItem);
