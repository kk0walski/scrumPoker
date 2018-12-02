import React, { Component } from 'react';
import Modal from 'react-modal';
import GameExport from "./GameExport"

export default class GameExportModal extends Component {

    render() {
        const { owner, user, repo, game } = this.props;
        return (
            <Modal
                isOpen={this.props.modalOpen}
                contentLabel={repo}
                overlayClassName="modal-overlay"
                className="modal-dialog modal-dialog--scrollable"
            >
                <GameExport owner={owner} repo={repo} game={game} user={user} closeModal={this.props.closeModal}/>
            </Modal>
        )
    }
}