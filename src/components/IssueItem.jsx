import React, { Component } from 'react';
import classnames from "classnames";
import Moment from 'react-moment';

export default class IssueItem extends Component {
    render() {
        const { issue } = this.props;
        return (
                <div className={classnames('p-2')}>
                    <h5>
                          <a href={issue.html_url} className="list-group-item-action">{issue.title}</a>  
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
        )
    }
}
