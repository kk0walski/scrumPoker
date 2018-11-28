import React, { Component } from 'react';
import ListIssues from "./IssuesList";
import { connect } from "react-redux";
import CreateListModal from './CreateListModal'

class Issues extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.closeModalAndClear = this.closeModalAndClear.bind(this);
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

    closeModalAndClear() {
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

    createList(toMove) {
        var list = prompt("Please enter list name", "Test")
        if (list !== null && list !== "") {
            console.log(list)
        }
    }

    render() {
        const { owner, name } = this.props.match.params;
        const { issues, modalOpen } = this.state;
        const { match, location } = this.props
        return (
            <div>
                {location.state && location.state.reason && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>You have no list</strong> To create game first you mast create list to be you backlog
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                {owner &&
                    name &&
                    <ListIssues owner={owner}
                        repo={name}
                        match={match}
                        filterLabels={[]}
                        buttonText={"Create List"}
                        moveIssues={this.showModal} />}
                <CreateListModal issues={issues} match={match} modalOpen={modalOpen} repo={name} closeAndClear={this.closeModalAndClear} closeModal={this.closeModal} />
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Issues);