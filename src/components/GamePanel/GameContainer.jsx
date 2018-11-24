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
        if (nextProps.game) {
            const { owner, repo } = nextProps;
            const issues = nextProps.game.storyList;
            if (issues) {
                issues.map(issue => {
                    this.octokit.issues.get({ owner, repo, number: issue.id }).then(result => {
                        this.setState({
                            issuesObject: {
                                ...this.state.issuesObject,
                                [issue.id]: {
                                    ...result.data
                                }
                            }
                        })
                    })
                })
            }
        }
    }

    render() {
        const { user, game, owner, repo } = this.props
        const { issuesObject } = this.state
        if (game && game.storyList && issuesObject) {
            if (Object.values(issuesObject).length === game.storyList.length) {
                return (
                    <Game owner={owner} repo={repo} user={user} game={game} issues={game.storyList} dictonary={issuesObject} />
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
        return {
            game: newGame
        }
    } else return { game: undefined }

}

export default connect(mapStateToProps)(GameContainer);