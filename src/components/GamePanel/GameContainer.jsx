import React, { Component } from 'react';
import Game from "./Game"
import { connect } from "react-redux";

class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.octokit = require("@octokit/rest")({
            timeout: 0,
            headers: {
                accept: "application/vnd.github.v3+json",
                "user-agent": "octokit/rest.js v1.2.3" // v1.2.3 will be current version
            },

            // custom GitHub Enterprise URL
            baseUrl: "https://api.github.com"
        });
        this.state = {
            issuesObject: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game && nextProps.lista) {
            const { owner, repo } = nextProps;
            const issues = nextProps.lista.list;
            issues.map(issueId => {
                this.octokit.issues.get({ owner, repo, number: issueId }).then(issue => {
                    this.setState({
                        issuesObject: {
                            ...this.state.issuesObject,
                            [issueId]: {
                                ...issue.data
                            }
                        }
                    })
                })
            })
        }
    }

    render() {
        const { user, game, lista } = this.props
        const { issuesObject } = this.state
        if (game && lista) {
            if (Object.values(issuesObject).length === lista.list.length) {
                return (
                   <Game user={user} game={game} issues={lista.list} dictonary={issuesObject}/>
                )
            } else {
                return (
                    <p>Importowanie...</p>
                )
            }
        } else {
            return (
                <p>Ładowanie gry...</p>
            )
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    const { owner, repo, gameId } = ownProps
    if (state.games[owner] &&
        state.games[owner][repo] &&
        state.games[owner][repo][gameId]) {
        const newGame = state.games[owner][repo][gameId]
        if (state.lists[owner] &&
            state.lists[owner][repo] &&
            state.lists[owner][repo][newGame.selectedList]) {
            return {
                game: newGame,
                lista: state.lists[owner][repo][newGame.selectedList]
            }
        } else {
            return {
                game: newGame,
            }
        }
    }
}

export default connect(mapStateToProps)(GameContainer);