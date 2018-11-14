import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';

class Labels extends Component {

    constructor(props) {
        super(props);
        const { owner, repo, filterLabels } = this.props;
        this.getAllLabels = this.getAllLabels.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.checkLabel = this.checkLabel.bind(this);
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
            filterText: '',
            filterLabels,
            owner,
            repo
        };
    }

    async  getAllLabels() {
        const { owner, repo } = this.props;
        let response = await this.octokit.issues
            .getLabels({
                owner,
                repo,
                per_page: 100
            })
        let { data } = response
        while (this.octokit.hasNextPage(response)) {
            response = await this.octokit.getNextPage(response)
            data = data.concat(response.data)
        }
        return data
    }

    changeFilter(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    componentDidMount() {
        this.getAllLabels().then(labels => {
            this.setState({
                data: labels
            })
        })
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filterLabels.length !== this.state.filterLabels.length ||
            !this.checkLabels(prevState.filterLabels, this.state.filterLabels)) {
            this.props.labelFilter(this.state.filterLabels)
        }
        if (prevProps.filterLabels.length !== this.props.filterLabels.length ||
            !this.checkLabels(prevProps.filterLabels, this.props.filterLabels)) {
            this.setState({
                filterLabels: this.props.filterLabels
            })
        }
    }

    checkLabel(event, eventLabel) {
        const { filterLabels } = this.state;
        this.setState({
            filterLabels: (filterLabels.includes(eventLabel) ? filterLabels.filter(label => label !== eventLabel) : [...filterLabels, eventLabel])
        })
    }

    render() {
        const { data, filterText, filterLabels } = this.state;
        if (data) {
            return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Labels
                </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <input type="text" className="form-control" placeholder="Filter" onChange={this.changeFilter} />
                        <div style={{ maxHeight: "200px", overflow: 'auto' }} >
                            {data.filter(label => label.name.search(filterText) !== -1).map(label => (
                                <a className={classnames('dropdown-item', { "active": filterLabels.includes(label.name) })} key={label.id} onClick={(e) => this.checkLabel(e, label.name)}>
                                    {label.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </li>
            )
        } else {
            return (<div></div>)
        }
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Labels);