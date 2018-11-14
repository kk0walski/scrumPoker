import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';

class Milestone extends Component {
    constructor(props) {
        super(props);
        const { owner, repo } = this.props;
        this.getAllMilestones = this.getAllMilestones.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
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
            milestoneSearch: '',
            owner,
            repo
        };
    }

    changeFilter(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.milestoneSearch !== this.state.milestoneSearch){
            console.log("MILESTONE: ", this.state.milestoneSearch);
            this.props.milestoneFilter(this.state.milestoneSearch)
        }
    }

    checMilestone(event, newMilestone){
        this.setState({
            milestoneSearch: (newMilestone.toString() === this.state.milestoneSearch ? undefined : newMilestone.toString())
        })
    }

    async  getAllMilestones() {
        const { owner, repo } = this.props;
        let response = await this.octokit.issues
            .getMilestones({
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

    componentDidMount() {
        this.getAllMilestones().then(milestones => {
            this.setState({
                data: milestones
            })
        })
    }

    render() {
        const { data, filterText, milestoneSearch } = this.state;
        if (data) {
            return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Milestones
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <input type="text" className="form-control" placeholder="Filter" onChange={this.changeFilter} />
                        <div style={{ maxHeight: "200px", overflow: 'auto' }} >
                        {data.filter(milestone => milestone.title.search(filterText) !== -1).map(milestone => (
                                <a className={classnames('dropdown-item', {'active': milestone.number.toString() === milestoneSearch})} key={milestone.id} onClick={(e) => this.checMilestone(e, milestone.number)}>
                                    {milestone.title}
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

export default connect(mapStateToProps)(Milestone);