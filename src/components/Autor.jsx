import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';

class Autor extends Component {

    constructor(props) {
        super(props);
        const { owner, repo } = this.props;
        this.getAllAutors = this.getAllAutors.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.checkAutor = this.checkAutor.bind(this);
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
            autorSearch: '',
            owner,
            repo
        };
    }

    changeFilter(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.autorSearch !== this.state.autorSearch) {
            this.props.autorFilter(this.state.autorSearch)
        }
    }

    checkAutor(event, newAutor) {
        this.setState({
            autorSearch: (newAutor === this.state.autorSearch ? null : newAutor)
        })
    }

    async  getAllAutors() {
        const { owner, repo } = this.props;
        let response = await this.octokit.repos
            .getContributors({
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
        this.getAllAutors().then(autors => {
            this.setState({
                data: autors
            })
        })
    }

    render() {
        const { data, filterText, autorSearch } = this.state;
        if (data) {
            return (
                <li className="nav-item dropdown">
                    <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Autor
                    </p>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <input type="text" className="form-control" placeholder="Filter" onChange={this.changeFilter} />
                        <div style={{ maxHeight: "200px", overflow: 'auto' }} >
                            {data.filter(autor => autor.login.search(filterText) !== -1).map(autor => (
                                <p className={classnames('dropdown-item', { 'active': autor.login === autorSearch })} key={autor.id} onClick={(e) => this.checkAutor(e, autor.login)}>
                                    {autor.login}
                                </p>
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

export default connect(mapStateToProps)(Autor);