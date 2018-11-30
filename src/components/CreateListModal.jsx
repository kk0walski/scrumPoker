import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from "react-redux";
import Modal from 'react-modal';
import IssueItem from './IssueItem';
import { startAddList } from "../actions/Lists";

class CreateListModal extends Component {
    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            progress: 0,
            title: ''
        }
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
    }

    checkIssues(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i].number !== arr2[i].number)
                return false;
        }

        return true;
    }

    componentDidUpdate(prevProps) {
        if (!this.checkIssues(prevProps.issues, this.props.issues)) {
            this.setState({
                progress: 0
            })
        }
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    async createList(issues) {
        const { owner, name } = this.props.match.params;
        const { title } = this.state;
        var issuesList = []
        var i;
        for (i = 0; i < issues.length; i++) {
            issuesList.push(issues[i].number)
            this.setState({
                progress: (i * 100) / issues.length
            })
        }
        this.props.startAddList(owner, name, title, issuesList);
        this.props.closeAndClear();
    }

    render() {
        const { issues, repo } = this.props;
        const { progress, title } = this.state;
        return (
            <Modal
                isOpen={this.props.modalOpen}
                contentLabel={repo}
                overlayClassName="modal-overlay"
                className="modal-dialog modal-dialog--scrollable"
            >
                <div className="modal-wrapper">
                    <div className="modal-header-blue">
                        <h2 className="text-light">Create List</h2>
                    </div>
                    <div className="modal-content">
                        <input className={classnames('form-control')} type="text" placeholder="List name" value={title} onChange={this.handleChange} />
                        <div className="modal-body">
                            <ul className="list-group">
                                {issues.map(node => {
                                    return (
                                        <li key={node.number} className={classnames('list-group-item')}>
                                            <IssueItem issue={node} key={node.number} />
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>
                                CANCEL
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.createList(issues)}>CREATE_LIST</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
    startAddList: (owner, repo, listTitle, issues) => dispatch(startAddList(owner, repo, listTitle, issues))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateListModal);