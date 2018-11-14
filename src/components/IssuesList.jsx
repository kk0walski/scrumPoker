import React, { Component } from 'react';
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import classnames from 'classnames';
import IssueItem from './IssueItem';
import Labels from "./Labels";
import Autor from "./Autor";
import Milestone from "./Milestone"

class IssuesList extends Component {

    constructor(props) {
        super(props);
        const { owner, repo } = this.props;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLabelsFilter = this.handleLabelsFilter.bind(this);
        this.handleAutorFilter = this.handleAutorFilter.bind(this);
        this.handleMileStoneFilter = this.handleMileStoneFilter.bind(this);
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
            filterLabels: [],
            autor: null,
            activePage: 1,
            itemsCountPerPage: 20,
            totalItemsCount: 0,
            milestone: '*',
            owner,
            repo
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
        const { owner, repo, filterLabels } = this.props;
        const { itemsCountPerPage } = this.state;
        this.octokit.issues
            .getForRepo({
                owner,
                repo,
                labels: filterLabels.toString(),
                per_page: itemsCountPerPage
            })
            .then(result => {
                console.log("RESULT: ", result);
                this.setState({
                    result,
                    data: result.data,
                    filterLabels,
                    totalItemsCount: this.parser(this.octokit.hasLastPage(result), result.data, itemsCountPerPage)
                });
            });
    }

    handleLabelsFilter(filterLabels) {
        const { owner, repo } = this.props;
        const { itemsCountPerPage, autor, milestone } = this.state;
        console.log("AUTOR: ", autor);
        if (autor !== null) {
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
                    milestone,
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

    handleAutorFilter(autor) {
        const { owner, repo } = this.props;
        const { itemsCountPerPage, filterLabels, milestone } = this.state;
        if (autor !== null) {
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
        }
    }

    handleMileStoneFilter(milestone) {
        const { owner, repo } = this.props;
        const { itemsCountPerPage, filterLabels, autor } = this.state;
        if (autor !== null) {
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
        }
    }

    handlePageChange(pageNumber) {
        const { owner, repo, filterLabels } = this.props;
        const { itemsCountPerPage } = this.state;
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

    render() {
        const { data } = this.state;
        const { match, owner, repo } = this.props;
        if (data) {
            return (
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item" onClick={this.checkPage}>
                                    <a className="nav-link">Check Page</a>
                                </li>
                                <Labels owner={owner} repo={repo} labelFilter={this.handleLabelsFilter} />
                                <Autor owner={owner} repo={repo} autorFilter={this.handleAutorFilter} />
                                <Milestone owner={owner} repo={repo} milestoneFilter={this.handleMileStoneFilter}/>
                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group" >
                        {data.map(node => (
                            <li key={node.id} className={classnames('list-group-item')} onClick={(e) => this.checkIssue(e, node)}>
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