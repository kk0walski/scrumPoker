import React, { Component } from 'react';
import Github from 'github-api';
import { connect } from "react-redux";
import classnames from 'classnames';
import Pagination from "react-js-pagination";
import IssueItem from './IssueItem'

class IssuesList extends Component {

    constructor(props) {
        super(props);
        this.changeFilter = this.changeFilter.bind(this);
        this.checkLabel = this.checkLabel.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.checkIssue = this.checkIssue.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.checkPage = this.checkPage.bind(this);
        if (this.props.user) {
            this.gh = new Github({
                token: props.user.token
            });
        }
        this.state = {
            data: {},
            filteredData: [],
            filterText: '',
            labels: [],
            filterLabels: props.filterLabels,
            itemsCountPerPage: 20,
            activePage: 1,
            totalItemsCount: 0,
            pageData: [],
            pageRangeDisplayed: 10,
            checkedIssues: []
        }
    }

    componentDidMount() {
        const { owner,  repo} = this.props;
        var issues = this.gh.getIssues(owner,  repo);
        issues.listIssues({
            labels: this.state.filterLabels.toString()
        }).then(result => {
            var dataObject = {}
            var dataKeys = [];
            result.data.forEach(element => {
                dataObject[element.id] = element;
                dataKeys.push(element.id)
            });
            this.setState({
                data: dataObject,
                filteredData: dataKeys,
                totalItemsCount: result.data.length,
                pageData: this.paginate(dataKeys, this.state.itemsCountPerPage, 1)
            })
        }).catch(error => {
            console.log("ERROR: ", error);
        })
        issues.listLabels().then(result => {
            this.setState({
                labels: result.data.map(element => element.name)
            })
        })
    }

    paginate(array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    filterData(filterLabels) {
        const { owner,  repo} = this.props;
        var issues = this.gh.getIssues(owner,  repo);
        issues.listIssues({
            labels: filterLabels.toString()
        }).then(result => {
            const filteredData = result.data.map(item => item.id)
            this.setState({
                filteredData,
                totalItemsCount: result.data.length,
                pageData: this.paginate(filteredData, this.state.itemsCountPerPage, 1),
            })
        })
    }

    changeFilter(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    checkLabel(event, eventLabel) {
        const { filterLabels } = this.state;
        if (filterLabels.includes(eventLabel)) {
            const filteredLabels = filterLabels.filter(label => label !== eventLabel)
            this.setState({
                filterLabels: filteredLabels
            })
            this.filterData(filteredLabels)
        } else {
            const filteredLabels = [...filterLabels, eventLabel]
            this.setState({
                filterLabels: filteredLabels
            })
            this.filterData(filteredLabels)
        }
    }

    handlePageChange(pageNumber) {
        this.setState({
            pageData: this.paginate(this.state.filteredData, this.state.itemsCountPerPage, pageNumber),
            activePage: pageNumber
        })
    }

    refresh() {
        this.setState({
            refreshDisabled: true
        })
        const { owner,  repo} = this.props;
        var issues = this.gh.getIssues(owner,  repo);
        issues.listIssues().then(result => {
            var dataObject = {}
            var dataKeys;
            result.data.forEach(element => {
                dataObject[element.id] = element;
                dataKeys.push(element.id)
            });
            this.setState({
                data: dataObject,
                dataKeys,
                filteredData: dataKeys,
                totalItemsCount: result.data.length,
                pageData: this.paginate(dataKeys, this.state.itemsCountPerPage, 1),
                refreshDisabled: false
            })
        })
        issues.listLabels().then(result => {
            this.setState({
                labels: result.data.map(element => element.name)
            })
        })
    }

    checkAll() {
        if (this.state.checkedIssues.length > 0) {
            this.setState({
                checkedIssues: []
            })
        }
        else {
            this.setState({
                checkedIssues: this.state.filteredData
            })
        }
    }

    checkPage() {
        if (this.state.checkedIssues.length > 0) {
            this.setState({
                checkedIssues: []
            })
        }
        else {
            this.setState({
                checkedIssues: this.state.pageData
            })
        }
    }

    checkIssue(e, issueId) {
        e.preventDefault();
        const { checkedIssues } = this.state;
        if (!checkedIssues.includes(issueId)) {
            this.setState({
                checkedIssues: [...checkedIssues, issueId]
            })
        } else {
            this.setState({
                checkedIssues: checkedIssues.filter(issue => issue !== issueId)
            })
        }
    }
    render() {
        const { pageData, labels, filterText, filterLabels, refreshDisabled, checkedIssues, data } = this.state;
        const { repo, buttonText, match } = this.props;
        if (pageData && labels) {
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
                            <li class="nav-item" onClick={() => this.props.moveIssues(data, checkedIssues)}>
                                    <p class="nav-link">{buttonText}</p>
                                </li>
                                <li class="nav-item" onClick={this.checkAll}>
                                    <p class="nav-link">Check All</p>
                                </li>
                                <li class="nav-item" onClick={this.checkPage}>
                                    <p class="nav-link">Check Page</p>
                                </li>
                                <li className="nav-item dropdown">
                                    <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Labels
                                    </p>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <input type="text" className="form-control" placeholder="Filter" onChange={this.changeFilter} />
                                        <div style={{ maxHeight: "200px", overflow: 'auto' }} >
                                            {labels.filter(label => label.search(filterText) !== -1).map(label => {
                                                if (filterLabels.includes(label)) {
                                                    return (
                                                        <p className={classnames('dropdown-item', 'active')} key={label} onClick={(e) => this.checkLabel(e, label)}>
                                                            {label}
                                                        </p>
                                                    )
                                                } else {
                                                    return (
                                                        <p className={classnames('dropdown-item')} key={label} onClick={(e) => this.checkLabel(e, label)}>
                                                            {label}
                                                        </p>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group">
                        {pageData.map(node => (
                            <li key={node} className={classnames('list-group-item', { 'list-group-item-primary': checkedIssues.includes(node) })} onClick={(e) => this.checkIssue(e, node)}>
                                <IssueItem issue={data[node]} match={match} key={node} />
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