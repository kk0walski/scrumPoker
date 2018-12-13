import React, { Component } from 'react';
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import RepositoryItem from "./RepositoryItem";
import Github from 'github-api';
import classnames from 'classnames';

class Repositories extends Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.refresh = this.refresh.bind(this);
        if (this.props.user) {
            this.gh = new Github({
                token: props.user.token
            });
        }
        this.state = {
            data: undefined,
            partData: undefined,
            itemsCountPerPage: 10,
            activePage: 1,
            totalItemsCount: undefined,
            pageRangeDisplayed: 10,
            refreshDisabled: false
        }
    }

    componentDidMount() {
        var me = this.gh.getUser();
        me.listRepos().then(result => {
            this.setState({
                data: result.data,
                totalItemsCount: result.data.length,
                partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
            })
        })
    }

    paginate(array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    handlePageChange(pageNumber) {
        this.setState({
            partData: this.paginate(this.state.data, this.state.itemsCountPerPage, pageNumber),
            activePage: pageNumber
        })
    }

    refresh() {
        var me = this.gh.getUser();
        this.setState({
            refreshDisabled: true
        })
        me.listRepos({
            affiliation: 'owner'
        }).then(result => {
            this.setState({
                data: result.data,
                totalItemsCount: result.data.length,
                partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
                refreshDisabled: false
            })
        })
    }

    render() {
        const { partData, refreshDisabled } = this.state;
        const { match } = this.props;
        if (partData) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h1>Your Github Repositories</h1>
                        </div>
                        <div className="col-4">
                            <button type="button" onClick={this.refresh} className={classnames('btn', 'btn-light', 'float-right', { disabled: refreshDisabled })}>Refresh</button>
                        </div>
                    </div>
                    <hr />
                    <ul className="list-group">
                        {partData.map(node => (
                            <RepositoryItem repo={node} match={match} key={node.id} />
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

export default connect(mapStateToProps)(Repositories);