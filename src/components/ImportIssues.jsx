import React, { Component } from 'react';
import ListIssues from "./IssuesList";
import { connect } from "react-redux";
import ImportModal from './ImportModal';

class ImportIssues extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.importData = this.importData.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            filterLabels: [],
            issues: [],
            modalOpen: false
        }
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    importData(toMove) {
        const { owner, name } = this.props.match.params;
        toMove.forEach(issue => {
            const newLabels = Array.from(new Set(issue.labels.map(label => label.name)))
            const importIssue = { owner, repo: name, body: issue.body, title: issue.title, labels: newLabels }
            this.octokit.issues.create(importIssue)
        })
        this.setState({
            issues: [],
            modalOpen: false
        })
    }

    showModal(toMove) {
        this.setState({
            issues: Object.values(toMove),
            modalOpen: true
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
        const { organisation, repository, filterLabels, issues, modalOpen } = this.state;
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
                {organisation && repository && <ListIssues owner={organisation}
                    repo={repository}
                    filterLabels={filterLabels}
                    match={match}
                    buttonText={"Import Issues"}
                    moveIssues={this.showModal} />}
                <ImportModal issues={issues} modalOpen={modalOpen} import={this.importData} closeModal={this.closeModal} />
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ImportIssues);