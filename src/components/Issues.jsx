import React, { Component } from 'react';
import Github from 'github-api';
import { connect } from "react-redux";
import classnames from 'classnames';
import Pagination from "react-js-pagination";
import IssueItem from './IssueItem'

class Issues extends Component {

    constructor(props) {
        super(props);
        this.changeFilter = this.changeFilter.bind(this);
        this.checkLabel = this.checkLabel.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.refresh = this.refresh.bind(this)
        if (this.props.user) {
            this.gh = new Github({
                token: props.user.token
            });
        }
        this.state = {
            data: undefined,
            filteredData: undefined,
            filterText: '',
            labels: [],
            filterLabels: [],
            partData: undefined,
            itemsCountPerPage: 10,
            activePage: 1,
            totalItemsCount: undefined,
            pageRangeDisplayed: 10
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        var issues = this.gh.getIssues(params.owner, params.name);
        issues.listIssues().then(result => {
            this.setState({
                data: result.data,
                filteredData: result.data,
                totalItemsCount: result.data.length,
                partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
            })
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
        const { params } = this.props.match;
        var issues = this.gh.getIssues(params.owner, params.name);
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
            partData: this.paginate(this.state.filteredData, this.state.itemsCountPerPage, pageNumber),
            activePage: pageNumber
        })
    }

    refresh() {
        const { params } = this.props.match;
        var issues = this.gh.getIssues(params.owner, params.name);
        issues.listIssues().then(result => {
            this.setState({
                data: result.data,
                totalItemsCount: result.data.length,
                partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
            })
        })
        issues.listLabels().then(result => {
            this.setState({
                labels: result.data.map(element => element.name)
            })
        })
    }

    render() {
        const { partData, labels, filterText, filterLabels } = this.state;
        const { match } = this.props;
        if (partData) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1>{match.params.name}</h1>
                        </div>
                        <div className="col">
                            <button type="button" onClick={this.refresh} className="btn btn-light float-right">Refresh</button>
                        </div>
                    </div>
                    <hr />
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
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
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Issues);