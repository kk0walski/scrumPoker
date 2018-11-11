import React, { Component } from 'react';
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import RepositoryItem from "./RepositoryItem";
import Github from 'github-api';

class Repositories extends Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            data: undefined,
            partData: undefined,
            itemsCountPerPage: 10,
            activePage: 1,
            totalItemsCount: undefined,
            pageRangeDisplayed: 10
        }
    }

    componentDidMount() {
        const { user } = this.props;
        if (user) {
            var gh = new Github({
                token: user.token
            })
            var me = gh.getUser();
            me.listRepos({
                affiliation: 'owner'
            }).then(result => {
                console.log("REPOS: ", result.data);
                this.setState({
                    data: result.data,
                    totalItemsCount: result.data.length,
                    partData: this.paginate(result.data, this.state.itemsCountPerPage, 1),
                })
            })
        }
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

    render() {
        const { partData } = this.state;
        if (partData) {
            return (
                <div>
                    <h1>Your Github Repositories</h1>
                    <hr />
                    <ul className="list-group">
                        {partData.map(node => (
                            <RepositoryItem repo={node} />
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