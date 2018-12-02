import React, { Component } from 'react';
import db from "../firebase/firebase";

export default class GameExport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issues: []
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

    async exportToGithub(issues) {
        const { owner, repo } = this.props;
        const regex = new RegExp('^scrumPoker:\\d+$', 'g')
        await issues.forEach(async issue => {
            const toRemove = issue.labels.filter(label => label.name.match(regex))
           await  toRemove.forEach( async remove => {
                await this.octokit.issues.removeLabel({owner, repo, number: issue.number, name: remove.name})
            })
            await this.octokit.issues.addLabels({owner, repo, number: issue.number, labels: ["scrumPoker:" + issue.finalScore]})
        })
        this.props.closeModal()
    }

    async componentDidMount() {
        const { owner, repo, game } = this.props
        await db.collection("users")
            .doc(owner.toString())
            .collection("repos")
            .doc(repo.toString())
            .collection("games")
            .doc(game.id.toString())
            .collection("backlog")
            .get().then(async querySnapchot => {
                await querySnapchot.forEach(async issue => {
                    if (!isNaN(issue.data().finalScore)) {
                        const fireIssue = issue.data();
                        const newIssue = await this.octokit.issues.get({ owner, repo, game, number: fireIssue.id })
                        this.setState({
                            issues: [...this.state.issues, { ...newIssue.data, finalScore: fireIssue.finalScore }]
                        })
                    }
                })
            })
    }

    render() {
        const { issues } = this.state;
        return (
            <div className="modal-wrapper">
                <div className="modal-header-blue">
                    <h2 className="text-light">Export scores to github</h2>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <ul className="list-group">
                            {issues.map(node => {
                                return (
                                    <li  key={node.number} className="list-group-item d-flex justify-content-between align-items-center">
                                        {node.title}
                                        <span className="badge badge-primary badge-pill">{node.finalScore}</span>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>
                            CANCEL
                </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.exportToGithub(issues)}>EXPORT</button>
                    </div>
                </div>
            </div>
        )
    }
}
