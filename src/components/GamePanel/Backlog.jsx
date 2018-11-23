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