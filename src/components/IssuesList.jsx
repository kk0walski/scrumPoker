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
        this.checkPage = this.checkPage.bind(this);
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
            toFilter: {
                owner,
                repo,
                labels: filterLabels.toString(),
                autor: undefined,
                per_page: 20,
                milestone: undefined
            },
            result: undefined,
            data: undefined,
            activePage: 1,
            totalItemsCount: 0,
            checkedIssues: {},
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

    removeEmpty(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key]);
            else if (obj[key] === undefined || obj[key] === null) delete obj[key];
        });
        return obj;
    }

    checkLabels(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
                return false;
        }

        return true;
    }

    componentDidUpdate(prevProps) {
        const { per_page } = this.state.toFilter;
        const { owner, repo, filterLabels } = this.props;
        if (prevProps.owner !== this.props.owner ||
            prevProps.repo !== this.props.repo ||
            !this.checkLabels(prevProps.filterLabels, this.props.filterLabels)) {
            this.octokit.issues
                .getForRepo({
                    owner,
                    repo,
                    labels: filterLabels.toString(),
                    per_page
                })
                .then(result => {
                    this.setState({
                        toFilter: {
                            ...this.state.toFilter,
                            labels: filterLabels.toString(),
                            creator: undefined,
                            milestone: undefined
                        },
                        result,
                        data: result.data,
                        totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, this.state.toFilter.per_page),
                        activePage: 1,
                        checkedIssues: {},
                        refreshDisabled: false
                    });
                });
        }
    }

    componentDidMount() {
        const { per_page } = this.state.toFilter;
        this.octokit.issues
            .getForRepo(this.removeEmpty(this.state.toFilter))
            .then(result => {
                this.setState({
                    result,
                    data: result.data,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, per_page)
                });
            });
    }

    handleLabelsFilter(filterLabels) {
        const { per_page } = this.state.toFilter;
        this.octokit.issues.getForRepo(this.removeEmpty({ ...this.state.toFilter, labels: filterLabels.toString() }))
            .then(result => {
                this.setState({
                    result,
                    toFilter: {
                        ...this.state.toFilter,
                        labels: filterLabels.toString()
                    },
                    data: result.data,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, per_page)
                });
            })
    }

    handleAutorFilter(autor) {
        const { per_page } = this.state.toFilter;
        this.octokit.issues.getForRepo(this.removeEmpty({ ...this.state.toFilter, creator: autor }))
            .then(result => {
                this.setState({
                    result,
                    toFilter: {
                        ...this.state.toFilter,
                        creator: autor
                    },
                    data: result.data,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, per_page)
                });
            })
    }

    handleMileStoneFilter(milestone) {
        const { per_page } = this.state.toFilter;
        this.octokit.issues.getForRepo(this.removeEmpty({ ...this.state.toFilter, milestone }))
            .then(result => {
                this.setState({
                    result,
                    toFilter: {
                        ...this.state.toFilter,
                        milestone
                    },
                    data: result.data,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, per_page)
                })
            })
    }

    refresh() {
        const { per_page } = this.state.toFilter;
        this.setState({
            refreshDisabled: true
        })
        this.octokit.issues.getForRepo(this.removeEmpty(this.state.toFilter))
            .then(result => {
                this.setState({
                    result,
                    data: result.data,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, per_page)
                })
            })
        this.setState({
            refreshDisabled: false
        })
    }

    handlePageChange(pageNumber) {
        this.octokit.issues.getForRepo(this.removeEmpty({ ...this.state.toFilter, page: pageNumber }))
            .then(result => {
                this.setState({
                    result,
                    data: result.data,
                    activePage: pageNumber
                });
            });
    }

    checkPage() {
        var newIssues = this.state.checkedIssues
        this.state.data.forEach(issue => {
            if (!newIssues[issue.number]) {
                newIssues[issue.number] = issue
            } else {
                delete newIssues[issue.number]
            }
        })
        this.setState({
            checkedIssues: newIssues
        })
    }

    checkIssue(e, issue) {
        e.preventDefault();
        const { checkedIssues } = this.state;
        if (checkedIssues[issue.number]) {
            var newIssues = { ...checkedIssues }
            delete newIssues[issue.number];
            this.setState({
                checkedIssues: newIssues
            })
        } else {
            this.setState({
                checkedIssues: { ...checkedIssues, [issue.number]: { ...issue } }
            })
        }
    }

    render() {
        const { data, checkedIssues, refreshDisabled } = this.state;
        const { owner, repo, buttonText } = this.props;
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
                                <li className="nav-item" onClick={() => this.props.moveIssues(checkedIssues)}>
                                    <p className="nav-link">{buttonText}</p>
                                </li>
                                <li className="nav-item" onClick={this.checkPage}>
                                    <p className="nav-link">Check Page</p>
                                </li>
                                <Labels owner={owner} repo={repo} filterLabels={this.state.toFilter.labels === "" ? [] : this.state.toFilter.labels.split(',')} labelFilter={this.handleLabelsFilter} />
                                <Autor owner={owner} repo={repo} autorFilter={this.handleAutorFilter} />
                                <Milestone owner={owner} repo={repo} milestoneFilter={this.handleMileStoneFilter} />
                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group" >
                        {data.map(node => (
                            <li key={node.number} className={classnames('list-group-item', { 'list-group-item-primary': checkedIssues[node.number] !== undefined })} onClick={(e) => this.checkIssue(e, node)}>
                                <IssueItem issue={node} key={node.number} />
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.toFilter.per_page}
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