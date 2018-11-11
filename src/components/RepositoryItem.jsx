import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export default class RepositoryItem extends Component {
    render() {
        const { repo } = this.props;
        console.log("REPO: ", repo);
        return (
            <li key={repo.id} className="list-group-item list-group-item-light">
                <div className="row">
                    <div className={classnames('col-6', 'col-md-8', 'pr-md-3')}>
                        <h3>
                            <Link className="v-align-middle" to={`/repsoitories/${repo.name}`}>
                                {repo.name}
                            </Link>
                        </h3>
                        <p className={classnames('col-12', 'col-md-9', 'd-inline-block', 'text-gray', 'mb-2', 'pr-4')}>
                            {repo.description}
                        </p>
                        <div className={classnames('d-flex', 'flex-wrap')}>
                            {repo.licence && <p className={classnames('f6', 'text-gray', 'mr-3', 'mb-0', 'mt-2')}>
                                {repo.licence.name}
                            </p>}

                            <p className={classnames('f6', 'text-gray', 'mr-3', 'mb-0', 'mt-2')}>
                                Updated: <Moment date={repo.updated_at} durationFromNow />
                            </p>
                        </div>
                    </div>
                    <div className={classnames('flex-shrink-0', 'col-6', 'col-md-4', 'pt-2', 'pr-md-3')}>
                        <div className={classnames('text-right')}>
                            {repo.language}
                        </div>
                        <div className={classnames('pl-2', 'pl-md-0', 'text-right', 'flex-auto', 'min-width-0')}>
                            <a className="text-right" href={repo.stargazers_url}>
                                <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                                {repo.stargazers_count}
                        </a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
