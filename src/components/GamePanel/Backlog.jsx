import React, { Component } from 'react';
import classnames from 'classnames';
import IssueItem from "../IssueItem";

export default class Backlog extends Component {

    render() {
        const { title, issues, issuesObject } = this.props;
        return (
            <div className="card">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {title}
                        </button>
                    </h5>
                </div>
                <div id="collapseOne"className="collapse" aria-labelledby="headingOne"data-parent="#accordionExample">
                    <div className="card-body">
                        <ul className="list-group" >
                            {issues.map((node, index) => {
                                if (issuesObject[node.id]) {
                                    return (
                                        <li key={node.id} className={classnames('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center',
                                         {'active':this.props.selectedStory === index})} onClick={(e) => this.props.selectStory(index)}>
                                            <IssueItem issue={issuesObject[node.id]} key={node.id} />
                                            <span className="badge badge-secondary badge-pill">{node.finalScore === "" || !node.finalScore ? "none" : node.finalScore}</span>
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