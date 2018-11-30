import React, { Component } from 'react';
import Modal from 'react-modal';

export default class SettingsModal extends Component {
    render() {
        const { game } = this.props;
        return (
            <Modal
                isOpen={this.props.settingsOpen}
                overlayClassName="modal-overlay"
                className="modal-dialog modal-dialog--scrollable"
                contentLabel={"Settings"}
            >
                <div className="modal-wrapper">
                    <div className="modal-header-blue">
                        <h2 className="text-light">Game Settings</h2>
                    </div>
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="gameName">Game Name:</label>
                                <input id="gameName" value={game.name} name="gameName" type="text" aria-describedby="gameNameHelpBlock" required="required" className="form-control here" />
                                <small id="gameNameHelpBlock" className="form-text text-muted">75 characters max</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="gameDescription">Description:</label>
                                <textarea id="gameDescription" value={game.desc} name="gameDescription" cols="40" rows="5" aria-describedby="gameDescriptionHelpBlock" className="form-control" />
                                <small id="gameDescriptionHelpBlock" className="form-text text-muted">250 characters max</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="teamVelocity">Team Velocity</label>
                                <input id="teamVelocity" value={game.velocity} name="teamVelocity" type="number" aria-describedby="teamVelocityHelpBlock" min="0" className="form-control here" />
                                <small id="teamVelocityHelpBlock" className="form-text text-muted">
                                    Agile teams can often predict how many effort points can be completed in one sprint. Enter your team's velocity here,
                            and we'll let you know when your estimates hit their max.</small>
                            </div>
                            <div className="form-group">
                                <label>Share the velocity with all players?</label>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-true" value="true" checked={game.shareVelocityEnabled} />
                                        <label className="form-check-label" htmlFor="shareVelocityWithAllPlayers-true">
                                            Yes
                                </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-false" value="false"  checked={!game.shareVelocityEnabled}/>
                                        <label className="form-check-label" htmlFor="shareVelocityWithAllPlayers-false">
                                            No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Are you also effort pointing?</label>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-true" value="true" checked={game.creatorCanEstimateEnabled} />
                                        <label className="form-check-label" htmlFor="isCreatorEffortPointing-true">
                                            Yes
                                </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-false" value="false" checked={!game.creatorCanEstimateEnabled}/>
                                        <label className="form-check-label" htmlFor="isCreatorEffortPointing-false">
                                            No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Would you like to auto-flip the cards after everyone has voted?</label>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-true" value="true" checked={game.autoFlipEnabled} />
                                        <label className="form-check-label" htmlFor="isAutoFlipEnabled-true">
                                            Yes
                             </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-false" value="false" checked={!game.autoFlipEnabled}/>
                                        <label className="form-check-label" htmlFor="isAutoFlipEnabled-false">
                                            No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Would you like to allow players to change their vote after reveal?</label>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isChangeVoteEnabled" id="isChangeVoteEnabled-true" value="true" defaultChecked />
                                        <label className="form-check-label" htmlFor="isChangeVoteEnabled-true">
                                            Yes
                                </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="isChangeVoteEnabled" id="isChangeVoteEnabled-false" value="false" />
                                        <label className="form-check-label" htmlFor="isChangeVoteEnabled-false">
                                            No
                            </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Would you like Planning Poker to calculate the score?</label>
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="calculateScore" id="calculateScore-true" value="true" defaultChecked />
                                        <label className="form-check-label" htmlFor="calculateScore-true">
                                            Yes
                                </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="calculateScore" id="calculateScore-false" value="false" />
                                        <label className="form-check-label" htmlFor="calculateScore-false">
                                            No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}
