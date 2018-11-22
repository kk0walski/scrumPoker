import React, { Component } from 'react';
import { connect } from "react-redux";

class GameNav extends Component {

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
        this.state = {
            issuesObject: {}
        }
    }

    componentDidMount() {
        const { owner, repo, issues } = this.props;
        issues.map(issueId => {
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
        const { issuesObject } = this.state;
        return (
            <div className="col-sm-3 float-right">
                <div className="row" style={{ backgroundColor: "#707070", color: "#F7F7F7" }}>
                    <div className="col-2">
                        #
                    </div>
                    <div className="col-6">
                        Story
                    </div>
                    <div className="col-4">
                        Score
                    </div>
                </div>
                <div style={{marginRight: "-15px",marginLeft: "-15px"}}>
                <div class="list-group">
                    {Object.values(issuesObject).map(issue =>
                        <p className="list-group-item">
                            <div className="row">
                                <div className="col-2">
                                    {issue.number}
                                </div>
                                <div className="col-6">
                                    {issue.title}
                                </div>
                                <div className="col-4">
                                </div>
                            </div>
                        </p>)}
                </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(GameNav);