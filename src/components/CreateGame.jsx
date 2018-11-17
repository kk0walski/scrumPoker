import React, { Component } from 'react';
import { connect } from "react-redux";

class CreateGame extends Component {

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { lists } = this.props;
    return (
      <div>
        <h3>Create Games</h3>
        <form>
          <div className="form-group">
            <label htmlFor="gameName">Game Name:</label>
            <input id="gameName" name="gameName" type="text" aria-describedby="gameNameHelpBlock" required="required" className="form-control here" />
            <small id="gameNameHelpBlock" className="form-text text-muted">75 characters max</small>
          </div>
          <div className="form-group">
            <label htmlFor="gameDescription">Description:</label>
            <textarea id="gameDescription" name="gameDescription" cols="40" rows="5" aria-describedby="gameDescriptionHelpBlock" required="required" className="form-control" />
            <small id="gameDescriptionHelpBlock" className="form-text text-muted">250 characters max</small>
          </div>
          <div className="form-group">
            <label htmlFor="teamVelocity">Team Velocity</label>
            <input id="teamVelocity" name="teamVelocity" type="number" aria-describedby="teamVelocityHelpBlock" className="form-control here" />
            <small id="teamVelocityHelpBlock" className="form-text text-muted">
              Agile teams can often predict how many effort points can be completed in one sprint. Enter your team's velocity here,
             and we'll let you know when your estimates hit their max.</small>
          </div>
          <div className="form-group">
            <label>Share the velocity with all players?</label>
            <div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-true" value="true" defaultChecked />
                <label className="form-check-label" htmlFor="shareVelocityWithAllPlayers-true">
                  Yes
            </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="shareVelocityWithAllPlayers" id="shareVelocityWithAllPlayers-false" value="false" />
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
                <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-true" value="true" defaultChecked />
                <label className="form-check-label" htmlFor="isCreatorEffortPointing-true">
                  Yes
            </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="isCreatorEffortPointing" id="isCreatorEffortPointing-false" value="false" />
                <label className="form-check-label" htmlFor="isCreatorEffortPointing-false">
                  No
            </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Choose your card set</label>
            <div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-1" value="true" defaultChecked />
                <label className="form-check-label" htmlFor="selectedCardSet-1">
                  Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass )
            </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-2" value="false" />
                <label className="form-check-label" htmlFor="selectedCardSet-2">
                  Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass )
              </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-3" value="false" />
                <label className="form-check-label" htmlFor="selectedCardSet-3">
                  T-shirts ( xxs, xs, s, m, l, xl, xxl, ?, Pass )
              </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selectedCardSet" id="selectedCardSet-4" value="false" />
                <label className="form-check-label" htmlFor="selectedCardSet-4">
                  Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ?, Pass )
              </label>
              </div>
            </div>
            <small id="teamVelocityHelpBlock" className="form-text text-muted">
              Many established teams have a preference for story pointing and estimation style.
              Teams that are new to agile may find the concept of pointing complex and may
               confuse story points with the number of hours required to complete a task.
                  In this case, you can use the non-numerical pointing system of t-shirt sizing.</small>
          </div>
          <div className="form-group">
            <label>Would you like to auto-flip the cards after everyone has voted?</label>
            <div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-true" value="true" defaultChecked />
                <label className="form-check-label" htmlFor="isAutoFlipEnabled-true">
                  Yes
            </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="isAutoFlipEnabled" id="isAutoFlipEnabled-false" value="false" />
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
            <label>Would you like a story timer?</label>
            <div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="isStoryTimerEnabled" id="isStoryTimerEnabled-true" value="true" defaultChecked />
                <label className="form-check-label" htmlFor="calculateScore-true">
                  Yes
            </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="isStoryTimerEnabled" id="isStoryTimerEnabled-false" value="false" />
                <label className="form-check-label" htmlFor="isStoryTimerEnabled-false">
                  No
              </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="listChose">ChoseList</label>
            <div>
              <select id="listChose" name="listChose" className="form-control">
                {lists.map(list => <option key={list.id} value={list.id}>{list.title}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <button name="submit" type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { owner, name } = ownProps.match.params;
  return {
    lists: state.lists[owner] && state.lists[owner][name] ? Object.values(state.lists[owner][name]) : []
  };
};

export default connect(
  mapStateToProps,
)(CreateGame);