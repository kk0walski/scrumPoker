import React, { Component } from 'react';
import { connect } from "react-redux";
import GameNav from "./GameNav";
import ActiveIssue from "./ActiveIssue";

class GameContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIssue: props.lista ? props.lista[0].number : 0
        }
    }

    render() {
        const { game, lista, owner, repo } = this.props;
        if (lista && game) {
            return (
                    <div className="row">
                        <div className="col-sm-9 float-left">
                            <ActiveIssue issues={lista.list} issueId={this.state.activeIssue} />
                        </div>
                        <GameNav issues={lista.list} game={game} owner={owner} repo={repo} />
                    </div>
            )
        } else {
            return (<div> </div>)
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
                lista: {}
            }
        }
    } else {
        return {
            game: {},
            list: {}
        }
    }
}

export default connect(mapStateToProps)(GameContent);