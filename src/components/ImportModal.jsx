import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from "react-redux";
import Modal from 'react-modal';
import IssueItem from './IssueItem';

class ImportModal extends Component {

    constructor(props) {
        super(props);
        this.importData = this.importData.bind(this);
        this.state = {
            progress: 0
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

    async importData(issues) {
        const { owner, name } = this.props.match.params;
        var i;
        for (i = 0; i < issues.length; i++) {
            const newLabels = Array.from(new Set(issues[i].labels.map(label => label.name)))
            const importIssue = { owner, repo: name, body: issues[i].body, title: issues[i].title, labels: newLabels }
            await this.octokit.issues.create(importIssue)
            this.setState({
                progress: (i * 100) / issues.length
            })
        }
        this.props.closeAndClear();
    }

    render() {
        const { issues, repo } = this.props;
        const { progress } = this.state;
        return (
            <Modal
                isOpen={this.props.modalOpen}
                contentLabel={repo}
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
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
                        <div class="progress-bar" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.importData(issues)}>Import</button>
                    </div>
                </div>
            </Modal>
        )
    }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ImportModal);