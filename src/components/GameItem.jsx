import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { connect } from "react-redux";
import { startRemoveGame } from "../actions/Game"

class GameItem extends Component {

    constructor(props){
        super(props);
        this.removeGame = this.removeGame.bind(this);
    }

    removeGame(){
        const { game } = this.props;
        const { owner, name } = this.props.match.params;
        this.props.startRemoveGame(owner, name, game.id)
    }

    render() {
        const { game } = this.props;
        const { owner, name } = this.props.match.params;
        return (
            <div className="row">
                <div className="col-8">
                    <h3>
                        <Link key={game.id}
                            className="v-align-middle"
                            to={`/${owner}/${name}/play/${game.id}`}>
                            {game.name}
                        </Link>
                    </h3>
                    <footer className="blockquote-footer">
                        <p>Share URL with your players:</p>
                        <p>{`${window.location.origin}/${owner}/${name}/play/${game.id}`}</p>
                        <p>{game.desc}</p>
                    </footer>
                </div>
                <div className="col-4">
                    <button type="button" className="btn btn-danger float-right" onClick={this.removeGame}>
                        <FaTrash />Remove
                        </button>
                </div>
            </div>
        )
    }
}


const mapDispatchToPorps = dispatch => ({
    startRemoveGame: (owner, repo, game) => dispatch(startRemoveGame(owner, repo, game))
})

export default connect(undefined, mapDispatchToPorps)(GameItem);