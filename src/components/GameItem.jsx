import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { connect } from "react-redux";
import { startRemoveGame } from "../actions/Game";
import GameExportModal from "./GameExportModal";
import { FaGithub } from "react-icons/fa";

class GameItem extends Component {

    constructor(props) {
        super(props);
        this.removeGame = this.removeGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            exportModalOpen: false
        }
    }

    removeGame() {
        const { game } = this.props;
        const { owner, name } = this.props.match.params;
        this.props.startRemoveGame(owner, name, game.id)
    }

    openModal(){
        this.setState({
            exportModalOpen: true
        })
    }

    closeModal(){
        this.setState({
            exportModalOpen: false
        })
    }

    render() {
        const { game, user } = this.props;
        const { exportModalOpen } = this.state
        const { owner, name } = this.props.match.params;
        return (
            <div>
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
                        <button type="button" className="btn btn-success float-right" onClick={this.openModal}>
                            <FaGithub />Export
                        </button>
                    </div>
                </div>
                <GameExportModal owner={owner} repo={name} game={game} user={user} modalOpen={exportModalOpen} closeModal={this.closeModal}/>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToPorps = dispatch => ({
    startRemoveGame: (owner, repo, game) => dispatch(startRemoveGame(owner, repo, game))
})

export default connect(mapStateToProps, mapDispatchToPorps)(GameItem);