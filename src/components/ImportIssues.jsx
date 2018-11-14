import React, { Component } from 'react';
import ListIssues from "./IssuesList";
import { connect } from "react-redux";

class ImportIssues extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.importData = this.importData.bind(this);
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
            organisation: undefined,
            repository: undefined,
            filterLabels: []
        }
    }

    importData(toMove) {
        const { owner, name } = this.props.match.params;
        const { organisation, repository } = this.state;
        toMove.forEach(issue => {
            this.octokit.issues.get({
                owner: organisation,
                repo: repository,
                number: issue
            }).then(result => {
                const { data } = result;
                const newLabels = Array.from(new Set(data.labels.map(label => label.name)))
                const importIssue = { owner, repo:name, body: data.body, title: data.title, labels: newLabels}
                this.octokit.issues.create(importIssue)
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            organisation: event.target.elements.organisation.value,
            repository: event.target.elements.repository.value,
            filterLabels: (event.target.elements.labels.value === "" ? [] : event.target.elements.labels.value.split(','))
        })
    }

    render() {
        const { organisation, repository, filterLabels } = this.state;
        const { match } = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="organisation">Organisation name</label>
                        <input type="text" className="form-control" name="organisation" id="orgInput" aria-describedby="orgHelp" placeholder="Enter organisation" />
                        <small id="orgHelp" className="form-text text-muted">Organisation which own this repository.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Repository">Repository</label>
                        <input type="text" className="form-control" name="repository" id="exampleRepository" placeholder="Repository" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="organisation">Labels</label>
                        <input type="text" className="form-control" name="labels" id="labelsInput" aria-describedby="labelsHelp" placeholder="Enter organisation" />
                        <small id="labelsHelp" className="form-text text-muted">Labels for filtering data</small>
                    </div>
                    <button type="submit" className="btn btn-primary">SEARCH</button>
                </form>
                {organisation && repository && <ListIssues owner={organisation} repo={repository} filterLabels={filterLabels} match={match} buttonText={"Import Issues"} moveIssues={this.importData} />}
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ImportIssues);