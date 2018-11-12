import React, { Component } from 'react';
import Github from 'github-api';
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import IssueItem from './IssueItem';
import classnames from 'classnames';

class ImportIssues extends Component {

    constructor(props) {
        super(props);
        this.changeFilter = this.changeFilter.bind(this);
        this.checkLabel = this.checkLabel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.importData = this.importData.bind(this)
        this.filterData = this.filterData.bind(this);
        if (this.props.user) {
            this.gh = new Github({
                token: props.user.token
            });
        }
        this.state = {
            organisation: undefined,
            repository: undefined,
            data: [],
            filteredData: [],
            filterText: '',
            labels: [],
            myLabels: [],
            filterLabels: [],
            partData: [],
            itemsCountPerPage: 10,
            activePage: 1,
            totalItemsCount: 0,
            pageRangeDisplayed: 10
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        var issues = this.gh.getIssues(params.owner, params.name);
        issues.listLabels().then(result => {
            this.setState({
                myLabels: result.data.map(element => element.name)
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.organisation !== prevState.organisation ||
            this.state.repository !== prevState.repository) {
            var issues = this.gh.getIssues(this.state.organisation, this.state.repository);
            issues.listIssues({
                labels: this.state.filterLabels.toString()
            }).then(result => {
                this.setState({
                    data: result.data,
                    filteredData: result.data,
                    totalItemsCount: result.data.length,
                    partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
                })
            })
            issues.listLabels().then(result => {
                this.setState({
                    labels: Array.from(new Set(result.data.map(element => element.name)))
                })
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("SUBMIT")
        this.setState({
            organisation: event.target.elements.organisation.value,
            repository: event.target.elements.repository.value,
            filterLabels: event.target.elements.labels.value.split(',')
        })
    }

    paginate(array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    filterData(filterLabels) {
        var issues = this.gh.getIssues(this.state.organisation, this.state.repository);
        issues.listIssues({
            labels: filterLabels.toString()
        }).then(result => {
            this.setState({
                filteredData: result.data,
                totalItemsCount: result.data.length,
                partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
            })
        })
    }

    changeFilter(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    handlePageChange(pageNumber) {
        this.setState({
            partData: this.paginate(this.state.filteredData, this.state.itemsCountPerPage, pageNumber),
            activePage: pageNumber
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

    importData() {
        const { filteredData, myLabels } = this.state;
        const { owner, name } = this.props.match.params;
        var issues = this.gh.getIssues(owner, name);
        filteredData.forEach((element) => {
            const newLabels = Array.from(new Set(element.labels.map(label => label.name))).filter(name => !myLabels.includes(name))
            const importIssue = { body: element.body, title: element.title, labels: newLabels}
            issues.createIssue(importIssue).catch(error => {
                alert("ERROR: ", error);
            })
        })
    }

    render() {
        const { partData, labels, filterText, filterLabels, myLabels } = this.state;
        const { match } = this.props;
        if (myLabels.length < 1 || myLabels === undefined) {
            return (
                <p>Loading...</p>
            )
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="organisation">Organisation name</label>
                            <input type="text" className="form-control" name="organisation" id="orgInput" aria-describedby="orgHelp" placeholder="Enter organisation" />
                            <small id="orgHelp" className="form-text text-muted">Organisation which own this repository.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Repository">Repository</label>
                            <input type="text" className="form-control" name="repository" id="exampleRepository" placeholder="Repository" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="organisation">Labels</label>
                            <input type="text" className="form-control" name="labels" id="labelsInput" aria-describedby="labelsHelp" placeholder="Enter organisation" />
                            <small id="labelsHelp" className="form-text text-muted">Labels for filtering data</small>
                        </div>
                        <button type="submit" className="btn btn-primary">SEARCH</button>
                    </form>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                                {/*Dropdown menu labels start */}

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

                                {/*Dropdown menu labels start */}

                                <li class="nav-item">
                                    <button class="btn btn-outline-success" type="button" onClick={this.importData}>Import filtered data</button>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <ul className="list-group">
                        {partData.map(node => (
                            <IssueItem issue={node} match={match} key={node.id} />
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
        }
    }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ImportIssues);