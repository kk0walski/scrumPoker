import React, { Component } from 'react';
import Game from "./Game"
import { connect } from "react-redux";
import { startAddUserToStory } from "../../actions/Game"

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
            issuesObject: {},
            importing: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.game && nextProps.game && nextProps.game.storyList) {
            const { owner, repo, game } = nextProps
            const issues = Object.values(game.storyList);
            const users = Object.values(game.users);
            users.forEach(user => {
                if (issues[game.selectedStory] && !issues[game.selectedStory].votes[user.id]) {
                    if ((user.id === game.firebaseOwner && game.creatorCanEstimateEnabled) || user.id !== game.firebaseOwner) {
                        nextProps.startAddUserToStory(owner, repo, game.id, issues[game.selectedStory], user)
                    }
                }
            })
        }
        if (nextProps.game && nextProps.game.storyList) {
            if (Object.keys(this.state.issuesObject).length !== nextProps.game.issuesCount) {
                const { owner, repo } = nextProps;
                const issues = Object.values(nextProps.game.storyList);
                issues.forEach(issue => {
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
            if (Object.values(issuesObject).length === game.issuesCount) {
                return (
                    <Game owner={owner} repo={repo} user={user} game={game} issues={Object.values(game.storyList)} dictonary={issuesObject} />
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
            game: newGame,
            user: state.user
        }
    } else return { game: undefined }

}

const mapDispatchToProps = dispatch => ({
    startAddUserToStory: (owner, repo, game, story, user) => dispatch(startAddUserToStory(owner, repo, game, story, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);