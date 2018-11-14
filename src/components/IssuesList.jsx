import React, { Component } from 'react';
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import classnames from 'classnames';
import IssueItem from './IssueItem';
import Labels from "./Labels";
import Autor from "./Autor";
import Milestone from "./Milestone";

class IssuesList extends Component {

    constructor(props) {
        super(props);
        const { owner, repo, filterLabels } = this.props;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLabelsFilter = this.handleLabelsFilter.bind(this);
        this.handleAutorFilter = this.handleAutorFilter.bind(this);
        this.handleMileStoneFilter = this.handleMileStoneFilter.bind(this);
        this.refresh = this.refresh.bind(this);
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
            result: undefined,
            data: undefined,
            filterLabels,
            autor: null,
            activePage: 1,
            itemsCountPerPage: 20,
            totalItemsCount: 0,
            milestone: undefined,
            checkedIssues: [],
            owner,
            repo,
            refreshDisabled: false
        };
    }

    parser(linkStr, data, perPage) {
        if (linkStr) {
            return (parseInt(/&page=(\d+)/.exec(linkStr)[1])) * perPage
        } else {
            return data.length
        }
    }

    componentDidMount() {
        const { owner, repo, filterLabels, itemsCountPerPage } = this.state;
        this.octokit.issues
            .getForRepo({
                owner,
                repo,
                labels: filterLabels.toString(),
                per_page: itemsCountPerPage
            })
            .then(result => {
                this.setState({
                    result,
                    data: result.data,
                    filterLabels,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                });
            });
    }

    handleLabelsFilter(filterLabels) {
        const { owner, repo, itemsCountPerPage, autor, milestone } = this.state;
        if (autor !== null) {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        } else {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    })
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        console.log("RESULT: ", result);
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    })
            }
        }
    }

    handleAutorFilter(autor) {
        const { owner, repo, itemsCountPerPage, filterLabels, milestone } = this.state;
        if (autor !== null) {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        } else {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        }
    }

    handleMileStoneFilter(milestone) {
        const { owner, repo, itemsCountPerPage, filterLabels, autor } = this.state;
        if (autor !== null) {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        } else {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        }
    }

    refresh() {
        const { owner, repo, itemsCountPerPage, filterLabels, autor, milestone } = this.state;
        this.setState({
            refreshDisabled: true
        })
        if (autor !== null) {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        creator: autor,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            milestone,
                            data: result.data,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        } else {
            if (milestone) {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        milestone,
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            } else {
                this.octokit.issues
                    .getForRepo({
                        owner,
                        repo,
                        labels: filterLabels.toString(),
                        per_page: itemsCountPerPage,
                    })
                    .then(result => {
                        this.setState({
                            result,
                            filterLabels,
                            autor,
                            data: result.data,
                            milestone,
                            activePage: 1,
                            totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                        });
                    });
            }
        }
        this.setState({
            refreshDisabled: false
        })
    }

    handlePageChange(pageNumber) {
        const { owner, repo, filterLabels, itemsCountPerPage } = this.state;
        this.octokit.issues
            .getForRepo({
                owner,
                repo,
                labels: filterLabels.toString(),
                per_page: itemsCountPerPage,
                page: pageNumber
            })
            .then(result => {
                this.setState({
                    result,
                    data: result.data,
                    activePage: pageNumber
                });
            });
    }

    checkIssue(e, IssueNumber) {
        e.preventDefault();
        const { checkedIssues } = this.state;
        if (!checkedIssues.includes(IssueNumber)) {
            this.setState({
                checkedIssues: [...checkedIssues, IssueNumber]
            })
        } else {
            this.setState({
                checkedIssues: checkedIssues.filter(issue => issue !== IssueNumber)
            })
        }
    }

    render() {
        const { data, checkedIssues, filterLabels, refreshDisabled} = this.state;
        const { match, owner, repo, buttonText } = this.props;
        if (data) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1>{repo}</h1>
                        </div>
                        <div className="col">
                            <button type="button" onClick={this.refresh} className={classnames('btn', 'btn-light', 'float-right', { disabled: refreshDisabled })}>Refresh</button>
                        </div>
                    </div>
                    <hr />
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li class="nav-item" onClick={() => this.props.moveIssues(checkedIssues)}>
                                    <a class="nav-link">{buttonText}</a>
                                </li>
                                <li className="nav-item" onClick={this.checkPage}>
                                    <a className="nav-link">Check Page</a>
                                </li>
                                <Labels owner={owner} repo={repo} filterLabels={filterLabels} labelFilter={this.handleLabelsFilter} />
                                <Autor owner={owner} repo={repo} autorFilter={this.handleAutorFilter} />
                                <Milestone owner={owner} repo={repo} milestoneFilter={this.handleMileStoneFilter} />
                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group" >
                        {data.map(node => (
                            <li key={node.id} className={classnames('list-group-item', { 'list-group-item-primary': checkedIssues.includes(node.number) })} onClick={(e) => this.checkIssue(e, node.number)}>
                                <IssueItem issue={node} match={match} key={node.id} />
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange}
                        innerClass="pagination justify-content-center"
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(IssuesList);