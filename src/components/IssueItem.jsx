import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export default class IssueItem extends Component {
    render() {
        const { issue, match } = this.props;
        return (
            <li key={issue.id} className="list-group-item list-group-item-light">
                <div className={classnames('float-left', 'col-9', 'p-2')}>
                    <h5>
                        <Link key={issue.id}
                            className="v-align-middle"
                            to={`${match.url}/${issue.number}`}>
                            {issue.title}
                        </Link>
                        {issue.labels.map(label => (
                            <span key={label.id} className="badge badge-light" style={{
                                backgroundColor: `#${label.color}`
                            }}>
                                {label.name}
                            </span>
                        ))}
                    </h5>
                    <div className={classnames('d-flex', 'flex-wrap')}>
                        <p className={classnames('f6', 'text-gray', 'mr-3', 'mb-0', 'mt-2')}>
                            #{issue.number}
                        </p>
                        <p className={classnames('f6', 'text-gray', 'mr-3', 'mb-0', 'mt-2')}>
                            Updated: <Moment date={issue.updated_at} durationFromNow /> ago by {issue.user.login}
                        </p>
                    </div>
                </div>
            </li>
        )
    }
}
